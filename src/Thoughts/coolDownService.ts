import {feelingType} from "./thoughtModel"

type ipRegistry = {
  [key : string]: {
    [key : string] : {[key : string] : {timestamp : number ,timer: ReturnType<typeof setTimeout>}}
  }
}

class coolDownService {
  ipList: ipRegistry
  coolDownTime : number
  constructor(){
    this.ipList = {}
    this.coolDownTime = 3600000
  }
  addToIpList(ip : string, thoughtId : number, feeling : feelingType) {
    if(!this.ipList[ip]){
      this.ipList[ip] = {}
    }
    if(!this.ipList[ip][feeling]){
      this.ipList[ip][feeling] = {}
    }
    let timer = setTimeout(() => {
        this.removeFromIpList(ip, thoughtId, feeling)
      }, this.coolDownTime)
      this.ipList[ip][feeling][thoughtId] = {timestamp: Date.now(), timer: timer}
    }

  removeFromIpList(ip : string, thoughtId: number, feeling : feelingType){
    clearTimeout(this.ipList[ip][feeling][thoughtId].timer)
    delete this.ipList[ip][feeling][thoughtId]
    for(const key in this.ipList[ip]){
      if(Object.keys(this.ipList[ip][key]).length === 0){
        delete this.ipList[ip][key]
      }
    }
    if(Object.keys(this.ipList[ip]).length === 0){
      delete this.ipList[ip]
    }
  }

  getTimeLeft(thought: any) {
    const timeLeft = Math.ceil( (this.coolDownTime - (Date.now() - thought.timestamp)) / 60000)
    return timeLeft
  }

  verifyCoolDown(ip : string, thoughtId: number, feeling : feelingType){
    if(this.ipList[ip]){
        if(this.ipList[ip][feeling]){
          if(this.ipList[ip][feeling][thoughtId]){
            return this.getTimeLeft(this.ipList[ip][feeling][thoughtId])
          }
        }
      }
    return false
}

}

export default coolDownService
