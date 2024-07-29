import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  form: FormGroup;

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault()
    event.stopPropagation();
  }


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group(
      {
        email: [null],
        password: [null]
      }
    );
  }

  ngOnInit(): void {

  }

  login() {
    const { email, password } = this.form.value;
    this.authService.signIn(email, password)
      .then(() => {
        console.log("Usuario Logado com sucesso");
        this.router.navigate(['/service-list']); // Redireciona para a página 'home
      })
      .catch((err) => console.log(err))
  }

}