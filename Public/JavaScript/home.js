const url = 'https://industrial.api.ubidots.com/api/v2.0/devices/?token=';


const UToken = 'BBFF-bO1HLWneBBDJgdt02j3VP6C7yHsFAX'


const device = '65486555c7ff10000d104ca5'

//console.log(url + token);

async function infoDevices ( ){
    let data =  await fetch(url +  UToken, {
    method: 'GET',
    headers: {}
    })

    let info = await data.json();

    //console.log(data);
    console.log(info);
}

//infoDevices();

//usnado id
const deviceSP2 = "https://industrial.api.ubidots.com/api/v2.0/devices/"

async function showDevice(){
    let data =  await fetch(deviceSP2 + device, {
        method: 'GET',
        headers: {
            "X-Auth-Token": UToken
        }
        })
    
        let info = await data.json();
    
        //console.log(data);
        console.log(info);
}

//showDevice();

const variableUrl = "https://industrial.api.ubidots.com/api/v1.6/variables/"


const humedad1 ='65486556c7ff10000e17545c'
const temp1 = '65486555c7ff10000d104ca6'

async function getVariables(sensor){
    let data =  await fetch( variableUrl + sensor + '/values/?page_size=2', {
        method: 'GET',
        headers: {
            "X-Auth-Token": UToken
        }
        })
    
        let info = await data.json();
    
        //console.log(data);
        console.log(info);
}

getVariables(temp1);
getVariables(humedad1);


