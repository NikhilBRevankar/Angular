import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    HttpClientModule
  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
