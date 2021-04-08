import { Component} from '@angular/core';
import { TimeService } from './shared/time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private timeService: TimeService){

  }
  toggle(){
    this.timeService.isTimeFromServer = !this.timeService.isTimeFromServer;      //toggle the clock to use between local and server time
  }
}
