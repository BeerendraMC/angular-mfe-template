import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-greetings',
  imports: [],
  templateUrl: './greetings.component.html',
  styleUrl: './greetings.component.scss',
})
export class GreetingsComponent {
  name = input<string>();
  getGreetingClick = output<string>();

  onGetGreetingsClick() {
    this.getGreetingClick.emit(`Hello, ${this.name()}!`);
  }
}
