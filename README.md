# nest-fastify-status-monitor

[![NPM](https://nodei.co/npm/@viewsonic-mvb/nest-fastify-status-monitor.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/@viewsonic-mvb/nest-fastify-status-monitor/)

[![nest-status-monitor on npm](https://img.shields.io/npm/v/@viewsonic-mvb/nest-fastify-status-monitor.svg)](https://www.npmjs.com/package/@viewsonic-mvb/nest-fastify-status-monitor) ![License](https://img.shields.io/badge/license-MIT-blue.svg)

Simple, self-hosted module based on Socket.io and Chart.js to report realtime
server metrics for Nest.js based node servers.

![Status monitor page](https://i.imgur.com/AkZEPYG.gif 'Status monitor page')


## Installation & setup default config

1. Run `npm install @viewsonic-mvb/nest-fastify-status-monitor --save`
2. Setup module:

``` ts
import {
  WebStatusMonitorModule,
  WebStatusMonitorConfiguration,
} from '@viewsonic-mvb/nest-fastify-status-monitor';

@Module({
  imports: [WebStatusMonitorModule.setUp()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

3. Run server and go to `/status`


## Run examples

1. Go to `cd examples/test-fastify-status-monitor`
2. Run `yarn i`
3. Run server `yarn start`
4. Go to `http://localhost:3001`

## Options

Monitor can be configured by passing options object during initialization of
module.

Default config:

```ts
{
  pageTitle: 'Nest.js Monitoring Page',
  port: 3001,
  path: '/status',
  socketPath: '/socket.io',
  ignoreStartsWith: '/admin',
  healthChecks: [],
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60,
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    heap: true,
    eventLoop: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
}
```

## Health Checks

You can add a series of health checks to the configuration that will appear
below the other stats. The health check will be considered successful if the
endpoint returns a 200 status code.

``` ts
// config
healthChecks: [
  {
    protocol: 'http',
    host: 'localhost',
    path: '/health',
    port: 3000,
  }
];
```

## License

Forked from
[nest-status-monitor](https://github.com/GenFirst/nest-status-monitor)
