export interface ChartVisibilityConfiguration {
  cpu: boolean;
  mem: boolean;
  load: boolean;
  heap: boolean;
  eventLoop: boolean;
  responseTime: boolean;
  rps: boolean;
  statusCodes: boolean;
}
