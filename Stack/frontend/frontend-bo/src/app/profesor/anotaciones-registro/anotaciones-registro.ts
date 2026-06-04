import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- IMPORTANTE

@Component({
  selector: 'app-anotaciones-registro',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- AGREGADO AQUÍ
  templateUrl: './anotaciones-registro.html',
  styleUrl: './anotaciones-registro.css'
})
export class AnotacionesRegistro implements OnInit {
  idCurso: string | null = '';
  alumnoSeleccionado: any = null;
  
  // Variables para el formulario
  tipoAnotacion: 'positiva' | 'negativa' = 'positiva';
  textoAnotacion: string = '';

  // Simulamos la base de datos de alumnos con sus historiales
  alumnos = [
    { id: 1, nombre: 'Ana Gómez Rojas', inicial: 'A', anotaciones: [
      { tipo: 'positiva', texto: 'Participa activamente en la resolución de ejercicios en la pizarra.', fecha: 'Hoy' }
    ]},
    { id: 2, nombre: 'Benjamín Soto Silva', inicial: 'B', anotaciones: [] },
    { id: 3, nombre: 'Camila Pérez López', inicial: 'C', anotaciones: [] },
    { id: 4, nombre: 'Diego Mella Castro', inicial: 'D', anotaciones: [] }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.idCurso = this.route.snapshot.paramMap.get('idCurso');
  }

  volver() {
    this.router.navigate(['/profesor/anotaciones']);
  }

  seleccionarAlumno(alumno: any) {
    this.alumnoSeleccionado = alumno;
    // Reseteamos el formulario al cambiar de alumno
    this.tipoAnotacion = 'positiva';
    this.textoAnotacion = '';
  }

  setTipoAnotacion(tipo: 'positiva' | 'negativa') {
    this.tipoAnotacion = tipo;
  }

  guardarAnotacion() {
    if (!this.textoAnotacion.trim()) return; // No guardar si está vacío

    // 1. Creamos el objeto de la nueva anotación
    const nuevaAnotacion = {
      tipo: this.tipoAnotacion,
      texto: this.textoAnotacion,
      fecha: 'Justo ahora'
    };

    // 2. Lo insertamos al inicio del arreglo del alumno seleccionado (Simula guardar en BD)
    this.alumnoSeleccionado.anotaciones.unshift(nuevaAnotacion);

    // 3. Limpiamos el textarea
    this.textoAnotacion = '';
  }
}