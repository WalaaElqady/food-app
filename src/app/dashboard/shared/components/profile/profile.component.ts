import { HelperService } from 'src/app/dashboard/shared/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/dashboard/admin/modules/users/services/users.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  

isSmallScreen: boolean = window.innerWidth < 768;
userId! : string | null;
isPasswordHidden: boolean = true;
isEditMode:boolean = false;
isViewMode!:string | null ;
pageTitle: string = 'View Profile';
buttonText: string = 'Save';
updateForm = new FormGroup({
  userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8),
    Validators.pattern(/^[A-Za-z]+[0-9]+$/)
  ]),
  country: new FormControl('egypt', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  phoneNumber: new FormControl('01017563238', [Validators.required]),
  confirmPassword: new FormControl('test@Test2', [Validators.required, Validators.minLength(6),
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]
)
} );

 constructor(
  private usersService: UsersService,
    private helperService: HelperService,
    private toastr: ToastrService,private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isViewMode = (this.activatedRoute.snapshot.paramMap.get('formDisabled'))
    console.log('Extracted User ID:', this.userId);

  }
  ngOnInit(): void {
    if (this.userId){
      this.isEditMode = true;
      this.getUser();
      this.pageTitle = 'Edit Profile';
    }
    if (this.isViewMode){
      this.updateForm.disable();
      setTimeout(() => this.updateForm.disable(), 0);
      this.pageTitle = 'View Profile';
    }
   }
    @HostListener('window:resize', ['$event'])
    onResize() {
      this.isSmallScreen = window.innerWidth < 768; 
    }
 


getUser(): void {
  this.usersService.getCurrentUser().subscribe({
    next: (res) => {
      console.log(res);
      
      this.updateForm.patchValue({
        userName: res.userName,
        country: res.country,
        email: res.email,
        phoneNumber: res.phoneNumber
      });

      const baseURL = "https://upskilling-egypt.com:3006/";
      this.imagePreview = res.imagePath ? `${baseURL}${res.imagePath}` : this.defaultImage;
      this.helperService.updateProfileImage(this.imagePreview);
      this.helperService.updateUserName(res.userName);

    },
    error: (err) => console.error('Error fetching user data:', err)
  });
}


sendData(data: FormGroup) {
  if (!data || data.invalid) {
    this.toastr.error('Please fill all fields correctly');
    return;
  }

  let newData = new FormData();
  
  Object.entries(data.value).forEach(([key, value]) => {
    newData.append(key, value as string);
  });
  console.log('Selected File before sending:', this.selectedFile);


  if (this.selectedFile) {
    newData.append('profileImage', this.selectedFile);
  }

  this.usersService.updateUser(newData).subscribe({
    
    next: (res) => {
      console.log(res);
      this.toastr.success('Updated Successfully');

      if (res.imagePath) {
        const fullImagePath = `https://upskilling-egypt.com:3006/${res.imagePath}`;
        this.helperService.updateProfileImage(fullImagePath);
      }
    
      if (res.userName) {
        this.helperService.updateUserName(res.userName);
      }



    },
    error: (err) => {
      this.toastr.error(err.error.message);
    }
  });
  
//   console.log('Form Data:');
//   newData.forEach((value, key) => {
//   console.log(key, value);
// });
}

defaultImage = '../../../../assets/images/logo_upsilling.png';
selectedFile: File | null = null;
imagePreview: string | null = null;



dropped(files: NgxFileDropEntry[]) {
  if (files.length === 0) return;

  const fileEntry = files[0].fileEntry as FileSystemFileEntry;
  fileEntry.file((file: File) => {
    if (!file.type.startsWith('image/')) {
      this.toastr.error('Only image files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
      this.selectedFile = file;
    };
    reader.readAsDataURL(file);
  });
}


deleteImage() {
  this.imagePreview = this.defaultImage;
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
