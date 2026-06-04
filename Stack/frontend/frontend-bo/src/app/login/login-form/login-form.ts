import { Component } from '@angular/core';
import {Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  // 2. Inyectamos el Router a través del constructor
  constructor(private router: Router) {}

  // 3. Este es el método que se gatilla al presionar el botón de ingresar
  onLogin() {
    // Aquí irá tu lógica de autenticación (llamar a tu API, validar contraseñas, etc.)
    // Por ahora, simulamos que el login es exitoso y redirigimos:
    console.log('Click detectado, redirigiendo...');
    this.router.navigate(['/profesor']);
}


}
