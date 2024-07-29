import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { getFirestore, doc, setDoc} from 'firebase/firestore';
import { User as FirebaseUser} from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit{

  formRegisterUser: FormGroup;
  userId: string | undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.formRegisterUser = this.formBuilder.group({
      name: [null, Validators.required],
      companyName: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }


  async ngOnInit() {
    try {
      const user: FirebaseUser | null = await this.authService.getUser();
      if (user) {
        this.userId = user.uid;
      } else {
        this.router.navigate(['/login']); // Redireciona para a página de login se o usuário não estiver logado
      }
    } catch (error) {
      console.error('Error fetching user', error);
    }
  }

  async onSubmit() {
    if (this.formRegisterUser.valid && this.userId) {
      const { name, companyName, phone } = this.formRegisterUser.value;
      await this.authService.saveUserProfile(this.userId, name, companyName, phone);
      this.formRegisterUser.reset();
    }
  }
  

}
