import { Component, OnInit } from '@angular/core';
import { ServiceList } from './models/servicelist';
import { ServicesService } from '../../services/services.service';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent implements OnInit {

  services$ : Observable<ServiceList[]>;
  displayedColumns = ['service', 'code'];
  userName: string | undefined;

  constructor(private listService: ServicesService, private authService: AuthService, private router: Router ){
    //this.services = [];
    this.services$ = this.listService.listServices().pipe(
      catchError(
        error => {
          return of([])
        }
      )
    );
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(async (user) => {
      if (user) {
        const userProfile = await this.authService.getUserProfile(user.uid);
        if (userProfile && userProfile['companyName']) {
          this.userName = userProfile['companyName'];
        }
      }
    });
  }
  
  async onSignOut(){
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    } catch (error) {
      console.error('Error signing out', error);
    }
  }

  onFabClick(){
    
  }

}
