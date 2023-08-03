import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: `
     <app-analog-welcome/>
  `,
})
export default class HomeComponent {}
