import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

export interface CountState {
  count: number | null;
  status: 'loading' | 'success' | 'error';
  error: string | null;
}

@Injectable()
export class CountService {
  private apiService = inject(HttpClient);
  // private paramMap = inject(ActivatedRoute).paramMap;

  private state = signal<CountState>({
    count: null,
    status: 'loading',
    error: null,
  });

  // selectors
  count = computed(() => this.state().count);
  status = computed(() => this.state().status);
  error = computed(() => this.state().error);

  // sources
  // articleLoaded$ = this.paramMap.pipe(
  //   switchMap((params) => this.apiService.getCountById(params.get("id")))
  // );

  countLoaded$ = this.apiService.get<{ count: number }>('/api');
  increment$ = new Subject<void>();

  constructor() {
    //  reducers
    this.countLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (result) =>
        this.state.update((state) => ({
          ...state,
          count: result.count,
          status: 'success',
          error: null,
        })),
      error: (error) =>
        this.state.update((state) => ({ ...state, error, status: 'error' })),
    });

    this.increment$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.state.update((state) => ({
        ...state,
        status: 'loading',
        error: null,
      }));
      this.apiService.get<{ count: number }>('/api/increment').subscribe({
        next: (result) =>
          this.state.update((state) => ({
            ...state,
            count: result.count,
            status: 'success',
            error: null,
          })),
        error: (error) =>
          this.state.update((state) => ({ ...state, error, status: 'error' })),
      });
    });
  }
}
