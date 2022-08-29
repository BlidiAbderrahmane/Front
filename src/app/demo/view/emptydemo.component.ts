import {Component} from '@angular/core';
import { APIRestService } from '../service/APIRestservice';

import { APIRest,apirestproject } from 'src/app/classes/APIRestclass';
import { Posts } from 'src/app/classes/posts';
@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent {
    constructor(private _APIRestService: APIRestService){

    }
    lstclasses: APIRest;
    ngOnInit(){
        
        var opost = new  Posts;
        opost.projet='REST_API_GUI';
        opost.controller='com.dsia.wms.api.rest.gui.';
        opost.methode='getListeAnnonce';
        opost.description='/* Purpose: Notes: */';
        opost.codeErreur='';
        opost.urlApi='/reception';
        opost.urlRessource='/getListeAnnonce';

        this._APIRestService.searchAPIProject(opost)
        .subscribe
        (
            data=>
            {
                this.lstclasses=data;
                console.log(this.lstclasses);
                
            
            }
        );
    }

   
}
