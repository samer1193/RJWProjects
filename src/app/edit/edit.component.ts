import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';
import { User,Carriers } from '../edit/edit.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public user: User;
  public test;
  private returnUrl: string;
  public error: string;
  public carriers: Carriers = new Carriers();
  public search: string;
  public _selected: string;
  public selectedCarriers: any = [];
  constructor(
    private auth: AuthenticationService,
    private UserService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastsManager
  ) { 
  }

  ngOnInit() {
    this.carriers = null;
    this.UserService.userEdit()
    .subscribe(
      (data: User) => {
        this.user = data;
        this.selectedCarriers = this.user.carriers;
      },
      error => {
        console.log(error);
      }
    )
  }
  showSuccess(msg) {
    this.toastr.success(msg, 'Success!', {dismiss: 'click'});
  }
  showError(msg){
    this.toastr.error(msg,'Error!', {dismiss: 'click'})
  }
  add(car){
    if (this.selectedCarriers.filter(item => item.id == car.id).length == 1){
    this.showError('Carrier is already assigned to this user.')
    } else {
    this.selectedCarriers.push(car);
    }
  }
  remove(car){
    this.selectedCarriers = this.selectedCarriers.filter(item => item !== car)
    this.user.carriers = this.selectedCarriers;
    console.log(this.selectedCarriers);

  }
  typeahead(search) {
    this.UserService.typeahead(search.target.value)
    .subscribe(
      (data: Carriers)=> {
        this.carriers = data;
      }
    )
  }
  timeOut(){
    setTimeout(function(){this.save()},1000)
  }
  save(){
    this.returnUrl = '/dashboard/admin/'
    this.error = null;
    if(!this.user.isAdmin && this.selectedCarriers.length === 0){
      this.error = "A regular user must belong to at least one carrier.";
      this.showError(this.error)
      return;
    }
    // this.user.siteRoleId = this.user.siteRole.id;
    this.UserService.update(this.user)
    .subscribe(
      data => {
      this.router.navigate([this.returnUrl]).then(() => {
        this.toastr.success('User Successfully Saved!', 'Success!', {dismiss: 'click', toastLife: 2000, animate: 'flyLeft'});
      })
      }, error => {
        this.showError(error)
      }
    )
  }
}
