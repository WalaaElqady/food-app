import { Component, HostListener} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
    isSmallScreen: boolean = window.innerWidth < 768;
    isPasswordHidden: boolean = true;
    isConfirmPasswordHidden: boolean = true;
  
    constructor(private http: HttpClient,
      private toastr: ToastrService,
      private authService: AuthService,
      private router: Router
    ) {}
  
    @HostListener('window:resize', ['$event'])
        onResize() {
          this.isSmallScreen = window.innerWidth < 768; 
        }
    verifyForm = new FormGroup({
      email: new FormControl('walaaelqady194@gmail.com', [Validators.required, Validators.email]),
      code: new FormControl('',[Validators.required] )
    });
    sendData(data: FormGroup) {
      this.authService.verifyAccount(data.value).subscribe({
        next: () => {
          this.toastr.success('Account Verified Successfully');
          this.router.navigate(['auth']);
        },
        error: (err) => {
          console.log(err.error);
          this.toastr.error(err.error.message);
        }
      });
    
      console.log(data.value);
    }

}
