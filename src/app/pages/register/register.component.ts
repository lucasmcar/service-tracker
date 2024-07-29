import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {


  formRegister: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.formRegister = this.formBuilder.group(
      {
        email: [null],
        password: [null],
        
      }
    )
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault()
    event.stopPropagation();
  }

  ngOnInit(): void {
    
  }

  registerUser(){
    const { email, password } = this.formRegister.value;
    this.authService.signUp(email, password)
    .then(()=> {
      this.formRegister.reset();
      this.router.navigate(['/service-list']); 
    })
    .catch((err) => console.log(err));
  }




}
