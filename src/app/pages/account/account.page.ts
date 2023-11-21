import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { DataService } from "src/app/services/data.service";


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  // //Temp Humid
  // latestData$: Observable<any>;
  // farm_name$: Observable<string>;
  // farmer_name$: Observable<string>;
 
  constructor(public route: Router, public authService: AuthenticationService, private fdb: AngularFirestore ) { 
    // const path = '/user/123456/'

    
    // this.latestData$ = this.fdb.collection(path, ref => ref.orderBy('device_code', 'desc').limit(1)).valueChanges();

    // this.latestData$.subscribe(entries => {
    //   if (entries && entries.length > 0) {
    //     const data = entries[0];

    //     const keys = Object.keys(data);
    //     const lastKey = keys[keys.length - 1];
    //     const lastEntry = data[lastKey];
    //     console.log(lastKey)
    //     console.log('Last Key:', lastKey);
    //     console.log('farm_name:', lastEntry.farm_name);
    //     console.log('farmer_name:', lastEntry.farmer_name);
    //     this.farm_name$ = of(lastEntry.farm_name);
    //     this.farmer_name$ = of(lastEntry.farmer_name);
    //   }
    // }
    // );
  }

    
  async logout() {
    this.authService.SignOut().then(() => {
      this.route.navigate(['/login']);
    });
  } 

  async editprofile() {
    this.route.navigate(['/edit-profile']);
  }

  async changepass() {
    await this.route.navigate(['/change-pass'], {
      state: {
        direction: 'back'
      }
    });
  }

  async help() {
    this.route.navigate(['/help-page']);
  }

  ngOnInit() {
 
  }
}
