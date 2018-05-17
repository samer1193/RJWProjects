import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy  } from '@angular/core';
import { fileUploadService, AlertService} from '../_services/index';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Message, accList } from '../manage-invoices/manage-invoices.model'
import { NgOption } from '@ng-select/ng-select';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-manage-invoices',
  templateUrl: './manage-invoices.component.html',
  styleUrls: ['./manage-invoices.component.css']
})
export class ManageInvoicesComponent implements OnInit {
  model: any={};
  fileToUpload: File = null;
  docTypes = ['Carrier Invoice','Signed Delivery Receipt','Lumper Receipt','Signed Rate Confirmation','Unsigned Rate Confirmation', 'Drop Sheet'];
  public message: Message;
  loads = [];
  allLoads = [];
  public visibleAnimate = false;
  public visible = false;
  public result: string;
  public refnumber: string;
  public movenumber: string;
  public _docType: string;
  public selected = [];
  public dataResultMovement: Array<{}>;
  public _selected: string;
  public loading = false;
  public accessorials = {} as accList;
  public accList= [];
  public added: boolean;
  accTypes = ['Detention','Driver Assist','FSC', 'Hazmat','Layover Pay', 'Lumper','Miscellaneous Charges','Pickup Fee','Stop Off Pay'];
  public lhRequired: boolean;
  constructor(
    private fileUploadService: fileUploadService
  ) { }

  ngOnInit() {
    this.model = null;
    this.added = false;
    this.lhRequired = true;
    this.getLoads()
  }

  handleFileInput(files: FileList) {
    document.getElementById("fileName").textContent = files[0].name;
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.result = '';
    this.lhRequired = true;
    if ( this._docType === 'Carrier Invoice'){
    this.accessorials.linehaul = parseFloat(this.accessorials.linehaul.valueOf()).toFixed(2)
  }
    if(this.model.walmartYesNo == 'Y'){
      this.fileUploadService.postFile(this.fileToUpload, this.model.orders[0],this._docType,this.model.refnumber, this.model.movenumber, this.accessorials.linehaul, this.accList)
        .subscribe(
          result => {
            this.message = result as any;
            this.result = this.message.message
            this.loading = true;
            this.accTypes = ['Detention','Driver Assist','FSC', 'Hazmat','Layover Pay', 'Lumper','Miscellaneous Charges','Pickup Fee','Stop Off Pay'];
            this.accList = [];
            this.accessorials.linehaul = '';
            this._docType = null
            this.model = null;
            this.lhRequired = false;
        }, error => {
          this.result = error.error.message;
          console.log('11111' + error)
        } 
        )
    } else if ( this.model.walmartYesNo == 'N' && this._docType == 'Signed Delivery Receipt'){
      this.fileUploadService.postFile(this.fileToUpload, this._selected,this._docType,this.model.refnumber, this.model.movenumber, this.accessorials.linehaul,this.accList)
        .subscribe(
          result => {
            this.message = result as any;
            this.result = this.message.message
            this.accTypes = ['Detention','Driver Assist','FSC', 'Hazmat','Layover Pay', 'Lumper','Miscellaneous Charges','Pickup Fee','Stop Off Pay'];
            this.accList = [];
            this.accessorials.linehaul = '';
            this._docType = null
            this.model = null;
            this.lhRequired = false;
        }, error => {
          this.result = error.error.message;
          console.log('22222' + error)
        } 
        )
    } else {
      this.fileUploadService.postFile(this.fileToUpload, this.model.orders[0],this._docType,this.model.refnumber, this.model.movenumber, this.accessorials.linehaul, this.accList)
        .subscribe(
          result => {
            this.message = result as any;
            this.result = this.message.message
            this.accTypes = ['Detention','Driver Assist','FSC', 'Hazmat','Layover Pay', 'Lumper','Miscellaneous Charges','Pickup Fee','Stop Off Pay'];
            this.accList = [];
            this.accessorials.linehaul = '';
            this._docType = null
            this.model = null;
            this.lhRequired = false;
        }, error => {
          this.result = error.error.message;
          console.log('33333' + error)
        } 
        )
    }
  }

  onChange(val){
    this.accTypes = ['Detention','Driver Assist','FSC', 'Hazmat','Layover Pay', 'Lumper','Miscellaneous Charges','Pickup Fee','Stop Off Pay'];
    this.accList = [];
    this.accessorials.linehaul = '';
    console.log(val)
    if (val === undefined){
      this.dataResultMovement = [];
    } else{
    this.selected = val.orders;
    console.log(this.selected)}
  }
  getLoads(){
    this.fileUploadService.getLoads().pipe(delay(500))
    .subscribe(
      loads => {
        this.loads = loads as any;
        // console.log(this.loads);
        // this.loads = [...this.allLoads];
      }
    )
  }
  addAccessorials(){
    this.added = true;
    let acc = {} as accList;
    acc.type = this.accessorials.type;
    this.accessorials.accessorial = parseFloat(this.accessorials.accessorial.valueOf()).toFixed(2)
    acc.accessorial = this.accessorials.accessorial
    this.accList.push(acc);
    this.accTypes = this.accTypes.filter(item => item !== acc.type)
    console.log(this.accList)
    console.log(this.accessorials.linehaul)
  }
  remove(acc){
    this.accList = this.accList.filter(item => item !== acc)
    this.accTypes.push(acc.type);
    this.accTypes.sort();
  }
  
  lhCheck(){
    console.log(this._docType)
    if (this._docType === 'Carrier Invoice'){
      this.lhRequired = false;
    } else {
      this.lhRequired = true;
    }
  }

  lhFlag(){
    var length = Math.log10(parseFloat(this.accessorials.linehaul.valueOf()))+1
    if(length < 0){
      this.lhRequired = false;
    } else {
      this.lhRequired = true;
    }
  }
  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }
  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}