import { Component, OnInit } from '@angular/core';
import {LogService} from '../../services/log.service';
import {Log} from '../../models/Log';


@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  id!: string;
  text!: string;
  date: any;
  isNew: boolean = true;
  
  constructor(private logService: LogService) { }

  ngOnInit() {
    // subscribe to log observable
    this.logService.selectedLog.subscribe(log => {
      // console.log(log);

      if(log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  };

  onSubmit() {
    // console.log(123)
    if(this.isNew) {
      // create new log
      const newLog ={
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }

      // add log
      this.logService.addLog(newLog);

    } else {
      // log to be updated
      const logToUpdate = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      // update log
      this.logService.updateLog(logToUpdate);
    }

    // clear state
    this.clearForm();

  }

  clearForm() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';

    // communicate to log component
    this.logService.clearForm();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
  }

}
