import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProfileService, UserService } from '../_services/index';
import { Http, Headers, Response } from '@angular/http';
import { AppConfig } from '../app.config';
import { Observable } from 'rxjs/Observable';
import { Profile, Password } from '../profile/profile.model';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile: Profile;
  model: any = {};
  CarrierId: string;
  public password: Password = new Password()
  private loading: boolean;
  constructor(
    private route: ActivatedRoute,
    private http:Http,
    private profileService: ProfileService,
    private userService: UserService,
    private config: AppConfig,
    private toastr: ToastsManager
  ) {
   }
  ngOnInit() {
    this.loading = false;
    this.password.confirmPassword = '';
    this.password.currentPassword = '';
    this.password.password = '';
  this.profileService.getProfile(sessionStorage.getItem('selectedCarrierId'))
    .subscribe(
      results => {this.profile = results
      this.profile.carrierID = sessionStorage.getItem('currentUser') as any
      this.loading = true;
      }
    )    
  }
  showSuccess(msg) {
    this.toastr.success(msg, 'Success!', {dismiss: 'click', toastLife: 3000});
  }
  showError(msg){
    this.toastr.error(msg,'Error!', {dismiss: 'click',  toastLife: 3000})
  }
  changePassword(){
    this.userService.changePassword(this.password.password, this.password.currentPassword, this.password.confirmPassword)
    .subscribe(
      results => {
        this.showSuccess('Password successfully changed!')
      }, error => {
        this.showError(error.error.message)
      }
    )
  }
}
