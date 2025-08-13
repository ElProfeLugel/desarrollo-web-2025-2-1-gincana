# Temporizador Pomodoro 🍅

## Requerimientos:
* Crear la interfaz HTML con un display para el tiempo (ej: 25:00) y botones de "Iniciar", "Pausar", "Reiniciar".
* Implementar la lógica de cuenta regresiva desde 25:00.
* Hacer que los botones de Pausa y Reinicio funcionen correctamente.
* Cuando el temporizador llegue a 0, iniciar automáticamente un temporizador de descanso de 5 minutos.
* Cambiar el estilo de la página (ej: color de fondo) para indicar si es un ciclo de trabajo o de descanso.

### Datos clave:
Para la cuenta regresiva, la función `setInterval()` es fundamental. Ejecutará un bloque de código cada segundo. Recuerda manejar la conversión de segundos totales a formato minutos:segundos.
