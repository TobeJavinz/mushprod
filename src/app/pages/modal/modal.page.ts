import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService, Notif } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id: string;
  notifications: Notif = null;

  constructor(private dataService: DataService, private modalCtrl: ModalController) {
    
    // this.dataService.getNotif().subscribe(res => {
    //   console.log(res); 
    //   this.notifications = res;
    // });
  }
   

  

  ngOnInit() {
    this.dataService.getNotifById(this.id).subscribe(res => {
      this.notifications = res;
      console.log(res)
    });
  }

}
