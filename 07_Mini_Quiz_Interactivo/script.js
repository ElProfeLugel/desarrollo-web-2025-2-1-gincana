class Datos{
    constructor(pregunta, opciones, respuestaCorrecta){
        this.pregunta = pregunta
        this.opciones = opciones
        this.respuestaCorrecta = respuestaCorrecta
    }

}

const preguntas=[
    pregunta 
];


function agregarPregunta(pregunta, opciones, respuestaCorrecta){
    let pregunta = new Datos(pregunta, opciones, respuestaCorrecta);
    preguntas.push(pregunta);
}

document.addEventListener('DOMContentLoaded', ()=>{
    agregarPregunta("Todo bien?", ["Bien", "Mal", "No sé"], "No sé");
    let pregunta = document.getElementById("Pregunta");

    for (let i = 0; i < preguntas.length; i++) {
        pregunta.innerHTML += preguntas[i].pregunta ;
      }

})

