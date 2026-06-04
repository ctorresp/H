import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calificaciones-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calificaciones-cursos.html',
  styleUrl: './calificaciones-cursos.css'
})
export class CalificacionesCursos {
  cursosCalificaciones = [
    { id: 1, grado: '1° Medio A', asignatura: 'Matemáticas', alumnos: 35, badge: '1MA' },
    { id: 2, grado: '2° Medio A', asignatura: 'Matemáticas', alumnos: 32, badge: '2MA' },
    { id: 3, grado: '3° Medio B', asignatura: 'Plan Diferenciado', alumnos: 28, badge: '3MB' }
  ];

  constructor(private router: Router) {}

  abrirRegistro(idCurso: string) {
    this.router.navigate(['/profesor/calificaciones/registro', idCurso]);
  }
}