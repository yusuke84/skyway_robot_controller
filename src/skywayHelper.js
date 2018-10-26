'use strict';

import Peer from 'skyway-js';

class skywayHelper {

    constructor(param) {
        this.options = param;
        this.skywayControlInstance = null;
        this.connection = null;
        this.isConnectedPeer = false;
        this.call = null;
    }

    connectPeer(targetPeerid,dcCallback,mcCallback) {
        this.skywayControlInstance = new Peer({key: this.options.APIKEY,debug: 0});
        this.skywayControlInstance.on('open', peerId =>{
            this.connection = this.skywayControlInstance.connect(targetPeerid, {
                serialization: "none"
            });

            this.connection.on('data', (data)=> {
                console.log(data);
            });

            this.connection.on("open", ()=> {
                console.log('connect dc');
                this.isConnectedPeer = true;
                dcCallback();
            });

            this.call = this.skywayControlInstance.call(targetPeerid, null, {
                videoReceiveEnabled: true
            });
            
            this.call.on('stream', (stream)=> {
                console.log('connect mc');
                mcCallback(stream);
            });
        });
    }

    disconnectPeer(){
        this.connection.close();
        this.call.close();
        this.skywayControlInstance.destroy();
        this.skywayControlInstance = null;
        this.connection = null;
        this.isConnectedPeer = false;

    }

    dataSend(value){
        if(this.connection !== null){
            this.connection.send(value);
        }
    }

    isConnectedPeer(){
        return this.isConnectedPeer;
    }

}
export default skywayHelper;