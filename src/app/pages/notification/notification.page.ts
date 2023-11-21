import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications = [];

  constructor( private dataService: DataService, private modalCtrl: ModalController) { 
    
    this.dataService.getNotif().subscribe(res => {
      console.log('Notifications:', res); 
      this.notifications = res;
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
