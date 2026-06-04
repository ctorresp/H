import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asistencia-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistencia-registro.html', // Revisa si tu archivo se llama .component.html o .html
  styleUrl: './asistencia-registro.css'     // Revisa si tu archivo se llama .component.css o .css
})
export class AsistenciaRegistro implements OnInit {
  idCurso: string | null = '';
  fechaActual = '04-06-2026';

  // Datos simulados (En el futuro, harás un fetch al Microservicio de Asistencia usando el idCurso)
  alumnos = [
    { id: 1, nombre: 'Ana Gómez Rojas', estado: 'presente' },
    { id: 2, nombre: 'Benjamín Soto Silva', estado: 'presente' },
    { id: 3, nombre: 'Camila Pérez López', estado: 'ausente' },
    { id: 4, nombre: 'Diego Mella Castro', estado: 'atrasado' }
  ];

  // Inyectamos ActivatedRoute para leer la URL y Router para navegar de vuelta
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Leemos el parámetro dinámico ':idCurso' que configuramos en app.routes.ts
    this.idCurso = this.route.snapshot.paramMap.get('idCurso');
    console.log('Conectando con el Microservicio para el curso:', this.idCurso);
  }

  volver() {
    // Regresa de forma segura al listado de tarjetas
    this.router.navigate(['/profesor/asistencia-cursos']);
  }

  guardarAsistencia() {
    // Aquí dispararías el método POST de tu servicio hacia el backend
    alert(`Asistencia del curso ${this.idCurso} enviada con éxito al microservicio.`);
    this.volver();
  }
}