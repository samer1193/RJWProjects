import { Component, OnInit } from '@angular/core';
import { User, Carriers, SiteRole } from '../add/add.model';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public model: User = new User();
  public roles: any;
  public carriers: Carriers = new Carriers();
  public search: string;
  public _selected: string;
  public selectedCarriers: any = [] ;

  constructor
  (private UserService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager) 
  { }

  ngOnInit() {
    this.carriers = null;
    this.model.firstName = '';
    this.model.lastName = '';
    this.model.contactAddress = '';
    this.model.phoneNumber = '';
    this.model.isAdmin = false;
    this.UserService.roles()
    .subscribe(
      (data: SiteRole) => {
        this.roles = data
        this.model.siteRole = this.roles;
        this.model.siteRoleId = 1;
      }, error => {
        console.log(error)
      }
    )
  }
  showSuccess(msg) {
    this.toastr.success(msg, 'Success!', {dismiss: 'click', toastLife: 2000});
  }
  showError(msg){
    this.toastr.error(msg,'Error!', {dismiss: 'click',  toastLife: 2000})
  }
  typeahead(search) {
    this.UserService.typeahead(search.target.value)
    .subscribe(
      (data: Carriers)=> {
        this.carriers = data;
      }
    )
  }
  add(car){
    if (this.selectedCarriers.filter(item => item == car).length == 1){
      this.showError('Carrier already exists for this user.')
    } else {
    this.selectedCarriers.push(car);
    }
    console.log(this.selectedCarriers)
  }
  remove(car){
    this.selectedCarriers = this.selectedCarriers.filter(item => item !== car)
    console.log(this.selectedCarriers);

  }
  save(){
    this.model.carriers = this.selectedCarriers
    if (this.selectedCarriers.length > 0){
    this.UserService.add(this.model)
    .subscribe(
      data => {
        this.showSuccess('User successfully added!')
      }, error => {
        this.showError(error.error.message)
      }
    )
  } else {
    this.showError('A user must have at least one carrier assigned to them.')  
  }
    console.log(this.model)
  }
}
