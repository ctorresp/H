#
# Multi-stage build:
# - Compila el .jar dentro de la imagen (evita depender de target/ en el repo)
# - Ejecuta con un JRE liviano
#

FROM eclipse-temurin:25-jdk AS builder
WORKDIR /build

# Copiamos el wrapper y el pom primero para aprovechar caché de Maven
COPY mvnw mvnw.cmd ./
COPY .mvn ./.mvn
COPY pom.xml ./

RUN chmod +x ./mvnw

# Descarga dependencias antes de copiar el resto del código (mejora el cache)
RUN ./mvnw -q -DskipTests dependency:go-offline

COPY src ./src
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:25-jre
WORKDIR /app

# Usuario sin privilegios por seguridad
RUN addgroup --system gea && adduser --system --ingroup gea gea
USER gea

# Copia el jar generado por Maven
COPY --from=builder /build/target/auth-*.jar ./app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]