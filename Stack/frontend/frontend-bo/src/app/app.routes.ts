import { Routes } from '@angular/router';
import { Login } from './login/login';
import { LoginForm } from './login/login-form/login-form'; 
import { NuestroColegio } from './nuestro-colegio/nuestro-colegio';
import { Profesor } from './profesor/profesor';
import { AsistenciaRegistro } from './profesor/asistencia-registro/asistencia-registro';
import { AsistenciaCursos }  from './profesor/asistencia-cursos/asistencia-cursos';
import { ProfesorInicio } from './profesor/profesor-inicio/profesor-inicio'; 
import { AnotacionesCursos } from './profesor/anotaciones-cursos/anotaciones-cursos';
import { AnotacionesRegistro } from './profesor/anotaciones-registro/anotaciones-registro';
import { CalificacionesRegistro } from './profesor/calificaciones-registro/calificaciones-registro';
import { CalificacionesCursos } from './profesor/calificaciones-cursos/calificaciones-cursos';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'login/form', component: LoginForm }, 
  { path: 'nuestro-colegio', component: NuestroColegio }, 
  
  // ARQUITECTURA LIMPIA: Ruta de Profesor con sus hijos (Micro-vistas)
  { 
    path: 'profesor', 
    component: Profesor, // Este es tu "cascarón" (Layout con Sidebar y Topbar)
    children: [
      { path: '', component : ProfesorInicio },
      
      // Rutas de Asistencia
      { path: 'asistencia-cursos', component: AsistenciaCursos },
      { path: 'asistencia-registro/:idCurso', component: AsistenciaRegistro },

      // ====== MOVIDAS AQUÍ ADENTRO ======
      // Rutas de Anotaciones
      { path: 'anotaciones', component: AnotacionesCursos },
      { path: 'anotaciones/registro/:idCurso', component: AnotacionesRegistro },

      
      { path: 'calificaciones', component: CalificacionesCursos },
      { path: 'calificaciones/registro/:idCurso', component: CalificacionesRegistro }

    ]
  } // <-- Fíjate que el bloque de Profesor cierra AQUÍ abajo, abarcando todo
];