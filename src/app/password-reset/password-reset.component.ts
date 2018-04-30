import { Component,EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService, validateUserService } from '../_services/index';
import { SecurityQuestions } from '../password-reset/password-reset.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  public step: number;
  public model: any = {};
  public securityQ: SecurityQuestions;
  public errorMsg: string;
  routeToken: string;
  routeUser: string;
  routeStep: number;
  constructor(
    private userService: validateUserService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.params.subscribe(params => {
      this.routeToken = params['token'];
      this.routeUser = params['user'];
      this.routeStep = +params['step'];
    });
  }

  ngOnInit() {
    if (this.routeStep == 4){
      this.step = 4;
      this.confirmPasswordEmail();
    } else{
    this.step = 1;
    }
  }
  validateUser(){
    this.errorMsg = ''; 
    console.log(this.model.userName)
    this.userService.verifyUsername(this.model.userName)
            .subscribe(
                data => {
                  this.securityQ = data as any; 
                  this.step =2; 
                },
                error => {
                  this.errorMsg = error.error.message
                    console.log(this.errorMsg);
                });
  }
  verifySecurityQuest(){
    this.errorMsg = '';
    this.securityQ.answer1 = this.model.answer1;
    this.securityQ.answer2 = this.model.answer2;
    this.securityQ.answer3 = this.model.answer3;
    this.userService.verifySecurityQuestions(this.securityQ)
            .subscribe(
                data => {
                  this.step = 3; 
                },
                error => {
                  this.errorMsg = error.error.message
                });
  }
  confirmPasswordEmail(){
    this.errorMsg = '';
    this.step = 4;
    this.userService.confirmPasswordEmail(this.routeUser,this.routeToken)
      .subscribe(
        data=> {
          this.securityQ = data as any;
        }, error => {
          this.errorMsg = error.error.message
        });
    }
    resetPassword(){
      this.errorMsg = '';
      if (this.securityQ.password == this.securityQ.confirmPassword){
        this.userService.resetPassword(this.securityQ)
      .subscribe(
      data => {
        this.step = 5
      }, error => {
        
        this.errorMsg = error.error.message
      }
      )}  
       else {
        this.errorMsg = 'Passwords must be the same!';
      }};
  }
