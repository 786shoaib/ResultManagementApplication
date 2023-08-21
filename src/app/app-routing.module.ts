import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './shared/auth.guard';
import { StudentResultComponent } from './student-result/student-result.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherViewComponent } from './teacher-view/teacher-view.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginPageComponent},
  {path:'teacherView',canActivate:[AuthGuard],component:TeacherViewComponent},
  {path:'studentView',component:StudentViewComponent},
  {path:'studentResult',component:StudentResultComponent},
  {path:'loginteacher',component:TeacherLoginComponent}    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TeacherViewComponent]
