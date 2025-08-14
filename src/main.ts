import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { GreetingsComponent } from './app/greetings/greetings.component';
import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';

if (isDevMode()) {
  // Bootstrap the application only in development mode to run it locally for development and testing.
  bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
} else {
  // Create a custom element and define it as a web component
  // This allows the application to be used as a micro frontend in other applications.
  (async () => {
    try {
      const app = await createApplication(appConfig);
      const appElement = createCustomElement(GreetingsComponent, {
        injector: app.injector,
      });
      customElements.define('ng-greetings-mfe', appElement);
    } catch (err) {
      console.error(err);
    }
  })();  
}
