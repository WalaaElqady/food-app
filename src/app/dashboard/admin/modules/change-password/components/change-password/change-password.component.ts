import { ChangePasswordService } from './../../services/change-password.service';
import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  isSmallScreen: boolean = window.innerWidth < 768;
  isPasswordHidden: boolean = true;
  isConfirmNewPasswordHidden: boolean = true;
  constructor(
    private toastr: ToastrService,
    private changePasswordService: ChangePasswordService,
    private router: Router
  ) {}
    @HostListener('window:resize', ['$event'])
      onResize() {
        this.isSmallScreen = window.innerWidth < 768; 
      }
      changePasswordForm = new FormGroup({
        oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmNewPassword: new FormControl('', [Validators.required])
      }, { validators: ChangePasswordComponent.passwordMatchValidator });
      

    static passwordMatchValidator(form: AbstractControl) {
      const newPassword = form.get('newPassword')?.value;
      const confirmNewPassword = form.get('confirmNewPassword')?.value;
      return newPassword === confirmNewPassword ? null : { mismatch: true };
    } 
  sendData(data : FormGroup){ 
    if (this.changePasswordForm.invalid) {
      this.toastr.error('Please enter a valid password.');
      return;
    }
    this.changePasswordService.changePassword(data.value).subscribe({
      next: (res) =>{ 
        console.log(res);
        this.toastr.success('change password successfully');
      },
      error: (err) => {
        console.error('Error response:', err);
        this.toastr.error(err.error.message || 'Something went wrong.')
      },
      complete: () => {
        this.router.navigate(['/auth']);
      }
    });
  }
}