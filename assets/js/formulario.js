let input = document.getElementsByClassName("form_input");

for(let i = 0; i < input.length;i++){
    input[i].addEventListener('keyup', function(){
        if(this.value.length>=1){
            this.nextElementSibling.classList.add('sujetar');
        }
        else{
            this.nextElementSibling.classList.remove('sujetar');
        }
    });
}

let menu= document.querySelector("#menu");
let toggleicon=document.querySelector("#toggle-icon");

toggleicon.addEventListener("click", function(){
    menu.classList.toggle("menu-on");
});
// var fecha=new Date();
// document.write(fecha.getFullYear());

function numeros(n){
    let key = n.keyCode||n.wich;
    let teclado = String.fromCharCode(key);
    let numero = "1234567890";
    let especial = "8-37-39-46-164";
    let teclado_especial = true;
    
    for( let i in especial){
        if(key == especial){
            teclado_especial = true;
        }
    }
    if(numero.indexOf(teclado) == -1 && (teclado_especial)){
            return false;
    }
}

function letras3(L){
    let key=L.keyCode||L.which;
    let tecla=String.fromCharCode(key).toLowerCase();
    let letras="áéíóúabcdefghijklmnñopqrstuvwxyz";
    let especial="8-37-39-46-164";
    let tecla_especial=false;

    for(var j in especial){
        if(key==especial[j]){
            tecla_especial=true;
            break;
        }
    }
    if(letras.indexOf(tecla)==-1&&!tecla_especial){
        return false;
    }
}

// document.getElementById('nombre').addEventListener('keypress', letras3);
// document.getElementById('telefono').addEventListener('keypress', numeros);
