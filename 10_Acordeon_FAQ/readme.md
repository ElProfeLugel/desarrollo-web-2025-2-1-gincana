# Acordeón de Preguntas Frecuentes (FAQ) 📜

## Requerimientos:
* Crear la estructura HTML para varias parejas de pregunta y respuesta.
* Usar CSS para ocultar todas las respuestas por defecto.
* Al hacer clic en una pregunta, su respuesta debe mostrarse con una animación suave.
* Asegurarse de que solo una respuesta pueda estar abierta a la vez (al abrir una, las demás se cierran).

### Datos clave:
Para la animación de despliegue suave, usa la propiedad `transition` de CSS sobre `max-height`. En JS, antes de abrir un elemento, recorre todos los demás y quítales la clase que los mantiene abiertos.

