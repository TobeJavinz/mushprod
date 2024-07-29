import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ModalPage } from '../modal/modal.page';
import { orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications = [];

  constructor( private dataService: DataService, private modalCtrl: ModalController) { 
    
    this.dataService.getNotif1().subscribe(res => {
      console.log('Notifications:', res); 
      this.notifications = res;
      this.notifications = res.sort((a: any, b: any) => b.date.valueOf() - a.date).slice(0,10);
    });
  }
   

  async openNotif(notifications){
    const modal = await this.modalCtrl.create({
      component: ModalPage, 
      componentProps: {id: notifications.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
     modal.present ();
  }
  ngOnInit() {
  }

}
