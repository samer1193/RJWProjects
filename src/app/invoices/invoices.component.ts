import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../_services/index';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { Invoices } from '../invoices/invoices.model'
// import {ColDef, ColumnApi, GridApi} from 'ag-grid';
import 'rxjs/add/operator/map';
import "ag-grid-enterprise";
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import {TooltipModule} from "ngx-tooltip";
import { DocumentComponent } from '../document/document.component'

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
    position = 'before';
    // private rowData: Invoices[];
    public columnDefs;
    public detailCellRendererParams;
    public detailRowHeight;
    public gridapi;
    public gridcolumnApi;
    public domLayout;
  constructor(
    private route: ActivatedRoute,
    private http:HttpClient,
    private InvoiceService: InvoiceService,
    private datePipe: DatePipe
    
  ) { 
      this.domLayout = "forPrint";
      this.detailRowHeight = 120;
      this.columnDefs = this.createColumnDefs();
      this.detailCellRendererParams = {
        
          detailGridOptions:{
            toolPanelSuppressSideButtons: true,
              columnDefs: [
                {headerName: 'Pro Number',field: 'proNumberDD', minWidth: 150},
                {headerName: 'Invoice Date',field: 'invoiceRcvdDateDD', minWidth: 150},
                {headerName: 'Invoice Status',field: 'invoiceStatusDD', minWidth: 150},
                {headerName: 'Amount',field: 'docamntdd'}
              ],
              onGridReady: function(params){
                  params.api.sizeColumnsToFit();
              }
          },
          getDetailRowData: function(params) {
              params.successCallback(params.data.drillDown);
          }
      }
  }
  ngOnInit() {}
  onGridReady(params): void {
      this.gridapi = params.api;
      this.gridcolumnApi = params.columnApi;
      this.gridapi.sizeColumnsToFit();
      this.InvoiceService.getInvoices(sessionStorage.getItem('selectedCarrierId'))
      .subscribe(
          invoice => {
                params.api.setRowData(invoice);             
          },
          error => {
              console.log(error);
          }
      )
      setTimeout(function() {
              var rowCount = 0;
              params.api.forEachNode(function(node) {
                node.setExpanded(rowCount++ === 1);
              });
            }, 500);
  }
  private createColumnDefs(){
      return [
        {headerName: 'Load Number',field: 'loadNumber',cellRenderer: "agGroupCellRenderer", minWidth: 100, tooltipField: 'loadNumber'},
        {headerName: 'Invoice Number',field: 'carInvoicenumber', minWidth: 100},
        {headerName: 'Move Number',field: 'movenumber', minWidth: 100},
        {headerName: 'Check Number',field: 'checknumber', minWidth: 100},
        {headerName: 'Invoice Status',field: 'invoiceStatus', minWidth: 100},
        {headerName: 'Amount',field: 'docamnt', minWidth: 100},
        {headerName: 'Invoice Recv Date',field: 'invoiceRcvdDate', cellClass: 'dateType', minWidth: 150},
        {headerName: 'Document Status',cellRendererFramework: DocumentComponent, minWidth: 225}
      ]
  }
}