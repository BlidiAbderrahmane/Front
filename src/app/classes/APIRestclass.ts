class OEParams {
    idParamOE: String;
    nom: String;
    typeIO: String;
    typeOE: String;
}

class HttpParams {
    idParamHttp: String;
    nomOE: String;
    nomHttp: String;
    typeIO: String;
    mappingHttp: String;
}

class FunctionalErrors {
    idError: String;
    value: String;
    code: String;
}

export class Details{
    api : String;
	ressource : String;
	oeParams: OEParams[];
    httpParams: HttpParams[];
    functionalErrors: FunctionalErrors[];
}
export class apiressource {
    idAPIRestressource: string;
    api: string;
    ressource: string;
    verbHTTP: string;
}
export class apirestmethod {
    idAPIRestmethod: string;
    nomMethode: string;
    description: string;
    apirestresources: apiressource[];
}
export class apirestclass {
    idAPIRestclass: string;
    controller: string;
    apirestmethods: apirestmethod[];
}
export class apirestproject {
    idAPIRestproject: string;
    projet: string;
    version: string;
    apirestclasses: apirestclass[];
}

export class APIRest {
    apirestprojects: apirestproject[];
}

export class RESTmethod {
    idAPIRestproject: string;
    projet: string;
    version: string;
    idAPIRestclass: string;
    controller: string;
    idAPIRestmethod: string;
    nomMethode: string;
    description: string;
    idAPIRestressource: string;
    api: string;
    ressource: string;
    verbHTTP: string;

}
export class SearchDetail {
    idProjet: string;
    idClass: string;
    idMethod: string;
}