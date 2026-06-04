import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistencia-cursos.html', // Asegúrate de que coincida con tu nombre de archivo
  styleUrl: './asistencia-cursos.css'
})
export class AsistenciaCursos {
  
  // Estos datos en el futuro vendrán de tu Microservicio (Backend)
  cursosAsistencia = [
    { id: 1, grado: '1° Medio A', asignatura: 'Matemáticas', alumnos: 35, badge: '1MA' },
    { id: 2, grado: '2° Medio A', asignatura: 'Matemáticas', alumnos: 32, badge: '2MA' },
    { id: 3, grado: '3° Medio B', asignatura: 'Plan Diferenciado Matemáticas', alumnos: 28, badge: '3MB' }
  ];

  constructor(private router: Router) {}

  abrirRegistro(idCurso: string) {
    // Esto te enviará a la ruta: /profesor/asistencia-registro/1MA
    this.router.navigate(['/profesor/asistencia-registro', idCurso]);
  }
}