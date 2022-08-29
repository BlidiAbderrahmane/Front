import { APIRest, SearchDetail } from './../../classes/APIRestclass';
import { async } from '@angular/core/testing';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Posts } from "src/app/classes/posts";

@Injectable()
export class APIRestService{
    constructor(private httpclient: HttpClient){}
    /*
    searchAllProjects(): Observable<any>{
        console.log("3HERERERERERE3");
        return this.httpclient.get('http://localhost:8081/searchAllProjects');
    }
    */
    searchAPIProject(opost:any): Observable<any>{
        console.log("||||||||||||||  TEST POST |||||||||||||||");
        return this.httpclient.post('http://localhost:8081/searchAPIProject',opost);

    }
    searchdetail(opost:SearchDetail): Observable<any>{
        return this.httpclient.post('http://localhost:8081/searchAPIDetail',opost);

    }


}