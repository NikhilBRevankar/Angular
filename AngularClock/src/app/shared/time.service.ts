import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http'

@Injectable()
export class TimeService{
    minutesChange: number = 0;                            //singleton variable to hold change in minutes from actual-time
    anaSyncClicked: boolean = false;                      //flag to check if Sync button pressed in Analog clock
    digiSyncClicked: boolean = false;                     //flag to check if Sync button pressed in Digital clock
    isTimeFromServer: boolean = false;                    //flag to check if time has to be fetched from server
    constructor(private http: HttpClient){

    }

    getTime(): Observable<any>{                           //to fetch time from an endpoint
        return this.http.get<any>('http://worldclockapi.com/api/json/utc/now');  
    }

}