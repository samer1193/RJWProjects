import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy  } from '@angular/core';
import { fileUploadService, AlertService} from '../_services/index';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Message } from '../manage-invoices/manage-invoices.model'
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
<<<<<<< HEAD
  public loading = false;
  
=======
  public loading: boolean;
>>>>>>> CarrierPortalEdits
  constructor(
    private fileUploadService: fileUploadService
  ) { }

  ngOnInit() {
<<<<<<< HEAD
=======
    this.loading = false;
    this.model = null;
>>>>>>> CarrierPortalEdits
    this.getLoads()
  }

  handleFileInput(files: FileList) {
<<<<<<< HEAD
=======
    console.log(files.item(0).name);
    var file = document.getElementById('fileName')
    document.getElementById('fileName').innerHTML = files.item(0).name;
>>>>>>> CarrierPortalEdits
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    // if (this.fileToUpload.type == 'application/pdf' || this.fileToUpload.type == 'image/png'|| this.fileToUpload.type == 'image/jpg'|| this.fileToUpload.type == 'image/jpeg') {
      console.log(this.model);
      console.log(this._selected);
    if(this.model.walmartYesNo == 'Y'){
      this.fileUploadService.postFile(this.fileToUpload, this.model.orders[0],this._docType,this.model.refnumber, this.model.movenumber)
        .subscribe(
          result => {
            this.message = result as any;
            this.result = this.message.message
            this.loading = true;
        }, error => {
          console.log(error)
        } 
        )
    } else if ( this.model.walmartYesNo == 'N' && this._docType == 'Signed Delivery Receipt'){
      this.fileUploadService.postFile(this.fileToUpload, this._selected,this._docType,this.model.refnumber, this.model.movenumber)
        .subscribe(
          result => {
            this.message = result as any;
            this.result = this.message.message
        }, error => {
          console.log(error)
        } 
        )
    } else {
      this.fileUploadService.postFile(this.fileToUpload, this.model.orders[0],this._docType,this.model.refnumber, this.model.movenumber)
        .subscribe(
          result => {
            this.message = result as any;
            this.result = this.message.message
        }, error => {
          console.log(error)
        } 
        )
    }
  }
  test(val){
    console.log(val);
  }
  onChange(val){
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