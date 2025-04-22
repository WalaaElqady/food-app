import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl } from '@angular/forms';
import { HostListener } from '@angular/core';
import {NgxFileDropEntry, FileSystemFileEntry} from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isSmallScreen: boolean = window.innerWidth < 768;
  isPasswordHidden: boolean = true;
  isConfirmPasswordHidden: boolean = true;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
 constructor(private authService: AuthService,
    private toastr: ToastrService,private http: HttpClient,
    private router: Router) {}

    @HostListener('window:resize', ['$event'])
    onResize() {
      this.isSmallScreen = window.innerWidth < 768; 
    }

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8),
      Validators.pattern(/^[A-Za-z]+[0-9]+$/)
    ]),
    country: new FormControl('egypt', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('01017563238', [Validators.required
    ]),
    password: new FormControl('test@Test2', [Validators.required, Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]
  ),
  confirmPassword: new FormControl('test@Test2', [Validators.required])
}, { validators: RegisterComponent.passwordMatchValidator });

  static passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }  
sendData(data: FormGroup) {
  if (data.invalid) {
    this.toastr.error('Please fill all fields correctly');
    return;
  }

  let newData = new FormData();
  
  Object.entries(data.value).forEach(([key, value]) => {
    newData.append(key, value as string);
  });
  console.log('Selected File before sending:', this.selectedFile);


  if (this.selectedFile) {
    newData.append('imagePath', this.selectedFile);
  }

  this.authService.register(newData).subscribe({
    next: (res) => {
      this.toastr.success('Registered Successfully');
      this.router.navigate(['auth/verify']);

    },
    error: (err) => {
      this.toastr.error(err.error.message);
    }
  });
  console.log('Form Data:');
newData.forEach((value, key) => {
  console.log(key, value);
});
}

dropped(files: NgxFileDropEntry[]) {
  if (files.length > 0) {
    const droppedFile = files[0];

    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.selectedFile = file;
        // console.log('Selected File:', file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
  }
}

deleteImage() {
  this.imagePreview = null;
  this.selectedFile = null;
}

uploadImage() {
  if (!this.selectedFile) {
    console.error('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.http.post('/Users/Register', formData).subscribe(response => {
    console.log('Image uploaded successfully', response);
  });
}
}










