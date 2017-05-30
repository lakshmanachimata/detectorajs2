import {Injectable} from '@angular/core';
import { i18n_Lang_Defs } from './i18n-data'
@Injectable()
export class i18nService {
    private wordDefs=[];
    private notFoundDefs=[];
    constructor(private _ldefs:i18n_Lang_Defs){
        this.loadLangTranlations();
    }

    private loadLangTranlations(){
        let translation:string = this._ldefs.getTranslations();
        let index:number = 0;
        let strLength:number = translation.length;

        this.wordDefs = [];
        while(index < strLength){
            var _inIndx = translation.indexOf('<trans-unit',index);
            if(_inIndx < 0) break;

            var _startIndx = translation.indexOf('<source>',_inIndx);
            var _endIndx = translation.indexOf('</source>',_startIndx);

            if(_startIndx < 0 || _endIndx < 0) break;
            _startIndx+=8;//<source> length
            
            var _source = translation.substring(_startIndx,_endIndx);
            
            _startIndx = translation.indexOf('<target>',_inIndx);
            _endIndx = translation.indexOf('</target>',_startIndx);

            if(_startIndx < 0 || _endIndx < 0) break;
            _startIndx+=8;//<target> length

            var _target = translation.substring(_startIndx,_endIndx);

            index = _endIndx;
            
            this.wordDefs[_source] = _target;
        }
        
    }
    public translate(_srcString):string{
        if(this.wordDefs[_srcString])
        {
            return this.wordDefs[_srcString]
        }
        if(true){//trans not found while testing
            if(!this.notFoundDefs[_srcString])
            {
                this.notFoundDefs[_srcString] = "1";
                console.log('trans not found : '+_srcString)
            }
        }
        return _srcString;
    }

}