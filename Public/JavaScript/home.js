const url = 'https://industrial.api.ubidots.com/api/v2.0/devices/?token=';
const device = '65486555c7ff10000d104ca5'

let humedad;
let temperatura;

async function showData(){
    const token = 'BBFF-bO1HLWneBBDJgdt02j3VP6C7yHsFAX';
    const sensorHumedad ='65486556c7ff10000e17545c'
    let responseH =  await fetch( "https://industrial.api.ubidots.com/api/v1.6/variables/" + sensorHumedad + '/values/?page_size=1', {
        method: 'GET',
        headers: {
            "X-Auth-Token": token
        }
    })
    humedad = await responseH.json();
    
    const sensorTemp = '65486555c7ff10000d104ca6'
    let responseT =  await fetch( "https://industrial.api.ubidots.com/api/v1.6/variables/" + sensorTemp + '/values/?page_size=1', {
        method: 'GET',
        headers: {
            "X-Auth-Token": token
        }
    })
    temperatura = await responseT.json();


    //console.log(humedad);
    //console.log(temperatura);
    pTemperatura.innerHTML = /*HTML*/`${temperatura.results[0].value}`
    pHumedad.innerHTML = /*HTML*/`${humedad.results[0].value}`
    
}

showData();

//////////////////////

function checkCookieStatus(){
    
}



//////////////////////

async function logOut() {
    
    let response = await fetch('http://localhost:3000/LoggedUser', {
        method: "GET",
        headers: {},
    })

    let data = await response.json()
    console.log(data);

    if(data.userToken){
        await fetch('/LogOut', {
            method: "GET",
            headers: {},
        })

        location.href = '../index.html'
    }
    else{
        console.log('user not logged');
    }

}

//////////////////////

async function changeBanner() {

    let response = await fetch('http://localhost:3000/LoggedUser', {
        method: "GET",
        headers: {},
    })

    let data = await response.json()

    const token = data.userToken
    //console.log(token);
   
    let username = await fetch('/user/login', {
        method: 'GET',
        headers: {
            'x-token': token
        }
    })

    let name = await username.json()
    let tempo = name[0].split('@')
    //console.log(name[0].split('@'));

    mi_cuenta.innerHTML = /*HTML*/`${tempo[0]}`

}

changeBanner();

//////////////////////
//usnado id
const deviceSP2 = "https://industrial.api.ubidots.com/api/v2.0/devices/"

async function showDevice(){
    let data =  await fetch(deviceSP2 + device, {
        method: 'GET',
        headers: {
            "X-Auth-Token": token
        }
        })
    
        let info = await data.json();
    
        //console.log(data);
        console.log(info);
}

//showDevice();



