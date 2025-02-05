import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
  standalone: false,
})
export class AppPage implements OnInit {
  user: any = null;
  working: boolean = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  ngOnInit() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;// Asignamos el usuario autenticado
        // Recuperar el estado de trabajo desde Firebase (opcional)
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  toggleWorkStatus() {
    this.working = !this.working;
    // Aquí podríamos guardar el estado en Firebase, para que sea persistente
  }
}
