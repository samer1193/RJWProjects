import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, validateUserService } from '../_services/index';
import { UserSetup } from '../user-setup/user-setup.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit {
  public routeToken: string;
  public routeUser: string;
  public errorMsg: string;
  public errorMsgConfirm: string;
  public user: UserSetup;
  returnUrl: string;

  constructor(
    private userService: validateUserService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.params.subscribe(params => {
      this.routeToken = params['token'];
      this.routeUser = params['user'];
    });
  }

  ngOnInit() {
    this.validate();
    this.returnUrl = '/login'
  }

  validate(){
    this.errorMsgConfirm = '';
    this.userService.confirmEmail(this.routeToken,this.routeUser)
    .subscribe(
      data => {
        this.user = data as any;
        console.log(this.user);
      }, error => {
        this.errorMsgConfirm = error.error.message;
        console.log(this.errorMsgConfirm)
      }
    )
  }
  save(){
    this.errorMsg = '';
    this.userService.register(this.user)
    .subscribe(
      data =>{
        this.router.navigate([this.returnUrl]);
        console.log('success');
      }, error => {
        this.errorMsg = error.error.message;
      }
    )
  }
}

