import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { GreetingsComponent } from './app/greetings/greetings.component';

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
