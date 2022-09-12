declare var require: any
import { SearchDetail, Details } from './../../../classes/APIRestclass';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MessageService, ConfirmationService } from 'primeng/api'
import { APIRestService } from '../../service/APIRestservice';
import { Product } from '../../domain/product';
import { APIRest, RESTmethod } from 'src/app/classes/APIRestclass';
import { Posts } from 'src/app/classes/posts';
import { ProductService } from '../../service/productservice';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';




@Component({
  selector: 'app-apirest',
  templateUrl: './apirest.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./apirest.component.scss'],
  styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class APIRestComponent implements OnInit {
 
  constructor(private _APIRestService: APIRestService) {

  }
  cols: any[];
  expt: Array<any> = [];
  exportColumns;
  lstclasses: APIRest;
  methods: Array<RESTmethod> = [];
  loading = [false, false, false, false];
  first = 0;
  rows = 10;
  form: any = { projet: "", controller: "", methode: "", description: "", codeErreur: "", urlApi: "", urlRessource: "" };
  detail: Details;
  productDialog: boolean;
  opost: Posts = {
    projet: 'REST_API_GUI',
    controller: '',
    methode: '',
    description: '',
    codeErreur: '',
    urlApi: '',
    urlRessource: ''
  }
  emptyf = false;
  fieldsEmpty: boolean = false;
  falseFields: boolean = false;
  APIcontroller = '';
  APImethod = '';
  load(index) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 250);
  }

  ngOnInit() {

    this.cols = [
      { field: "Projet", header: "Projet" },
      { field: "Method", header: "Method" },
      { field: "Api", header: "Api" },
      { field: "Ressource", header: "Ressource" }
    ];
  }
  exportPdf() {
   const doc = new jsPDF('landscape') ;

   const columns = [['Projet','version','class', 'Method', 'Api','Ressource' ,"Verb"]];
   const data = [
   ];
   this.methods.map(function(x){
    data.push([x.projet ,x.version,x.controller, x.nomMethode , x.api , x.ressource, x.verbHTTP]);
  });
    autoTable(doc, {
         head: columns,
         body: data,
         styles: {
          fontSize: 8,
          font: 'helvetica',
          cellPadding: 2,
          minCellHeight: 2,
      },
         didDrawPage: (dataArg) => { 
          doc.text('REST API', dataArg.settings.margin.left, 10);
         }
    });
  
    doc.save("REST_API.pdf");
  }

  async onSubmit(index) {
this.falseFields = false;

    this.load(index);
    this._APIRestService.searchAPIProject(this.form)
      .subscribe
      (
        data => {
          this.lstclasses = data;
          if (this.lstclasses == null) {
            this.fieldsEmpty = true;
            this.falseFields=false;
            let rm: RESTmethod =null;
            this.methods = []
          }
          else {
            if (this.lstclasses.apirestprojects.length<1){
              this.falseFields=true;
            }
            this.methods = []
            for (let i = 0; i < this.lstclasses?.apirestprojects.length; i++) {
              for (let j = 0; j < this.lstclasses?.apirestprojects[i]?.apirestclasses.length; j++) {
                for (let k = 0; k < this.lstclasses?.apirestprojects[i]?.apirestclasses[j]?.apirestmethods.length; k++) {
                  let rm: RESTmethod = {
                    idAPIRestproject: this.lstclasses.apirestprojects[i].idAPIRestproject,
                    projet: this.lstclasses.apirestprojects[i].projet,
                    version: this.lstclasses.apirestprojects[i].version,
                    idAPIRestclass: this.lstclasses.apirestprojects[i].apirestclasses[j].idAPIRestclass,
                    controller: this.lstclasses.apirestprojects[i].apirestclasses[j].controller,
                    idAPIRestmethod: this.lstclasses.apirestprojects[i].apirestclasses[j].apirestmethods[k].idAPIRestmethod,
                    nomMethode: this.lstclasses.apirestprojects[i].apirestclasses[j].apirestmethods[k].nomMethode,
                    description: this.lstclasses.apirestprojects[i].apirestclasses[j].apirestmethods[k].description,
                    idAPIRestressource: this.lstclasses.apirestprojects[i].apirestclasses[j].apirestmethods[k].apirestresources[0]?.idAPIRestressource,
                    api: this.lstclasses.apirestprojects[i].apirestclasses[j].apirestmethods[k].apirestresources[0]?.api,
                    ressource: this.lstclasses.apirestprojects[i].apirestclasses[j].apirestmethods[k].apirestresources[0]?.ressource,
                    verbHTTP: this.lstclasses.apirestprojects[i].apirestclasses[j].apirestmethods[k].apirestresources[0]?.verbHTTP
                  };
                  //this.methods[k] = rm;
                  this.methods.push(rm);

                }
              }
            }
          }
        }
      );

  }
  async detailsAPI(s: RESTmethod) {
    let sd: SearchDetail = {
      idClass: s.idAPIRestclass,
      idMethod: s.idAPIRestmethod,
      idProjet: s.idAPIRestproject
    };
    this.APIcontroller= s.controller;
    this.APImethod = s.nomMethode;
    console.log(s)
    this._APIRestService.searchdetail(sd)
      .subscribe(data => {
        this.detail = data
        console.log("--", this.detail);
        this.productDialog = true;
      });


  }

}
