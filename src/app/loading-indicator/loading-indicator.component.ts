import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../loading.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.css',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    AsyncPipe
  ]
})
export class LoadingIndicatorComponent {
  loading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = loadingService.loading$;
  }
}
