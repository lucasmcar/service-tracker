import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './app/src/environments/environments';
import { AppModule } from './app/app.module';

import { initializeApp } from 'firebase/app';

initializeApp(environment.firebase);

if (environment.production) {
  //enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
