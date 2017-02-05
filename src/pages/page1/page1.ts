import { Component } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  constructor(public navCtrl: NavController, public ctrlAlert: AlertController ) {
    
  }

	 presentAlert() {
	  let alert = this.ctrlAlert.create({
	    title: 'Low battery',
	    subTitle: '10% of battery remaining',
	    buttons: ['Dismiss']
	  });
	  alert.present();
	}

}
