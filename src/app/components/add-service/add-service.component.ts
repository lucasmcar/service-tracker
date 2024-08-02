import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent implements OnInit{

  @Input() clientId: string;
  formAddService: FormGroup;

  constructor(private fb: FormBuilder, private servicoService: ServicesService, private authService: AuthService){
    this.clientId = '';
    this.formAddService = this.fb.group({
      service : [null, Validators.required],
      code : [null, Validators.required],
      description : [null, Validators.required],
      name : [null, Validators.required],
      steps: this.fb.array([this.createSteps()])
      
    });
  }

  ngOnInit(): void {
  }

  onAddService(){
      this.authService.user$.subscribe(async user => {
        if (user) {
          const servico = {
            ...this.formAddService.value,
            clienteId: this.clientId,
            userId: user.uid,
            steps: this.steps.value // Salvando as etapas junto com o serviço
          };
          try {
            await this.servicoService.addService(servico);
            this.formAddService.reset();
            this.steps.clear();
            this.steps.push(this.createSteps());
          } catch (error) {
            console.error('Error adding service:', error);
          }
        }
      });
    
  }

  get steps(): FormArray {
    return this.formAddService.get('steps') as FormArray;
  }

  createSteps(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      complete: [false]
    });
  }

  addSteps() {
    this.steps.push(this.createSteps());
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }
}
