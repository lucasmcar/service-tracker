import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'service/details', 
    loadChildren: ()=>import('./components/service-details/service-details/service-details.module')
    .then(m => m.ServiceDetailsModule)
  },
  {
    path: 'register/service', 
    loadChildren: ()=>import('./components/add-service/add-service/add-service.module')
    .then(m => m.AddServiceModule)
  },
  {
    path: 'register/client', 
    loadChildren: ()=>import('./components/register-client/register-client/register-client.module')
    .then(m => m.RegisterClientModule)
  },
  {
    path: 'register/user', 
    loadChildren: ()=>import('./components/register-user/register-user/register-user.module')
    .then(m => m.RegisterUserModule)
  },
  {
    path: 'register', 
    loadChildren: ()=>import('./components/register/register/register.module')
    .then(m => m.RegisterModule)
  },
  {
    path: 'login', 
    loadChildren: ()=>import('./components/login/login/login.module')
    .then(m => m.LoginModule)
  },
  {
    path: 'service-list', 
    loadChildren: ()=>import('./components/service-list/service-list/service-list.module')
    .then(m => m.ServiceListModule)
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
