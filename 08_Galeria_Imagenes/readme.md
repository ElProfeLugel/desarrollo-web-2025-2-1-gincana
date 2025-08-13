# Galería de Imágenes Dinámica 🖼️

## Requerimientos:
* Crear la estructura HTML con un contenedor para la imagen principal y botones de "Anterior" y "Siguiente".
* Usar un array de strings en JS que contenga las URLs de las imágenes.
* Mostrar la primera imagen del array al cargar la página.
* Implementar la lógica de los botones para navegar entre las imágenes del array.
* Asegurarse de que la navegación sea cíclica (al llegar al final y dar "Siguiente", vuelve al principio, y viceversa).

### Datos clave:
Usa una variable de índice para rastrear la imagen actual. Para que la navegación sea cíclica, puedes usar el operador módulo (`%`) o condicionales `if` para reiniciar el índice a 0 o al final del array.
