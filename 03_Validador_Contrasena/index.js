document.addEventListener('DOMContentLoaded', () => {
    const contraseña=document.getElementById("password").addEventListener("input",Contraseña())


    function Check(){
    const password = contraseña.value

/* se verifica que sean minimo 8 caracteres */
const minimo8caracteres = document.getElementById("minimo8caracteres");
if (password.length >= 8){  
    minimo8caracteres.classList.add("valid");
    minimo8caracteres.classList.remove("invalid");   
}else { 
    minimo8caracteres.classList.add("invalid");
    minimo8caracteres.classList.remove("valid");
}

})