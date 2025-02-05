import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      /* El uso de take(1) es mejor en este caso porque garantiza que authState solo se revise una vez y no deja suscripción abierta innecesariamente. */
      take(1),
      map((user) => {
        if (user) {
          return true;  // Si el usuario está autenticado, permite el acceso
        } else {
          this.router.navigate(['/home']);  // Si no está autenticado, redirige a la página de login
          return false;
        }
      })
    );
  }
}
