
let AdminToken = {};

//Funcion Login de Usuario
async function login () {
    //Revisar inputs
    let email = document.getElementById('InitEmail').value;
    let password = document.getElementById('InitPassword').value;

    //console.log(email, password);
    let user = {
        email,
        password
    }

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        });

        if(!response.ok) {
            let errorData = await response.json();
            alert(`Error: ${errorData.error}`)
            // :${response.status}/ User-${response.statusText}
        }
        else{
            let token = await response.json()
            console.log(token);
        }
    }
    catch (error) {
        console.log('valio madre algo en login usuarios', error.message);
    }
}

///////////////////

//Funcion registro de Usuario
async function registrarUsuario(){
    let username = document.querySelector("#username").value
    let email = document.querySelector("#email").value
    let password = document.querySelector("#password").value

    let newUSer = {
        username,
        email,
        password
    }

    //console.log(newUSer);

    try {
        const response = await fetch("/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        
            body: JSON.stringify(newUSer)
        })

        if(!response.ok) {
            alert(`Algo fallo de nuestro lado, intentalo de nuevo`)
            // :${response.status}/ User-${response.statusText}
        }
        else{
            alert('Usuario Registrado, Intente iniciar sesion.');
        }
    }
    catch (error) {
        console.log('valio madre algo en registro de usuarios', error.message);
    }



    
}

////////////////////////////////////

function restaurarValores(str) {
    var modal = document.getElementById(str);
    var campos = modal.querySelectorAll("input[type='text']");
    var campos2 = modal.querySelectorAll("input[type='date']");
    var campos3 = modal.querySelectorAll("input[type='number']");

    campos.forEach(function(campo) {
      campo.value = campo.defaultValue;
    });

    campos2.forEach(function(campo) {
        campo.value = campo.defaultValue;
    });

    campos3.forEach(function(campo) {
        campo.value = campo.defaultValue;
      });

}
