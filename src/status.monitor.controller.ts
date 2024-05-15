import { Get, Controller, HttpCode, Inject, Res, Req } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { HealthCheckService } from './health.check.service';
import { PATH_METADATA } from '@nestjs/common/constants';
import { STATUS_MONITOR_OPTIONS_PROVIDER } from './status.monitor.constants';
import { StatusMonitorConfiguration } from './config/status.monitor.configuration';
const Handlebars = require('handlebars');

@Controller()
export class StatusMonitorController {
  data;
  render;

  constructor(
    private readonly healtCheckService: HealthCheckService,
    @Inject(STATUS_MONITOR_OPTIONS_PROVIDER) config: StatusMonitorConfiguration,
  ) {
    const bodyClasses = Object.keys(config.chartVisibility)
      .reduce((accumulator, key) => {
        if (config.chartVisibility[key] === false) {
          accumulator.push(`hide-${key}`);
        }
        return accumulator;
      }, [])
      .join(' ');

    console.log(bodyClasses);

    this.data = {
      title: config.pageTitle,
      port: config.port,
      socketPath: '',
      bodyClasses: bodyClasses,
      script: fs.readFileSync(
        path.join(__dirname, './public/javascripts/app.js'),
      ),
      style: fs.readFileSync(
        path.join(__dirname, './public/stylesheets/style.css'),
      ),
    };

    const htmlTmpl = fs
      .readFileSync(path.join(__dirname, './public/index.html'))
      .toString();

    this.render = Handlebars.compile(htmlTmpl, { strict: true });
  }

  public static forRoot(rootPath: string = 'monitor') {
    Reflect.defineMetadata(PATH_METADATA, rootPath, StatusMonitorController);
    return StatusMonitorController;
  }

  @Get()
  @HttpCode(200)
  async root(@Req() req, @Res() res) {
    const healtData = await this.healtCheckService.checkAllEndpoints();
    this.data.healthCheckResults = healtData;
    const html = this.render(this.data);
    res.type('text/html').send(html);
  }
}
