import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import { SignupService } from 'src/app/services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private login: LoginService, private signup: SignupService, private _router: Router) { }


  username: string;
  password: string;
  user: any;
  session: string;

  title = 'SuperSlice';
  loginmodal:string;
  registermodal:string;

  roleId: any;

  // For Employee
  employeeloginmodal:string;

  showEmployeeLogin(){
    this.employeeloginmodal = 'shown';
  }
  hideEmployeeLogin(){
    this.employeeloginmodal = 'notshown';
  }

  ngOnInit(){
    this.employeeloginmodal = 'notshown'
    this.loginmodal = 'notshown'
    this.registermodal = 'notshown'
  }
  showRegister() {
    this.registermodal = 'shown';

  }
  hideRegister() {
    this.registermodal = 'notshown';
  }

  showLogin() {
    this.loginmodal = 'shown';

  }
  hideLogin() {
    this.loginmodal = 'notshown';
  }

  async loginUser(): Promise<any> {
    this.session = null;
    this.user = await this.login.loginserv(this.username, this.password);
    if (this.user != null && this.user.userRole.roleId == 2) {
      localStorage.setItem('user_key', this.username);
      this.session = localStorage.getItem('user_key');
    }
  }

  async EmployeeloginUser(): Promise<any> {
    this.session = null;
    this.user = await this.login.loginserv(this.username, this.password);
    if (this.user != null && this.user.userRole.roleId == 1) {
      localStorage.setItem('user_key', this.username);
      this.session = localStorage.getItem('user_key');
    
    }

   

  }

  async SignUpUser(): Promise<any>{
    this.session = null;
    this.user = await this.signup.SignUpUserserv(this.username, this.password);
    console.log(this.user);
    if (this.user != null) {
      localStorage.setItem('user_key', this.username);
      this.session = localStorage.getItem('user_key');
    }
  }

  goToEmployee():void {
    this._router.navigate(['/employee']);
  }

}
