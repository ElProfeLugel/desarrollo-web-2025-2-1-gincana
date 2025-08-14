document.addEventListener("DOMContentLoaded", () =>{

    let botones = Array.from(document.querySelectorAll("button"));

    botones[0].addEventListener('click', calcularPropina5);

    console.log(botones);



    function calcularPropina5(){
        let totalCuenta = document.querySelector("#total");
        let cantidadPersonas = document.querySelector("#cantidad");

        let resultado = (totalCuenta + 0.05) / cantidadPersonas;

        const label =document.querySelector("#resultado");
        label.innerText = resultado


    }

    function calcularPropina10(){
        let totalCuenta = document.querySelector("#total");
        let cantidadPersonas = document.querySelector("#cantidad");

        return (totalCuenta + 0.10) / cantidadPersonas


    }

    function calcularPropina15(){

        let totalCuenta = document.querySelector("#total");
        let cantidadPersonas = document.querySelector("#cantidad");

        return (totalCuenta + 0.15) / cantidadPersonas


    }
})