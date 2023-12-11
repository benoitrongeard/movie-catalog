import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err))
  .finally(() => {
    console.log('Activate Vercel Speed Insights & Analytics');
    injectSpeedInsights({});
    inject();
  });
