import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DataService } from "src/app/services/data.service";
import { Observable, of, reduce } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActionPerformed, PushNotifications, PushNotificationSchema, Token } from '@capacitor/push-notifications';
import { LocalNotifications, Schedule, ScheduleOptions } from '@capacitor/local-notifications';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  currentDate: Date = new Date();



  //Temp Humid
  latestData$: Observable<any>;
  temperature$: Observable<number>;
  humidity$: Observable<number>;



  //total bags batch
  bagsrecord = [];
  totalQuantity: number = 0;

  //total harvest
  // harvestrecord = [];
  totalGrams: number = 0;

  // totalGramsSum: number = 0;

  constructor(private dataService: DataService, private db: AngularFireDatabase, private fdb: AngularFirestore) {


    //totalbagsbatch
    this.dataService.getBatchBags().subscribe(res => {
      this.bagsrecord = res;

      //calculate
      this.totalQuantity = this.bagsrecord.reduce((sum, bag) => sum + bag.batch_total_bags, 0);
      console.log('Total Bags:', this.totalQuantity);
    });



    //total harvest
    // this.dataService.getTotalharvest().subscribe(res => {
    //   console.log('Harvest Records:', res);
    //   this.harvestrecord = res;

    //   //calculate
    //   this.totalGrams = this.harvestrecord.reduce((sum, bag) => sum + bag.grams, 0);
    //   console.log('Total Grams:', this.totalGrams);
    // });


    // //harvest per batch totalList
    // this.dataService.getBatchHarvestForAll().subscribe(data => {
    //   console.log('Final Emitted Data:', data);
    // });

    // this.dataService.allHarvestedGrams()


    //Temp and Humid Path
    const path = '/BETAPEAK'

    // Retrieve data from Temp and Humid
    this.latestData$ = this.db.list(path, ref => ref.limitToLast(1).orderByKey()).valueChanges()

    //Temp and Humid
    this.latestData$.subscribe(entries => {
      if (entries && entries.length > 0) {
        const data = entries[0];

        const keys = Object.keys(data);
        const lastKey = keys[keys.length - 1];
        const lastEntry = data[lastKey];
        // console.log(lastKey)
        // console.log('Last Key:', lastKey);
        console.log('Temp:', lastEntry.Temp);
        console.log('Humid:', lastEntry.Humd);
        this.temperature$ = of(lastEntry.Temp);
        this.humidity$ = of(lastEntry.Humd);



        this.scheduleNotification(lastEntry.Temp, lastEntry.Humd);

      }
    }
    );
  }


  //temp Notification
  async scheduleNotification(tempValue: number, humdValue: number) {

    let temp: number = tempValue;
    let humd: number = humdValue;
    let alertTitleTemp: string = '';
    let alertTitleHumd: string = '';
    let alertTitle: string = '';
    let alertMessagetemp: string = '';
    let alertMessagehumid: string = '';
    let alertMessage = '';
    if (24 >= tempValue) {
      alertTitleTemp = 'Low Temperature'
      alertMessagetemp = 'Low temperature alert: The temperature has dropped to ' + temp + '°C, which is below the recommended threshold.'
    } else if (29 <= tempValue) {
      alertTitleTemp = 'High Temperature'
      alertMessagetemp = 'High temperature alert: The temperature has reached ' + temp + '°C, which is above the recommended threshold.'
    }
    if (85 >= humdValue) {
      alertTitleHumd = 'Low Humidity'
      alertMessagehumid = 'Low humidity alert: The humidity level has dropped to ' + humd + '%, which is below the recommended threshold.'
    } else if (95 <= humdValue) {
      alertTitleHumd = 'High Humidity'
      alertMessagehumid = 'High humidity alert: The humidity level has reached ' + humd + '%, which is above the recommended threshold.'
    }

    if (alertMessagetemp && alertMessagehumid) {
      alertMessage = `${alertMessagetemp} & ${alertMessagehumid}`;

    } else if (alertMessagetemp) {
      alertMessage = alertMessagetemp;
    } else if (alertMessagehumid) {
      alertMessage = alertMessagehumid;
    }
    if (alertTitleTemp && alertTitleHumd) {
      alertTitle = `${alertTitleTemp} & ${alertTitleHumd}`;

    } else if (alertTitleTemp) {
      alertTitle = alertTitleTemp;
    } else if (alertTitleHumd) {
      alertTitle = alertTitleHumd;
    }


    let options: ScheduleOptions = {
      notifications: [
        {
          id: 111,
          title: alertTitle,
          body: alertMessage
        }
      ]

    }
    console.log(options)

    try {
      await LocalNotifications.schedule(options);
      console.log("Notification scheduled successfully! Temp");
    }
    catch (ex) {
      alert(JSON.stringify(ex));
      console.error("Error scheduling notification:", JSON.stringify(ex));
    }
  }

  //humid notification
  async scheduleNotification2() {
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 112,
          title: "High Humidity",
          body: "Attention! Basa na kaayo goys",
          largeBody: "Hoy Basa na kaayo gago ang mushroom",
          summaryText: "Test"
        }
      ]
    }

    try {
      await LocalNotifications.schedule(options);
      console.log("Notification scheduled successfully! Humid");
    }
    catch (ex) {
      alert(JSON.stringify(ex));
      console.error("Error scheduling notification:", JSON.stringify(ex));
    }
  }



  ngOnInit() {
    this.fetchData();

  }

  async fetchData() {
    try {
      this.totalGrams = await this.dataService.allHarvestedGrams();
      console.log('Total Grams:', this.totalGrams);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}