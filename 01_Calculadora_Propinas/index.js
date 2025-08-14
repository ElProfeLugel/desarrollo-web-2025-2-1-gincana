document.addEventListener("DOMContentLoaded", () => {
    const botones = Array.from(document.querySelectorAll("button"));
  
    botones.forEach(boton =>
      boton.addEventListener("click", calcularPropina5)
    );
    
    
    function calcularPropina5() {
      // Obtener valores numéricos desde los inputs
      const totalCuenta = parseFloat(document.querySelector("#total").value) || 0;
      const cantidadPersonas = parseInt(document.querySelector("#cantidad").value) || 1;
  
      const resultado = (totalCuenta * 0.05) / cantidadPersonas;
  
      
      const comparacionEl = document.getElementById("resultado");
      comparacionEl.value = resultado.toFixed(2);
      comparacionEl.innerText = resultado.toFixed(2);
  
      console.log({ totalCuenta, cantidadPersonas, resultado });
    }

    function calcularPropina10() {
       
        const totalCuenta = parseFloat(document.querySelector("#total").value) || 0;
        const cantidadPersonas = parseInt(document.querySelector("#cantidad").value) || 1;
    
        const resultado = (totalCuenta * 0.10) / cantidadPersonas;
    
        
        const comparacionEl = document.getElementById("resultado");
        comparacionEl.value = resultado.toFixed(2);
        comparacionEl.innerText = resultado.toFixed(2);
    
        console.log({ totalCuenta, cantidadPersonas, resultado });
      }
    

    function calcularPropina15() {
        
        const totalCuenta = parseFloat(document.querySelector("#total").value) || 0;
        const cantidadPersonas = parseInt(document.querySelector("#cantidad").value) || 1;
    
        const resultado = (totalCuenta * 0.15) / cantidadPersonas;
    
        
        const comparacionEl = document.getElementById("resultado");
        comparacionEl.value = resultado.toFixed(2);
        comparacionEl.innerText = resultado.toFixed(2);
    
        console.log({ totalCuenta, cantidadPersonas, resultado });
      }
    

});
