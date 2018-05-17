import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentComponent implements OnInit {
  public params: any;
  public check: any;
  public missing: any;

    agInit(params: any): void {
        console.log(params.data.ciFlag);
        console.log(params.data.sdrFlag);
        this.params = params;
        if (params.data.ciFlag === 'Y' && params.data.sdrFlag === 'Y' ){
          this.check = true;
          this.missing = 'None'
        } else if (params.data.ciFlag === 'Y' && params.data.sdrFlag === 'N'){
          this.check = false;
          this.missing = 'Signed Delivery Receipt'
        } else if (params.data.ciFlag === 'N' && params.data.sdrFlag === 'Y') {
          this.check = false
          this.missing = 'Carrier Invoice'
        }
    }
  constructor() { }

  ngOnInit() {
  }

}