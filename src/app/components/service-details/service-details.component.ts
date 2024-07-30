import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit{

  @Input() clienteId: string;
  servico: any;
  servicoId?: string;

  constructor(private serviceService: ServicesService, private route: ActivatedRoute, private authService: AuthService){
    this.clienteId = '';
    
  }

  async ngOnInit() {
    this.servicoId = '';
    this.authService.user$.subscribe(async user => {
      if (user) {
        this.servicoId = this.route.snapshot.paramMap.get('servicoId')!;
        const doc = await this.serviceService.getService(this.servicoId);
        this.servico = doc.data();
      }
    });
  }

}
