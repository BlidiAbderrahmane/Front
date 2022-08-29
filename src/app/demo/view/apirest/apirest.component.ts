import { SearchDetail, Details } from './../../../classes/APIRestclass';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService, ConfirmationService } from 'primeng/api'
import { APIRestService } from '../../service/APIRestservice';
import { Product } from '../../domain/product';
import { APIRest, RESTmethod } from 'src/app/classes/APIRestclass';
import { Posts } from 'src/app/classes/posts';
import { ProductService } from '../../service/productservice';
//import jsPDF from "jspdf";
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

  load(index) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 250);
  }

  ngOnInit() {
  }
  exportPdf() {
    // const doc = new jsPDF();
    //const doc = new jsPDF('p','pt');
    //doc['autoTable']( this.methods);
    // doc.autoTable(this.exportColumns, this.products);
    //doc.save("REST_API.pdf");
  }

  async onSubmit(index) {


    this.load(index);
    this._APIRestService.searchAPIProject(this.form)
      .subscribe
      (
        data => {
          this.lstclasses = data;
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
      );

  }
  async editProduct(s: RESTmethod) {
    let sd: SearchDetail = {
      idClass: s.idAPIRestclass,
      idMethod: s.idAPIRestmethod,
      idProjet: s.idAPIRestproject
    };
    console.log(s)
    this._APIRestService.searchdetail(sd)
      .subscribe(data => {
        this.detail = data
        console.log("--", this.detail);
        this.productDialog = true;
      });


  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.methods ? this.first === (this.methods.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.methods ? this.first === 0 : true;
  }

}
