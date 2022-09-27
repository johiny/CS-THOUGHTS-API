import {feelingType} from "./thoughtModel"

type ipRegistry = {
  [key : string]: {
    [key : string] : number[]
  }
}

class coolDownService {
  ipList: ipRegistry
  coolDownTime : number
  constructor(){
    this.ipList = {}
    this.coolDownTime = 360000
  }
  addToIpList(ip : string, thoughtId : number, feeling : feelingType) {
    if(!this.ipList[ip]){
      this.ipList[ip] = {}
    }
    if(this.ipList[ip][feeling]){
      this.ipList[ip][feeling].push(thoughtId)
      setTimeout(() => {
        this.removeFromIpList(ip, thoughtId, feeling)
      }, this.coolDownTime)
    }
    else{
      this.ipList[ip][feeling] = [thoughtId]
      setTimeout(() => {
        this.removeFromIpList(ip, thoughtId, feeling)
      }, this.coolDownTime)
    }
  }
  removeFromIpList(ip : string, thoughtId: number, feeling : feelingType){
    this.ipList[ip][feeling] = this.ipList[ip][feeling].filter(id => !(id === thoughtId))
    for(const key in this.ipList[ip]){
      if(this.ipList[ip][key].length === 0){
        delete this.ipList[ip][key]
      }
    }
    if(Object.keys(this.ipList[ip]).length === 0){
      delete this.ipList[ip]
    }
  }

  verifyCoolDown(ip : string, thoughtId: number, feeling : feelingType){
    if(this.ipList[ip]){
      let coolDown = false
      this.ipList[ip][feeling]?.forEach((id) => {
        if(id === thoughtId){
          coolDown = true
        }
      })
      return coolDown
    }
    else{
      return false
    }
  }
}

export default coolDownService
