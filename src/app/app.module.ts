import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material/material.module';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    ServiceListComponent,
    RegisterComponent,
    RegisterUserComponent,
    AddServiceComponent,
    ProgressBarComponent,
    ServiceDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
