import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss']
})
export class ChangePassPage implements OnInit {

  constructor(private router: Router) { }
  
  async back() {
    await this.router.navigate(['/home/account'], {
      state: {
        direction: 'back'
      },
      queryParams: {},
      queryParamsHandling: 'merge',
      preserveFragment: true,
      skipLocationChange: false,
      replaceUrl: false,
    });
  }

  ngOnInit() {
  }
}
