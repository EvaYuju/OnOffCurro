import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  isLogin: boolean = true;  // Controla si estamos en login o en registro

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Usuario autenticado:", user);
      }
    });
  }

  // Cambia entre login y registro
  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  // Función que maneja el submit del formulario
  async onSubmit() {
    try {
      if (this.isLogin) {
        // Si estamos en login
        await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/app']); // Redirige al home de la app
      } else {
        // Si estamos en registro
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
        const user = userCredential.user;

        if (!user) {
          throw new Error("No se pudo crear el usuario.");
        }
// Solo guardamos el nombre sin la foto
if (this.name) {
  await user.updateProfile({
    displayName: this.name,
  });
}

        console.log('Usuario registrado con éxito');
        this.router.navigate(['/app']);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      alert('Ocurrió un error. Por favor revisa los datos e intenta nuevamente.');
    }
  }
}
