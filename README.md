# Descripción del microservicio

El microservicio permite:

- Registro de usuarios
- Inicio de sesión
- Generación de token JWT
- Persistencia en MySQL

---

# Construcción del proyecto

El proyecto utiliza Maven para generar el archivo ejecutable `.jar`.

## Paso 1 - Entrar a la carpeta Stack

```bash
cd Stack
```

---

## Paso 2 - Generar el JAR

Linux/Mac:

```bash
./mvnw clean package
```

Windows:

```bash
mvnw.cmd clean package
```

---

## Resultado esperado

Se generará:

```plaintext
target/auth-0.0.1-SNAPSHOT.jar
```

---

# Dockerización del microservicio

## Despliegue en Entornos No Locales

Para desplegar el microservicio de autenticación en cualquier entorno (como servidores Ubuntu, AWS, Azure, etc.), utiliza Docker y Docker Compose. Esto asegura que la aplicación se ejecute de manera consistente sin depender del entorno local.

### Requisitos Previos

- Docker instalado en el servidor.
- Docker Compose instalado.
- Puerto 8080 disponible en el servidor.

### Pasos de Despliegue

1. Clona o copia el repositorio al servidor:

   ```bash
   git clone <url-del-repositorio>
   cd <directorio-del-proyecto>
   ```

2. Navega al directorio del backend:

   ```bash
   cd Stack/Backend
   ```

3. Construye y ejecuta los contenedores:

   ```bash
   docker compose up --build -d
   ```

   - `--build`: Construye la imagen desde el Dockerfile.
   - `-d`: Ejecuta en segundo plano.

### Verificación

- Verifica que los contenedores estén corriendo:

  ```bash
  docker compose ps
  ```

- Accede a la aplicación en `http://<ip-del-servidor>:8080`

### Servicios Incluidos

- **auth-api**: El microservicio de autenticación (puerto interno 8081, expuesto en 8080).
- **mysql**: Base de datos MySQL para persistencia.

### Detener el Despliegue

Para detener los servicios:

```bash
docker compose down
```

### Notas Adicionales

- La base de datos se inicializa automáticamente con el esquema `db_usuarios`.
- Los datos de MySQL se persisten en un volumen Docker.
- Si necesitas cambiar configuraciones, edita `application.properties` o las variables de entorno en `docker-compose.yml`.

# Endpoints principales

# Registro de usuario

## Endpoint

```http
POST /auth/registrar
```

## URL local

```plaintext
http://localhost:8080/auth/registrar
```

## Body

```json
{
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan@example.com",
  "contrasena": "password123",
  "tipo": "estudiante"
}
```

## Respuesta esperada

```plaintext
OK
```

---

# Inicio de sesión

## Endpoint

```http
POST /auth/login
```

## URL local

```plaintext
http://localhost:8080/auth/login
```

## Body

```json
{
  "email": "juan@example.com",
  "contrasena": "password123"
}
```

## Respuesta esperada

Token JWT del usuario autenticado.

---

# Acceso desde otro computador

Si el sistema está desplegado en un servidor:

```plaintext
http://IP_SERVIDOR:8080/auth/login
```

Ejemplo:

```plaintext
http://192.168.1.20:8080/auth/login
```

---

# Detener contenedores

```bash
docker compose down
```

---
