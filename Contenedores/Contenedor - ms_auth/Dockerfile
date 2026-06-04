#
# Dockerfile simplificado - Ejecuta un JAR precompilado
# Uso: El JAR (auth-*.jar) debe estar en la misma carpeta que este Dockerfile
# No requiere código fuente ni compilación
#

FROM eclipse-temurin:25-jre
WORKDIR /app

# Usuario sin privilegios por seguridad
RUN addgroup --system gea && adduser --system --ingroup gea gea
USER gea

# Copia el JAR precompilado (debe estar en Contenedor - ms_auth/)
COPY auth-*.jar ./app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]