import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import {LicenseManager} from "ag-grid-enterprise/main";
// LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_9_May_2018__MTUyNTgyMDQwMDAwMA==40d1bf2e87e01cc773d9502f6f3a5c26");

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
