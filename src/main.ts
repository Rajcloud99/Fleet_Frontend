import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error('bootstrape error',err));
/*
let onDeviceReady = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error('bootstrape error',err));
};
document.addEventListener('deviceready', onDeviceReady, false);
*/


