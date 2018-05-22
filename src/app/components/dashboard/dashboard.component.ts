import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ct-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public response: Array<any> = [];
  constructor() { 
    this.response.push(
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
      { matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute', last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy'] },
    );
  }

  ngOnInit() {
  }

}
