import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/index';
import { DashboardComponent } from './dashboard/index';
import { ProfileComponent } from './profile/index';
import { InvoicesComponent } from './invoices/index';
import { ManageInvoicesComponent } from './manage-invoices/index';
import { PasswordResetComponent } from './password-reset/index';
import { UserSetupComponent } from './user-setup/index';
import { AdminComponent } from './admin/index';
import { EditComponent } from './edit/index';
import { AddComponent } from './add/index';
import { AuthGuard } from './_guards/index';
import { AdminGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'forgot-password', component: PasswordResetComponent },
    { path: 'forgot-password/:token/:user/:step', component: PasswordResetComponent },
    { path: 'user/setup/:token/:user', component: UserSetupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children:[
        {path: 'admin', component: AdminComponent, canActivate:[AdminGuard]},
        {path: 'admin/add', component: AddComponent},
        {path: 'admin/:id', component:EditComponent, canActivate:[AdminGuard]},
        {path: 'profile', component: ProfileComponent},
        {path: 'invoices', component: InvoicesComponent},
        {path: 'manage', component: ManageInvoicesComponent}
    ]},
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];


export const routing = RouterModule.forRoot(appRoutes);