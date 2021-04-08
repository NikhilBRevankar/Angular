import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnaClockComponent } from './AnaClock/anaClock.component';
import { DigiClockComponent } from './DigiClock/digiClock.component';
import { TimeService } from './shared/time.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AnaClockComponent,
    DigiClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
