import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService:AuthService, private toastr: ToastrService,
    private router: Router
  ){
  }
isHide:boolean=true;
loginForm = new FormGroup({
  email: new FormControl('walaaelqady194@gmail.com' , [Validators.required, Validators.email]),
  password: new FormControl('test@Test2', [Validators.required , Validators.minLength(6),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
   ])
});
sendData(data:FormGroup){
  if (this.loginForm.invalid) {
    this.toastr.error('Please fill in all required fields!', 'Validation Error');
    return;
  }
  this.authService.login(data.value).subscribe({
    next: (res) => {
      console.log(res);
      this.toastr.success('Login Successfully');
      this.authService.getProfile();
    },
    error: (err) => {
      console.log(err.error);
      this.toastr.error(err.error.message);
    },
    complete: () => {
      this.router.navigate(['/dashboard']);
      console.log('Login completed');
    }
  });
  console.log(data.value);
}
}
