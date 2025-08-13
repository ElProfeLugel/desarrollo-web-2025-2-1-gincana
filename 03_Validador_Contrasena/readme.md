# Validador de Fortaleza de Contraseña 🔐

## Requerimientos:
* Crear un `input` de tipo `password` y una lista de requisitos (ej: mínimo 8 caracteres, contiene una mayúscula, contiene un número).
* Estilizar la lista para que cada requisito pueda cambiar de estado visualmente.
* Añadir un `event listener` al `input` para que se active en cada pulsación de tecla.
* Verificar en tiempo real si la contraseña cumple cada uno de los requisitos.
* Añadir o quitar una clase CSS (ej: `.valid`) a cada `<li>` para cambiar su estilo si el requisito se cumple o no.

### Datos clave:
Utiliza expresiones regulares (RegEx) para buscar patrones específicos en el string de la contraseña, como mayúsculas (`/[A-Z]/`) o números (`/[0-9]/`).
