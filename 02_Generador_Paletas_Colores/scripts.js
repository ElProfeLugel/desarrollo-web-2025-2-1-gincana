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
            created = true;
        }
    
    });

    //
});
