import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfig } from './app.config';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AdminGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, ProfileService, InvoiceService, fileUploadService, validateUserService,TermsService } from './_services/index';
import { LoginComponent } from './login/index';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ManageInvoicesComponent } from './manage-invoices/manage-invoices.component';
import { AgGridModule } from "ag-grid-angular";
import { InterceptorModule } from './interceptor.module';
import { LicenseManager } from "ag-grid-enterprise/main";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UserSetupComponent } from './user-setup/user-setup.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {ModalComponent} from './modal.component';
import { TermsComponent } from './terms/terms.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { CarriersComponent } from './carriers/carriers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ ToastModule } from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';
import { TooltipModule } from 'ngx-tooltip';
import { DocumentComponent } from './document/document.component'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        HttpClientModule,
        RouterModule,
        AgGridModule.withComponents([
            [DocumentComponent]
        ]),
        InterceptorModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        [NgSelectModule],
        PdfViewerModule,
        ToastModule.forRoot(),
        BrowserAnimationsModule,
        TooltipModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        ProfileComponent,
        InvoicesComponent,
        ManageInvoicesComponent,
        AdminComponent,
        PasswordResetComponent,
        UserSetupComponent,
        ModalComponent,
        TermsComponent,
        EditComponent,
        AddComponent,
        CarriersComponent,
        DocumentComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AdminGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ProfileService,
        InvoiceService,
        fileUploadService,
        validateUserService,
        TermsService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})

export class AppModule { 
    constructor(){
        LicenseManager.setLicenseKey("Evaluation_License_Valid_Until_9_May_2018__MTUyNTgyMDQwMDAwMA==40d1bf2e87e01cc773d9502f6f3a5c26");
    }
}