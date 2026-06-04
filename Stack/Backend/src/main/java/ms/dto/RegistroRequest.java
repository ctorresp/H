package ms.dto;

public record RegistroRequest(
    String nombre,
    String apellido,
    String email,
    String contrasena,
    String tipo // estudiante, profesor, apoderado, admin
) {}
