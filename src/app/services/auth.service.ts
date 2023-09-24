import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(private authf: AngularFireAuth, private router: Router) {
    this.authf.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  signInWithGoogle() {
    return this.authf.signInWithPopup(new GoogleAuthProvider()).then((res) => {
      console.log(res.user)
      localStorage.setItem('user', JSON.stringify(res.user));
      this.observeUserState();
    });
  }

  registerWithEmailAndPassword(user: { email: string; password: string }) {
    return this.authf.createUserWithEmailAndPassword(user.email, user.password);
  }

  signInWithEmailAndPassword(user: { email: string; password: string }) {
    return this.authf
      .signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.userData = userCredential.user;

        this.observeUserState();
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  observeUserState() {
    this.authf.authState.subscribe((userState) => {
      if (userState) {
        this.router.navigate(['main']);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  logOut() {
    return this.authf.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
