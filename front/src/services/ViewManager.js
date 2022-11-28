import router from '../router'
import io from 'socket.io-client';

class ViewManager {
 constructor () {
  console.log('123')
   this.interval = null;
   this.status = null;
 }
 changeView() {
    switch(this.status) {
      case 'CONNECTED':
        router.push({name: 'connected'});
        break;
      case 'FAILED':
        router.push({name: 'failed'});
        break;
      case 'ANSWERED':
        router.push({name: 'answered'});
        break;
      case 'RINGING':
        router.push({name: 'ringing'});
        break;
    }
  }
  checkStatus() {
    const socker = io(process.env.VUE_APP_SERVER_URL, {
       reconnection: false,
       transports: ["websocket", "polling"]
    });
    socker.on('status', (status) => {
        if(status !== this.status) {
            this.status = status;
            this.changeView();
        }
        this.status = status;
    })

  }
  stopPolling () {
    clearInterval(this.interval)
  }
 
}

export default new ViewManager()