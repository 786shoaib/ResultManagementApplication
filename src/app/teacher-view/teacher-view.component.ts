import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from './teacher-view.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { retry } from 'rxjs';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj: UserModel = new UserModel();
  studentData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      rollno: [''],
      name: [''],
      dob: [''],
      score: ['']
    })
    this.getAllUser();
  }

  clickAddEmployee() {
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserDetails() {
    this.userModelObj.rollno = this.formValue.value.rollno;
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.dob = this.formValue.value.dob;
    this.userModelObj.score = this.formValue.value.score;
    if (this.checkduplicate(this.formValue.value.rollno)) {
      alert("Roll Number already exists!")
      this.formValue.reset();
      this.router.navigate(['teacherView'])
    }
    else {
      this.api.postUser(this.userModelObj)
        .subscribe(res => {
          console.log(res);
          alert("Student Added Successfully!!")
          let ref = document.getElementById('cancel')
          ref?.click();
          this.formValue.reset();
          this.getAllUser();
        },
          err => {
            alert("Something wrong!!")
          })
    }

  }
  getAllUser() {
    this.api.getUser()
      .subscribe(res => {
        this.studentData = res;
      })
  }
  deleteUser(row: any) {
    this.api.deleteUser(row.id)
      .subscribe(res => {
        alert("User Deleted:" + row.name);
        this.getAllUser();
      })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['rollno'].setValue(row.rollno);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['score'].setValue(row.score);
  }
  updateUserDetails() {
    this.userModelObj.rollno = this.formValue.value.rollno;
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.dob = this.formValue.value.dob;
    this.userModelObj.score = this.formValue.value.score;
  
    this.api.updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe(res => {
        alert("Updated Successfully!")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })

  }

  getRecordCount() {
    return this.studentData.length;
  }

  checkduplicate(rollno: number) {
    for (var i = 0; i < this.studentData.length; i++) {
      var obj = this.studentData[i];
      if (obj.rollno === rollno) {
        return true;
      }
    }
    return false;
  }

  logout() {
    this.router.navigate(['/loginteacher']);
    localStorage.clear();
  }
}
