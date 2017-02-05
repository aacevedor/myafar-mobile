import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Push , PushToken} from '@ionic/cloud-angular';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  token : any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public push: Push, public ctrlAlert: AlertController) {
    this.initializeApp();
    this.token = '';

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Afar', component: Page1 },
      { title: 'DSS', component: Page2 }
    ];

  }

    initializeApp() {
      this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
        this.initPushNotification();
        this.initAlert();

      });
    }

    initPushNotification(){
      if( !this.platform.is('cordova')){
          console.warn( "Para iniciar el plugin de notificaciones push, se debe emplear un dispositivo virtual o real" );
          return;
      }

      this.push.register()
      .then((t: PushToken) => {
        
        return this.push.saveToken(t);
      })
      .then((t: PushToken) => {
        this.token = t.token;
        console.log('Token saved:', t.token);
      });

      this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text); 
      });


    }

    openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);

    }

    initAlert() {
      let alert = this.ctrlAlert.create({
        title: '',
        subTitle: 'Token :'+ this.token,
        buttons: ['OK']
      });
      alert.present();
    }



}
