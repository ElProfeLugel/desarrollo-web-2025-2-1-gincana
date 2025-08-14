document.addEventListener('DOMContentLoaded', () => {
    let contraseña=document.getElementById("password");
    contraseña.addEventListener("input",Check);

    function Check(){
        let password = contraseña.value
        /* se verifica que sean minimo 8 caracteres */
        let minimo8caracteres = document.getElementById("minimo8caracteres");
        let contieneMayuscula = document.getElementById("ContieneMayuscula");
        let contieneNumero = document.getElementById("ContieneNumero");

        if (password.length >= 8){  
            minimo8caracteres.style.color = "green";
             
        }else { 
            minimo8caracteres.setAttribute("style", "color:red;");
        }


    }
});