import {Injectable} from '@angular/core';

@Injectable()
export class LoggerService {
  
  private logData = true;
  private logWarn = true;
  private logErr = true;  
  log(msg: any)   { 
    if(this.logData == true)
      console.log(msg);
   }
  error(msg: any) { 
    if(this.logWarn == true)
      console.error(msg); 
  }
  warn(msg: any)  { 
    if(this.logErr == true)
    console.warn(msg); 
  }
  
}