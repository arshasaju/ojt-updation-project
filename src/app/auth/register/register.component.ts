import { Component, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
// import { ReactiveFormsModule } from '@angular/forms';

// @NgModule({
//   imports: [
//     ReactiveFormsModule
//   ],
// })

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private registerService:AuthService, private router:Router) { }

  handleRegister(form:any){
    console.log(form.value);
    this.registerService.register(form.value).subscribe({
        next:(responce)=>{
          this.router.navigate(['/login']);
        }
    })
  }
}
