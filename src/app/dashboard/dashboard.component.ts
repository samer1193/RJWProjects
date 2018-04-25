import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Carriers, carrier } from '../dashboard/dashboard.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  returnUrl: string = '/login';
  isAdmin: boolean = false;
  role: string;
  public Carriers: Carriers = new Carriers();
  public carriers: carrier[];
  public filteredCarrier: any[];
  public selectedCarrier: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService
  ) { }
   

  ngOnInit() {
    this.userService.carriersFromServer()
    .subscribe(
      (data: Carriers)  => {
        this.Carriers = data;
        this.carriers = this.Carriers.carriers as any;
        this.filteredCarrier =  this.carriers.filter(item => item.id == sessionStorage.getItem('selectedCarrierId'))
        this.selectedCarrier = this.filteredCarrier[0].name
      }, error => {
        console.log(error);
      }
    )
    let role = sessionStorage.getItem('roles');
    if(this.authenticationService.admin == true){
      this.isAdmin = true;
    }
  }
  get user(): any{
    return sessionStorage.getItem('currentUser');
  }
  logout() {
    this.authenticationService.logout();
  }
  changeSelected(cars2){
    console.log(cars2)
    var settings = cars2.id;
    // console.log(settings);
    console.log(this.router);
    this.userService.changeSelected(settings)
    .subscribe(
      data => {
        sessionStorage.setItem('selectedCarrierId', settings)
        var route = this.router.url
        this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
        this.router.navigateByUrl(route));
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }
}
