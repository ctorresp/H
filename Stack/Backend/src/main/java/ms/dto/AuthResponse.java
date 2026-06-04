package ms.dto;

public record AuthResponse(
    String token,
    String email,
    String tipo
) {}
