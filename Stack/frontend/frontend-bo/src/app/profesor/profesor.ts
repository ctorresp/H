import { Component } from '@angular/core';
// AQUÍ ESTÁ LA MAGIA: Importamos las 3 herramientas que pide el HTML
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profesor',
  standalone: true,
  // LAS AGREGAMOS AL ARREGLO DE IMPORTS:
  imports: [RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './profesor.html',
  styleUrl: './profesor.css'
})
export class Profesor {
  // El cascarón queda limpio
}