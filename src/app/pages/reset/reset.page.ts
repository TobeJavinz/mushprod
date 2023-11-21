import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  email: any

  constructor(public route: Router, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  async resetPassword() {
    this.authService.resetPassword(this.email).then(() => {
      console.log('Reset link sent');
      this.route.navigate(['/login']);
    }).catch((error) => {
      console.error(error); // Use console.error to log errors
    });
  }
}
