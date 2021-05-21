import { Component, OnInit } from '@angular/core';
import {Log} from '../../models/Log';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[] = [];

  // for clear form
  selectedLog!: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit() {

    // subscribe to observable in service clearForm, that comes from log-forms.ts 
    this.logService.formClear.subscribe(clear => {
      if(clear) {
        this.selectedLog = {
          id: '',
          text: '',
          date: ''
        };
      }
    });

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  onSelect(l: Log) {
    // console.log(l);
    this.logService.setFormLog(l);
    this.selectedLog = l;
  }

  onDelete(l: Log) {
    // console.log(l)
    if(confirm("Confirm deletiong")) {
      this.logService.deleteLog(l);
    }
  }

}
