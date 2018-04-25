import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carriers',
  templateUrl: './carriers.component.html',
  styleUrls: ['./carriers.component.css']
})
export class CarriersComponent implements OnInit {
  public carriers = {};
  public search: string;

  constructor(
    private auth: AuthenticationService,
    private UserService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carriers = null;
  }
  typeahead(search) {
    // this.search = ''
    // this.search = this.search + search.data;
    // var string = (<HTMLInputElement>document.getElementById("RJWLoadNum")).value;
    console.log(search.target.value);
    this.UserService.typeahead(search.target.value)
    .subscribe(
      data => {
        this.carriers = data;
      }
    )
  }
}
