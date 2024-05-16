import { StatusMonitorConfiguration } from './config/status.monitor.configuration';

const configuration: StatusMonitorConfiguration = {
  pageTitle: 'Nest.js Monitoring Page',
  port: 3001,
  path: '/status',
  socketPath: '/socket.io',
  ignoreStartsWith: '/admin',
  healthChecks: [],
  spans: [
    {
      interval: 1,
      retention: 60,
    },
    {
      interval: 5,
      retention: 60,
    },
    {
      interval: 15,
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
};

export default configuration;
