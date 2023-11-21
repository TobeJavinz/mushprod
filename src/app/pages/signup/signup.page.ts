import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

type UserCredentials = {
  email: string;
  password: string;
  displayName: string;
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    public router: Router
  ) { }


  ngOnInit() {
    this.regForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(".{8,}")]],
    });
  }




  get errorControl() {
    return this.regForm?.controls;
  }

  async signUP() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
  
    try {
      if (this.regForm?.valid) {
        const userCredentials: UserCredentials = {
          displayName: this.regForm.value.username,
          email: this.regForm.value.email,
          password: this.regForm.value.password,
        };
  
        const user = await this.authService.registerUser(userCredentials);
  
        if (user) {
          this.router.navigate(['/home']);
        } else {
          console.log('Provide correct values');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      loading.dismiss();
    }
  }
  
}
