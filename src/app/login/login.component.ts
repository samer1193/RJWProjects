import { Component, OnInit, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService, TermsService } from '../_services/index';
import 'rxjs/Rx' ;

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
<<<<<<< HEAD
    loading = false;
=======
>>>>>>> CarrierPortalEdits
    grant_type = "password";
    returnUrl: string;
    public visible = false;
    private terms: boolean;
    pdfSrc: string;
<<<<<<< HEAD
=======
    public loading: boolean;
>>>>>>> CarrierPortalEdits

  public visibleAnimate = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private termsService: TermsService
        ) { }

    ngOnInit() {
<<<<<<< HEAD
=======
        this.loading = false;
>>>>>>> CarrierPortalEdits
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = '/dashboard/profile'
        
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.grant_type, this.model.username, this.model.password)
            .subscribe(
                data => {
                    if (sessionStorage.getItem('acceptedTermsConditions') == 'False'){
                        // this.getTC();
                        document.getElementById("openModalButton").click();
<<<<<<< HEAD
                    }else {
                    this.router.navigate([this.returnUrl]);
=======
                        this.loading = false;
                    }else {
                    this.router.navigate([this.returnUrl]);
                    this.loading = false;
>>>>>>> CarrierPortalEdits
                    }
                    // this.router.navigate([this.returnUrl]);
                },
                error => {
<<<<<<< HEAD
=======
                    console.log(error);
>>>>>>> CarrierPortalEdits
                    this.alertService.error('Username or password is incorrect');
                    this.loading = false;
                });
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
      accept(){
          this.termsService.acceptTerms()
          .subscribe(
              data => {
                this.router.navigate([this.returnUrl]);
              }, error => {
                  console.log(error.error.message);
              }
          )
      }
}