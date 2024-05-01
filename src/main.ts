import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoadingInterceptor } from './app/http-interceptors/loading-interceptor';
import { MessageService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ]
})
  .catch((err) => console.error(err));
