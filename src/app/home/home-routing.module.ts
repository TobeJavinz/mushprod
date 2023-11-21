import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ]
      },

      {
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/notification/notification.module').then(m => m.NotificationPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/account/account.module').then(m => m.AccountPageModule)
          },
        ]
      }, {
        path:'',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }




    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
