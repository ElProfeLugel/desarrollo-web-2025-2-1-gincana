let boton;
let usuarios;
document.addEventListener('DOMContentLoaded', () => {
    boton = document.querySelector('#generar') 
    boton.addEventListener('click', usuarioRandom) 
     

    usuarios = [
        {
          nombre: "Juliana Herrera",
          cargo: "Desarrolladora Frontend",
          biografia: "especializada en diseño de paginas web institucionales"
        },
        {
          nombre: "Isabella ceballos",
          cargo: "ingeniera de Datos",
          biografia: "especializada machine learning."
        },
        {
          nombre: "Laura Bedoya",
          cargo: "Arquitecta de software",
          biografia: "lidera equipos, crea diagramas y tiene una comunicación asertiva con el usuario "
        }
      ];
    
})
    
function usuarioRandom(){
    const alea = Math.floor(Math.random() * usuarios.length);
    const usuario =usuario[alea];
    
}



