import { Component, OnInit } from '@angular/core';
import { ServiceList } from '../../models/servicelist';
import { ServicesService } from '../../services/services.service';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent implements OnInit {

  //services$ : Observable<ServiceList[]>;
  displayedColumns: string[] = ['service', 'code', 'description', 'clienteId', 'actions'];
  services: any[] = [];
  userName = '';
  editForm: FormGroup;
  editIndex: number | null = null;

  constructor(private listService: ServicesService, private fb: FormBuilder, private authService: AuthService, private router: Router ){
    //this.services = [];
    this.editForm = this.fb.group({
      service: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  loadServices() {
    this.listService.getService().subscribe(services => {
      this.services = services;
    });
  }

  ngOnInit(): void {
    this.loadServices();
    this.authService.user$.subscribe(async (user) => {
      if (user) {
        const userProfile = await this.authService.getUserProfile(user.uid);
        if (userProfile && userProfile['companyName']) {
          this.userName = userProfile['companyName'];
        }
      }
    });
  }

  /*editService(id: string) {
    this.listService.updateService(id).subscribe(()=>{

    })
  }*/

  startEdit(index: number) {
    this.editIndex = index;
    const service = this.services[index];
    this.editForm.patchValue(service);
  }

  cancelEdit() {
    this.editIndex = null;
  }


  saveEdit(id: string) {
    if (this.editForm.valid) {
      this.listService.updateService(id, this.editForm.value).subscribe(() => {
        this.loadServices();
        this.editIndex = null;
      });
    }
  }

  deleteService(id: string) {
    this.listService.deleteService(id).subscribe(() => {
      this.loadServices(); // Recarregar os serviços após a deleção
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
    try{
      this.router.navigate(['/register/service']);
    }catch(err) { 
      console.error('Erro', err);
    }
  }

}
