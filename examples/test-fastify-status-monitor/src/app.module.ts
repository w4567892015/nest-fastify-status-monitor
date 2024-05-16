import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  WebStatusMonitorModule,
  WebStatusMonitorConfiguration,
} from '../../../dist';

const webStatusMonitorConfig: WebStatusMonitorConfiguration = {
  pageTitle: 'Nest.js Monitoring Page',
  port: 3001,
  path: '/status',
  socketPath: '/socket.io',
  ignoreStartsWith: '/admin',
  healthChecks: [
    {
      protocol: 'http',
      host: 'localhost',
      path: '/',
      port: 3000,
    },
  ],
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
};

@Module({
  imports: [WebStatusMonitorModule.setUp(webStatusMonitorConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
