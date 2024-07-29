import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register/client', 
    loadChildren: ()=>import('./pages/register-client/register-client/register-client.module')
    .then(m => m.RegisterClientModule)
  },
  {
    path: 'register/user', 
    loadChildren: ()=>import('./pages/register-user/register-user/register-user.module')
    .then(m => m.RegisterUserModule)
  },
  {
    path: 'register', 
    loadChildren: ()=>import('./pages/register/register/register.module')
    .then(m => m.RegisterModule)
  },
  {
    path: 'login', 
    loadChildren: ()=>import('./pages/login/login/login.module')
    .then(m => m.LoginModule)
  },
  {
    path: 'service-list', 
    loadChildren: ()=>import('./pages/service-list/service-list/service-list.module')
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
