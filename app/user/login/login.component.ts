import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/_services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private fb: FormBuilder, private route: Router) { }

  loginForm!: FormGroup;
  formSubmitted!: boolean;


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  onSubmit() {
    try {
      this.formSubmitted = true
      if (this.loginForm.valid) {
        let data = {
          username: this.loginForm.value.email,
          password: this.loginForm.value.password,
          device_id: "fgdg"
        }
        this.apiService.loginApi(data).subscribe(res => {
          if (res.success == true) {
            localStorage.setItem('accessToken',res?.data?.token)
            localStorage.setItem('userId',res?.data?.id)
            this.route.navigate(['/dashboard'])
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

}
