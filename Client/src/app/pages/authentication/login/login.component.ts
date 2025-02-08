import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthenticationService } from '../../service/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  isSmallScreen: boolean = false;
  hide = true;
  token: string|undefined;
  userName: any;
  passWord: any;

  constructor(
    private http: HttpClient, 
    private _authenticationService: AuthenticationService,
    private messageService: MessageService) {
    this.checkScreenSize();
    this.token = undefined;
  }

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 1024;
  }

  login(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    if(!this.userName) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Vui lòng nhập mã đăng nhập'});
      return;
    }


  }

  get passwordInput() { return this.signin.get('password'); }
}
