import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwt_decode from "jwt-decode";
import { FormGroup } from '@angular/forms';	
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
	message: string = '';
	email!: FormControl<any>;
	password!: FormControl<any>;
	loginForm!: FormGroup<{ email: FormControl<any>; password: FormControl<any>; }>;

	constructor(private loginService:AuthService, private router:Router) {
		loginForm:FormGroup;
		email:FormControl;
		password:FormControl;
	 }

	ngOnInit(){
		this.email= new FormControl('',[Validators.required,Validators.minLength(10)]);
		this.password=new FormControl('',[Validators.required,Validators.minLength(8)]);
		this.loginForm = new FormGroup({
			'email':this.email,
			'password':this.password
	});}
	checkLogin(loginForm:FormGroup){
		this.loginService.login(loginForm.value).subscribe({
			next: (res:any) => {
				if(res.success){
					localStorage.setItem('token', res.data);
					var decodedToken:any = jwt_decode(res.data);
					console.log(decodedToken.UserId);
					console.log(decodedToken);
					
					switch(decodedToken.Role){
						case "Admin":
							this.router.navigate(["/admin"]);
							break;
						case "Customer":
							this.router.navigate(["/customer"]);
							break;
						case "ProductMaster":
							this.router.navigate(["/productmaster"])
					}
				}
			},
			error: (err:any) => {
				this.message = err.error.message;
			}
		});
	}
	}

