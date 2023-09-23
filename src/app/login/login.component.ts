import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { initializeApp } from '@angular/fire/app';

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('recaptchaContainer') recaptchaContainer!: ElementRef;

  confirmationResult: any; // Variable para almacenar confirmationResult

  phoneNumber: string = '';
  firstName: string = '';
  lastName: string = '';
  verificationCode: string = '';

  auth: any;
  reCaptchaVerifier: any;
  allForm: boolean;
  codeSent: Boolean;
  codeWrong: Boolean;
  loader: Boolean;
  numberForm: boolean;
  wrongPhoneNumber: boolean;

  constructor(private authService: AuthService, private router: Router) {

    this.auth = getAuth(initializeApp(environment.firebase));
    this.allForm = true;
    this.codeSent = false;
    this.codeWrong = false;
    this.loader = false;
    this.numberForm = true;
    this.wrongPhoneNumber = false;
  }

  sendVerificationCode() {
    if (!this.firstName || !this.lastName || !this.phoneNumber) {
      alert('Todos los campos son requeridos');
      return;
    }

    if (this.reCaptchaVerifier) {
      this.reCaptchaVerifier.clear();
      this.recaptchaContainer.nativeElement.innerHTML = `
      <div id="recaptcha-container" #recaptchaContainer></div>
      `;
    }

    this.loader = true;
    this.allForm = false;
    this.wrongPhoneNumber = false;

    this.reCaptchaVerifier = new RecaptchaVerifier(
      this.auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response: any) => {
        },
      }
    );
    signInWithPhoneNumber(this.auth, this.phoneNumber, this.reCaptchaVerifier)
      .then((confirmationResult) => {
        this.codeSent = true;

        this.loader = false;
        this.numberForm = false;
        this.allForm = true;
        this.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        this.wrongPhoneNumber = true;

        this.loader = false;
        this.allForm = true;
        this.numberForm = true;
        this.codeSent = false;

        console.error(error);
      });
  }

  verifyCode(code: string) {
    if (!code) {
      return;
    }
    this.codeWrong = false;
    this.codeSent = false;
    this.loader = true;

    this.confirmationResult
      .confirm(code)
      .then((userCredential: any) => {
        this.loader = false;
        this.allForm = true;
        this.codeSent = true;

        const user = userCredential.user;
        this.router.navigateByUrl('main');
      })
      .catch((error: any) => {
        this.loader = false;
        this.allForm = true;

        this.codeSent = true;

        if (error.state == 400) {
          this.codeWrong = true;
        }
        console.error('Error al verificar el código de verificación', error);
      });
  }

  signUpGoogle() {
    this.authService
      .signInWithGoogle()
      .then((res: any) => {
        this.router.navigateByUrl('main');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
