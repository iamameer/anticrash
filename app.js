const express = require('express');
const app = express();

const config = require('./config');

const schedule = require('node-schedule'); 
//Every 1sec = train moves duh
schedule.scheduleJob('*/1 * * * * *', moveTrain); 

//Startup notice
app.listen(config.PORT, () => {
    console.log(`App listening on port ${config.PORT}!`);
});

// ---------------------------- Dummy Settings ---------------------------- //
let trainA  = {
    latitude : 123,
    longitude : 456
}

let trainB  = {
    latitude : 555,
    longitude : 456
}

// ----------------------------- End Settings ----------------------------- //

function moveTrain() {

    let aBefore = trainA.latitude
    let bBefore = trainB.latitude

    trainA.latitude += 50
    console.log(`trainA: `)
    console.log(trainA)

    trainB.latitude -= 50
    console.log(`trainB:`)
    console.log(trainB)

    let aAfter = trainA.latitude
    let bAfter = trainB.latitude

    if(aBefore < bBefore){
        if(aAfter > bAfter){
            console.log(`${new Date().toLocaleString()} - Train has crashed!!`)
            process.exit() //Time to call 911 perhaps?
        }
    }

    checkDistance(trainA,trainB)
}

function checkDistance(trainA,trainB){
    let distance = Math.abs(trainA.latitude - trainB.latitude)
    
    //assuming speed = 50m per second
    if(distance < 150){ 
        console.log(`${new Date().toLocaleString()} - TRAIN CRASHING IN ${distance/50} seconds!`)
    }else{ 
        console.log(`${new Date().toLocaleString()} - Checking distance = ${distance}`)
    }
}

module.exports = app
