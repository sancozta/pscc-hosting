import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing.module';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './public/pages/notfound/notfound.component';

import { FirebaseService } from './admin/shared/services/firebase.service';
import { UtilsService } from './admin/shared/services/utils.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    PublicModule,
    AdminModule,
  ],
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  providers: [
    FirebaseService,
    UtilsService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
