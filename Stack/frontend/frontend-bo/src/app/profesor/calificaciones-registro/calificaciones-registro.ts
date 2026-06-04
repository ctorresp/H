import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calificaciones-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calificaciones-registro.html',
  styleUrl: './calificaciones-registro.css'
})
export class CalificacionesRegistro implements OnInit {
  idCurso: string | null = '';
  
  // Simulamos la BD de notas
  alumnos = [
    { id: 1, nombre: 'Ana Gómez Rojas', n1: 6.5, n2: 7.0, n3: 6.8 },
    { id: 2, nombre: 'Benjamín Soto Silva', n1: 5.4, n2: 6.0, n3: null },
    { id: 3, nombre: 'Camila Pérez López', n1: 4.5, n2: 5.0, n3: 5.5 },
    { id: 4, nombre: 'Diego Mella Castro', n1: 6.0, n2: null, n3: null }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.idCurso = this.route.snapshot.paramMap.get('idCurso');
  }

  volver() {
    this.router.navigate(['/profesor/calificaciones']);
  }

  calcularPromedio(a: any): string {
    let suma = 0; let cant = 0;
    if (a.n1) { suma += Number(a.n1); cant++; }
    if (a.n2) { suma += Number(a.n2); cant++; }
    if (a.n3) { suma += Number(a.n3); cant++; }
    return cant === 0 ? '-' : (suma / cant).toFixed(1);
  }

  guardarNotas() {
    alert('Planilla de notas guardada correctamente en la base de datos.');
  }
}