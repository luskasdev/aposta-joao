import { NgModule, isDevMode } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthHttpInterceptor, authHttpInterceptorFn, AuthModule, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideAuth0({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: environment.auth.authorizationParams.redirect_uri,
        audience: environment.auth.authorizationParams.audience,
      },
      httpInterceptor: {
        allowedList: [
          `${environment.apiUrl}/api/*`
        ]
      }
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
