import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
  
  private logData = true;
  private logWarn = true;
  private logErr = true;  

  log(msg: any)   { 
    if(this.logData == true)
      console.log(msg + '  at time  ' + (new Date).getTime());
   }
  error(msg: any) { 
    if(this.logWarn == true)
      console.error(msg+ '  at time  ' + (new Date).getTime()); 
  }
  warn(msg: any)  { 
    if(this.logErr == true)
    console.warn(msg+ '  at time  ' + (new Date).getTime()); 
  }
  
}