package ms.auth.Service;

import ms.dto.*;
import ms.auth.Model.Usuario;
import ms.auth.Repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService; // <-- Se declara aquí arriba

    // <-- Se recibe aquí como parámetro para la inyección de dependencias
    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService; // <-- Se asigna aquí adentro
    }

    public String registrar(RegistroRequest request) {
        // 1. Verificar si el email ya existe
        if (usuarioRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        // 2. Crear nueva entidad y encriptar la contraseña
        Usuario nuevoUsuario = new Usuario(
            request.nombre(),
            request.apellido(),
            request.email(),
            passwordEncoder.encode(request.contrasena()), // Hash de seguridad
            request.tipo()
        );

        usuarioRepository.save(nuevoUsuario);
        return "Usuario registrado exitosamente";
    }

    public AuthResponse login(LoginRequest request) {
        // 1. Buscar usuario por email
        Usuario usuario = usuarioRepository.findByEmail(request.email())
            .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        // 2. Validar contraseña (compara el texto plano con el hash de la BD)
        if (!passwordEncoder.matches(request.contrasena(), usuario.getContrasena())) {
            throw new RuntimeException("Credenciales inválidas");
        }
   
        // 3. Generar el JWT real
        String token = jwtService.generarToken(usuario.getEmail(), usuario.getTipo());

        return new AuthResponse(token, usuario.getEmail(), usuario.getTipo());
    }

    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    public String eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con el ID: " + id);
        }
        usuarioRepository.deleteById(id);
        return "Usuario eliminado correctamente";
    }

    public String actualizarUsuario(Long id, ActualizarUsuarioRequest request) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el ID: " + id));

        if (request.email() != null && !request.email().equals(usuario.getEmail())) {
            if (usuarioRepository.findByEmail(request.email()).isPresent()) {
                throw new RuntimeException("El nuevo correo ya está en uso por otra cuenta");
            }
            usuario.setEmail(request.email());
        }
        if (request.nombre() != null) {
            usuario.setNombre(request.nombre());
        }
        if (request.apellido() != null) {
            usuario.setApellido(request.apellido());
        }
        if (request.tipo() != null) {
            usuario.setTipo(request.tipo());
        }

        usuarioRepository.save(usuario);
        return "Usuario actualizado correctamente";
    }
}