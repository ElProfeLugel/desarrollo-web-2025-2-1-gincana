let created = false;
document.addEventListener("DOMContentLoaded", () => {
    let generar_btn = document.getElementById("generar_div");
    let contenedor = document.querySelector("main");

    generar_btn.addEventListener("click", () => {
        if(created === true){
            alert("Divs ya creados")
        } else {
            let divs = ["div1", "div2", "div3", "div4", "div5"];
            divs.forEach(function(el) {
                let div = document.createElement("div");
                div.id = el;
                contenedor.appendChild(div);
            });

            let created_divs = Array.from(document.getElementsByTagName("div"));

            created_divs.forEach(div => {
                div.setAttribute("style", `background-color: #${Math.floor(Math.random()*16777215).toString(16)};`)
            });

            created_divs.forEach(div => {
        
               const colorHexa = window.getComputedStyle(div).backgroundColor;

               const textoDiv = document.createTextNode(colorHexa);

               div.appendChild(textoDiv);
            });

            created = true;
        }

    
    
    });

    //
});
