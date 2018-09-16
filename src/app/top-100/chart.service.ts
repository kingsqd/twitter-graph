import { Injectable } from '@angular/core';
import { Songs } from './songs';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private chartsURL = 'api/top-100';
  constructor(private http: Http) { }

  getTop100(): Promise<void | Songs[]> {
    return this.http.get(this.chartsURL)
                .toPromise()
                .then(response => response.json() as Songs[])
                .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
  
}
