import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { InvoiceService } from '../_services/index';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import "ag-grid-enterprise";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public columnDefs;
  public gridapi;
  public gridcolumnApi;
  public domLayout;
  public editUrl: string;
  public rowSelection;
  public rowSelected: boolean;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private UserService: UserService
  ) { this.domLayout = "forPrint";
  this.columnDefs = this.createColumnDefs();
}

  ngOnInit() {
  sessionStorage.removeItem('selectedUserId')
  this.rowSelected = false;
  this.returnUrl = '/dashboard/profile'
    if (this.auth.admin == false) {
      console.log(this.auth.admin);
      this.router.navigate([this.returnUrl])
    }
  }
  editUser() {
    this.editUrl = '/dashboard/admin/' + sessionStorage.getItem('selectedUserId')
    this.router.navigate([this.editUrl])
  }
  addUser(){
    this.editUrl = '/dashboard/admin/add'
    this.router.navigate([this.editUrl])
  }
  sendResetEmail(){
    this.UserService.sendResetEmail(sessionStorage.getItem('selectedUserId'))
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
  onSelectionChanged() {
    this.rowSelected = true;
    var selectedRows = this.gridapi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.id;
      sessionStorage.setItem('selectedUserId',selectedRow.id);
      console.log(sessionStorage.getItem('selectedUserId'))
    });
    // document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }
  onGridReady(params): void {
    this.gridapi = params.api;
    this.gridcolumnApi = params.columnApi;
    this.gridapi.sizeColumnsToFit();
    this.UserService.userList()
    .subscribe(
        userList => {
              params.api.setRowData(userList);                
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
        {headerName: 'User Name',field: 'userName', minWidth: 150},
        {headerName: 'First Name',field: 'firstName', minWidth: 150},
        {headerName: 'Last Name',field: 'lastName', minWidth: 150},
        {headerName: 'Email',field: 'email', minWidth: 150},
        {headerName: 'Contact Address',field: 'contactAddress', minWidth: 150},
        {headerName: 'Phone Number',field: 'phoneNumber', minWidth: 150},
        {headerName: 'Active',field: 'isActive', minWidth: 150},
        {headerName: 'Site Administrator',field: 'isAdmin', minWidth: 150},
        {headerName: 'Accepted Terms',field: 'termsAndConditions', minWidth: 150},
        {headerName: 'Date Accepted Terms',field: 'dateTermsAccepted', minWidth: 150},
        this.rowSelection = "single"
    ]
}
}

 