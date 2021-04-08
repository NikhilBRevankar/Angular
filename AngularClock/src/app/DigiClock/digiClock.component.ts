import { Component, OnInit} from '@angular/core';
import { TimeService } from '../shared/time.service';

@Component({
  selector: 'digiClock',
  templateUrl: './digiClock.component.html',
  styleUrls: ['./digiClock.component.css']
})
export class DigiClockComponent implements OnInit {
  date: any;                                                    //dateTime to be displayed on screen
  minutesChange: number = 0;                                    //change in minutes from actual time
  dateFormat: string = "HH:mm";                                 //format of digital dateTime for local: HH:mm:ss, server: HH:mm

  constructor(private timeService: TimeService){
    
  }

  ngOnInit() {
    setInterval(() => {                                           //update view every second
      this.getTime();
    }, 1000)
  }

  updateTime(value: number){                                      //update time with increament/decreament
    this.minutesChange += value;
    this.getTime();
  }

  refreshTime(){                                                  //reset time to actual time
    this.minutesChange = 0;
    this.getTime();    
  }

  syncTime(){                                                      //sync analog clock with this clock
    this.timeService.minutesChange = this.minutesChange;
    this.timeService.digiSyncClicked = true;
  }

  getTime(){                                                        //fetch the time to display from either end point or local.
    if(this.timeService.isTimeFromServer){
      this.timeService.getTime().subscribe((response: any) => {
        let actualDate = new Date(response.currentDateTime); 
        if(this.timeService.anaSyncClicked){
          this.minutesChange = this.timeService.minutesChange;
          this.timeService.anaSyncClicked = false;
        }
        actualDate.setMinutes(actualDate.getMinutes() + this.minutesChange);
        this.date = new Date(actualDate);
        this.dateFormat = "HH:mm";
      });
    }
    else {
      let actualDate = new Date(); 
      if(this.timeService.anaSyncClicked){
        this.minutesChange = this.timeService.minutesChange;
        this.timeService.anaSyncClicked = false;
      }
      actualDate.setMinutes(actualDate.getMinutes() + this.minutesChange);
      this.date = new Date(actualDate);      
      this.dateFormat = "HH:mm:ss";
    }
  } 
}
