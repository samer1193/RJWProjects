import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import * as $ from 'jquery';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent { 
    public constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
    
        this.toastr.setRootViewContainerRef(viewContainerRef);
      }
}