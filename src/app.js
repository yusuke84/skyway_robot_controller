'use strict';

import skywayHelper from './skywayHelper'
import viewController from './viewController'
import utility from './utility'

const skywayOptions = {
    APIKEY: '2ff0e6f8-d0f2-40de-a03c-7e8079f00b57',
}

const connectButtonElement = document.getElementById('connectButton');
const targetPeeridBoxElement = document.getElementById('targetPeeridBox');

window.gamepadsArray = [];
window.myReq = null;
window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e,true) });
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e,false) });
const skyway = new skywayHelper(skywayOptions);
const view = new viewController();
view.initView();

connectButtonElement.addEventListener('click', ()=> {
    if(!skyway.isConnectedPeer){
        skyway.connectPeer(targetPeeridBoxElement.value,() => {
            window.myReq = requestAnimationFrame(pollGamepads);
            view.switchConnectButton(true);
        },(stream) => {
            utility.playMediaStream(document.getElementById('remoteVideo'),stream);
        });
    }else {
        view.switchConnectButton(false);
        skyway.disconnectPeer();
        cancelAnimationFrame(window.myReq);
        window.myReq = null;
    }

});

/* ====== functions ======= */

function dataSend(key,value){
    if(key === 0 || key === 1){
        const message = "" + key + "," + value;
        console.log("send " + message);
        skyway.dataSend(message);
        if(key === 1 && value < -0.5){
            view.topButtonActive();
        }else if(key === 1 && value > -0.5){
            view.topButtonUnActive();
        }
        if(key === 1 && value > 0.5){
            view.bottomButtonActive();
        }else if(key === 1 && value < 0.5){
            view.bottomButtonUnActive();
        }
        if(key === 0 && value < -0.5){
            view.leftButtonActive();
        }else if(key === 0 && value > -0.5){
            view.leftButtonUnActive();
        }
        if(key === 0 && value > 0.5){
            view.rightButtonActive();
        }else if(key === 0 && value < 0.5){
            view.rightButtonUnActive();
        }
    }
}

function gamepadHandler(event,connecting){
    const gamepad = event.gamepad;
  
    if (connecting) {
        window.gamepadsArray[gamepad.index] = gamepad;
        console.log('connected:' + gamepad.id);
        if(skyway.isConnectedPeer){
            window.myReq = requestAnimationFrame(pollGamepads);
        }
      } else {
        delete window.gamepadsArray[gamepad.index];
        console.log('disconnected:' + gamepad.id);
        if(window.myReq !== null) {
            cancelAnimationFrame(window.myReq);
            window.myReq = null;
        }
      }
}

function pollGamepads(){
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    let isGamePad = false;
    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            window.gamepadsArray[gamepads[i].index] = gamepads[i];
        }
    }

    for (const key in window.gamepadsArray) {
        const gamepad = window.gamepadsArray[key];
        for (let i = 0; i < gamepad.axes.length; i++) {
            const val = gamepad.axes[i].toFixed(4);
            dataSend(i, gamepad.axes[i].toFixed(4));
        }
    }
    window.myReq = requestAnimationFrame(pollGamepads);  
}