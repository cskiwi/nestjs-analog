import { Component, inject } from '@angular/core';
import { CountService } from './data-access/count.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  providers: [CountService],
  template: `
    <h2>Analog</h2>

    <div class="card">
      <button
        type="button"
        (click)="count.increment$.next()"
        [disabled]="count.status() !== 'success'"
      >
        Counting {{ count.count() }}
      </button>
    </div>
  `,
  styles: [``],
})
export default class HomeComponent {
  public count = inject(CountService);
}
