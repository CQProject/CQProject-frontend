// main entry point
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);


// Configurations
export const API = { 'url': 'http://ec2-52-14-236-74.us-east-2.compute.amazonaws.com/api' };
