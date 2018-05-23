import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ct-dashboard-case',
  templateUrl: './dashboard-case.component.html',
  styleUrls: ['./dashboard-case.component.scss']
})
export class DashboardCaseComponent implements OnInit {

  public response: Array<any> = [];
  constructor() {
    this.response.push(
      {
        matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute',
        last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy']
      },
      {
         matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute',
          last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy']
      },
      {
         matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute',
         last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy']
      },
      {
        matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute',
        last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy']
       },
      {
         matter_id: '45182', name: 'Mikes Shipping Inc - T2 Dispute',
          last_updated: 'Tue, April 24 4:30PM by Rachel Beck', actions: ['View', 'Edit', 'Copy']
      },
    );
  }

  ngOnInit() {
  }

}
