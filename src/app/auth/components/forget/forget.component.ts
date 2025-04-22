import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent {
  forgetPasswordForm = new FormGroup({
    email: new FormControl('walaaelqady194@gmail.com', [Validators.required, Validators.email])
  });
  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}


  sendData() {
    if (this.forgetPasswordForm.invalid) {
      this.toastr.error('Please enter a valid email address');
      return;
    }

    const email = this.forgetPasswordForm.value.email!;
    console.log('Sending request with:', { email });


    this.authService.forgetPassword({ email }).subscribe({
      next: () =>{ 
        this.toastr.success('Check your email for the reset link.')
        this.router.navigate(['auth/reset']);
      },
      error: (err) => {
        console.error('Error response:', err);
        this.toastr.error(err.error.message || 'Something went wrong.')}
    });
  }
}
