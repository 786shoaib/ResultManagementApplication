import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css']
})
  export class StudentResultComponent implements OnInit {
  
  resultData !:any
  constructor(private apiService :ApiService) { }

  ngOnInit(): void {
    this.apiService.on<any>().subscribe(
      data=>{
        this.resultData=data;
      }
    )
  }

}
