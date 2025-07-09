import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GreetingsComponent } from './greetings/greetings.component';

@Component({
  selector: 'app-root',
  imports: [GreetingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-mfe-demo';
}
