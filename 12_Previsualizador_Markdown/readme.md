# Lista de Tareas con Arrastrar y Soltar 👉

## Requerimientos:
* Crear una interfaz para añadir tareas a una lista.
* Cada tarea en la lista debe poder ser arrastrada.
* Permitir al usuario reordenar las tareas en la lista mediante la funcionalidad de "arrastrar y soltar".
* Aplicar un estilo visual (ej: una clase `.dragging`) a la tarea que se está arrastrando para dar feedback al usuario.

### Datos clave:
Para que un elemento sea arrastrable, añade el atributo `draggable="true"` en su etiqueta HTML. Luego, deberás manejar los eventos `dragstart`, `dragover` y `drop` en JavaScript para controlar la lógica.
