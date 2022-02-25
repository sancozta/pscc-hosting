import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationComponent } from './admin/notification/notification.component';
import { CategoryComponent } from './admin/category/category.component';
import { ContactsComponent } from './admin/contacts/contacts.component';
import { ProductComponent } from './admin/product/product.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ReportComponent } from './admin/report/report.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { NotfoundComponent } from './admin/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'channels',
    component: ChannelsComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'admin',
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
        redirectTo: '/login',
        pathMatch: 'full',
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
