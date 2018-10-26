'use strict';

class viewController {

    constructor(param) {
        this.options = param;
        this.connectButtonElement = document.getElementById('connectButton');
        this.targetPeeridBoxElement = document.getElementById('targetPeeridBox');
        this.topButtonElement = document.getElementById('topButton');
        this.leftButtonElement = document.getElementById('leftButton');
        this.rightButtonElement = document.getElementById('rightButton');
        this.bottomButtonElement = document.getElementById('bottomButton');
    }

    initView() {
        console.log = function(log) {
            if(document.getElementById('consoleLog').value.split('\n').length > document.getElementById('consoleLog').getAttribute('rows')){
                document.getElementById('consoleLog').value = log + '\n';
            }
            document.getElementById('consoleLog').value += log + '\n';
        }
    }

    switchConnectButton(isConnected){
        if(isConnected){
            this.connectButtonElement.innerText = 'disconnect';
        }else {
            this.connectButtonElement.innerText = 'connect';
        }
    }

    topButtonActive(){
        this.topButtonElement.classList.add('cross-key-btn-active');
        this.topButtonElement.classList.remove('cross-key-btn');
    }

    topButtonUnActive(){
        this.topButtonElement.classList.add('cross-key-btn');
        this.topButtonElement.classList.remove('cross-key-btn-active');
    }
    
    leftButtonActive(){
        this.leftButtonElement.classList.add('cross-key-btn-active');
        this.leftButtonElement.classList.remove('cross-key-btn');
    }

    leftButtonUnActive(){
        this.leftButtonElement.classList.add('cross-key-btn');
        this.leftButtonElement.classList.remove('cross-key-btn-active');
    }

    rightButtonActive(){
        this.rightButtonElement.classList.add('cross-key-btn-active');
        this.rightButtonElement.classList.remove('cross-key-btn');
    }

    rightButtonUnActive(){
        this.rightButtonElement.classList.add('cross-key-btn');
        this.rightButtonElement.classList.remove('cross-key-btn-active');
    }

    bottomButtonActive(){
        this.bottomButtonElement.classList.add('cross-key-btn-active');
        this.bottomButtonElement.classList.remove('cross-key-btn');
    }

    bottomButtonUnActive(){
        this.bottomButtonElement.classList.add('cross-key-btn');
        this.bottomButtonElement.classList.remove('cross-key-btn-active');
    }

}

export default viewController;