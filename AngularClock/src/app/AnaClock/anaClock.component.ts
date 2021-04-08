import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TimeService } from '../shared/time.service';

@Component({
  selector: 'anaClock',
  templateUrl: './anaClock.component.html',
  styleUrls: ['./anaClock.component.css']
})
export class AnaClockComponent implements OnInit {
  date: any;                                                          //dateTime to be displayed on screen
  minutesChange: number = 0;                                          //change in minutes from actual time
  @ViewChild('hrHand', {static: false}) hrHand?: ElementRef;          //reference to hour hand element
  @ViewChild('minHand', {static: false}) minHand?: ElementRef;        //reference to minute hand element
  @ViewChild('secHand', {static: false}) secHand?: ElementRef;        //reference to seconds hand element

  constructor(private timeService: TimeService){

  }

  ngOnInit() {
    setInterval(() => {                                                //update view every second
      this.getTime();
    }, 1000)
  }

  updateTime(value: number){                                            //update time with increament/decreament
    this.minutesChange += value;
    this.getTime();
  }

  getTime(){                                                            //fetch the time to display from either end point or local.
    if(this.timeService.isTimeFromServer){
      this.timeService.getTime().subscribe((response: any) => {
        let actualDate = new Date(response.currentDateTime); 
        if(this.timeService.digiSyncClicked){
          this.minutesChange = this.timeService.minutesChange;
          this.timeService.digiSyncClicked = false;
        }
        actualDate.setMinutes(actualDate.getMinutes() + this.minutesChange);
        this.date = new Date(actualDate);
      });
    }
    else {
      let actualDate = new Date(); 
      if(this.timeService.digiSyncClicked){
        this.minutesChange = this.timeService.minutesChange;
        this.timeService.digiSyncClicked = false;
      }
      actualDate.setMinutes(actualDate.getMinutes() + this.minutesChange);
      this.date = new Date(actualDate);
    }
    this.updateClock(this.date);
  }

  refreshTime(){                                                            //reset time to actual time
    this.minutesChange = 0;
    this.getTime();    
  }
  syncTime(){                                                               //sync digital clock with this clock
    this.timeService.minutesChange = this.minutesChange;
    this.timeService.anaSyncClicked = true;
  }

  updateClock(date: Date){                                                  //update the position of all the hands
    if(this.secHand){                                                       //of the clock according to time.
      if(this.timeService.isTimeFromServer)
        this.secHand.nativeElement.style.display = "none";
      else{
        this.secHand.nativeElement.style.display = "block";
        this.secHand.nativeElement.style.transform = 'rotate(' + date.getSeconds() * 6 + 'deg';
      }
    }          
    if(this.minHand)
      this.minHand.nativeElement.style.transform = 'rotate(' + date.getMinutes() * 6 + 'deg';   
    if(this.hrHand)
    this.hrHand.nativeElement.style.transform = 'rotate(' + (date.getHours() * 30 + date.getMinutes() * 0.5) + 'deg';          
  }
}
