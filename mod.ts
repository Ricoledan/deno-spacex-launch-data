import * as log from "https://deno.land/std/log/mod.ts";

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: any;
  customers: Array<string>;
}

const launches = new Map<number, Launch>();

export async function downloadLaunchData() {
  log.info("Downloading launch data...");
  const response = await fetch(
    "https://api.spacexdata.com/v4/launches",
    {
      method: "GET",
    },
  );

  const getRocketName = async (id: string) => {
    const response = await fetch(
      `https://api.spacexdata.com/v4/rockets/${id}`,
      {
        method: "GET",
      },
    );

    const result = await response.json();
    return result["name"];
  };

  const getCustomerPayload = async (id: string) => {
    const response = await fetch(
      `https://api.spacexdata.com/v4/payloads/${id}`,
      {
        method: "GET",
      },
    );

    const result = await response.json();
    return result["customers"];
  };

  getCustomerPayload("5eb0e4b5b6c3bb0006eeb1e1");

  if (!response.ok) {
    log.warning("Problem downloading launch data.");
    throw new Error("Launch data download failed.");
  }

  const launchData = await response.json();
  for (const launch of launchData) {
    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["name"],
      rocket: await getRocketName(launch["rocket"]),
      // TODO: update to pull in payloads that exceed 1
      customers: await getCustomerPayload(launch["payloads"][0]),
    };

    launches.set(flightData.flightNumber, flightData);
    log.info(JSON.stringify(flightData));
  }
}

if (import.meta.main) {
  await downloadLaunchData();
  log.info(`Downloaded data for ${launches.size} SpaceX launches.`);
}
