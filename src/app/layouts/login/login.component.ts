import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  login(form: NgForm) {
    this.authService.login(form.value.username, form.value.password)
    .subscribe(
      (response) => {
        let token = response.headers.get('Authorization');
        localStorage.setItem('token', token);
        this.authService.isAuth = true;
        this.router.navigateByUrl('admin/statistic');
      },
      (error: HttpErrorResponse) => {
        this.loginFailed();
      }
    );
  }

  loginFailed() {
    this.toastr.error(
      '<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Login ou mot de passe incorrect',
      '',
      {
        enableHtml: true,
        closeButton: false,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-top-center'
      }
    );
    return;
  }

  ngOnInit(): void {}

}
