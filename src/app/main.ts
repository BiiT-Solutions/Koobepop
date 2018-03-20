import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
//import{enableProdMode} from '@angular/core';
//enableProdMode();
console.log("Main")
platformBrowserDynamic().bootstrapModule(AppModule);
