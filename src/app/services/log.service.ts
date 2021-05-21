import { Injectable, ɵsetCurrentInjector } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  // Behavior subject of type Log, takes initial value of Log interface
  private logSource = new BehaviorSubject<Log>({
    id: null, text: null, date: null
  });

  selectedLog = this.logSource.asObservable();

  // to clear form
  private stateSource = new BehaviorSubject<boolean>(true);
  formClear = this.stateSource.asObservable();

  constructor() { 
    // this.logs = [
    //   {id: '1', text: "Task One", date: new Date('1/1/2017')},
    //   {id: '2', text: "Task Two", date: new Date('1/2/2017')},
    //   {id: '3', text: "Task Three", date: new Date('1/3/2017')},
    // ]
    this.logs = []
  };

  getLogs(): Observable<Log[]> {
    // getting logs from local storage
    // checking if there is something first
    if(localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    // sort by date
      return of(this.logs.sort((a, b) => {
        return b.date = a.date;
      }));
  };

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // adding this.logs to local storage
    //By default storing only strings
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    // delete old one
    this.logs.forEach((current, index) => {
      if(log.id === current.id) {
        // adding new element whire removing old slice()
        this.logs.splice(index, 1);
      }
    });
    // add to top
    this.logs.unshift(log);

    // persist update to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));

  }

  deleteLog(log: Log) {
    this.logs.forEach((current, index) => {
      if(log.id === current.id) {
        this.logs.splice(index, 1);
      }
    });

    // delete from local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));

  }

  // to clear from
  // what we want to pass to another component
  // for component communication child-child
  clearForm() {
    this.stateSource.next(true);
  }
}
