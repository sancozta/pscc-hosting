import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NotificationComponent } from './dashboard/notification/notification.component';
import { ContactsComponent } from './dashboard/contacts/contacts.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ReportComponent } from './dashboard/report/report.component';
import { UsersComponent } from './dashboard/users/users.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { ProductComponent } from './dashboard/product/product.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: '',
        redirectTo: 'report',
        pathMatch: 'full',
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AdminRoutingModule { }
