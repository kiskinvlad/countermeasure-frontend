import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  static dateForReports() {
    const month_names = ['Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'];
    const current_date = new Date();
    const day = current_date.getDate();
    const month_index = current_date.getMonth();
    const year = current_date.getFullYear();

    return month_names[month_index] + ' ' + day + ', ' + year;
   }

   static currencyForLocale(value) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
   }
}
