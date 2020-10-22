# SpaceX Launch Data

🚀 A simple deno program that downloads SpaceX launch data and displays that data to the console

## Documentation

[SpaceX REST API](https://github.com/r-spacex/SpaceX-API) - Open Source REST API for rocket, core, capsule, pad, and launch data

[V4 Docs](https://github.com/r-spacex/SpaceX-API/blob/master/docs/v4/README.md)

```
https://api.spacexdata.com/v4/launches
```

## Run application

```
deno run --allow-net=api.spacexdata.com mod.ts
```

## Console Info

```
INFO Downloading launch data...
INFO {"flightNumber":1,"mission":"FalconSat","rocket":"Falcon 1","customers":["DARPA"]}
INFO {"flightNumber":2,"mission":"DemoSat","rocket":"Falcon 1","customers":["DARPA"]}
INFO {"flightNumber":3,"mission":"Trailblazer","rocket":"Falcon 1","customers":["NASA"]}
...
INFO Downloaded data for 113 SpaceX launches.
```
