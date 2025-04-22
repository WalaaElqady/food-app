import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/dashboard/admin/modules/users/models/users';
import { HelperService } from '../../services/helper.service';
import { UsersService } from 'src/app/dashboard/admin/modules/users/services/users.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  userName: string = 'User';
  defaultImage = '../../../../assets/images/logo_upsilling.png';

  constructor(
    private helperService: HelperService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.helperService.currentProfileImage.subscribe(image => {
      if (image) this.defaultImage = image;
    });

    this.helperService.currentUserName.subscribe(name => {
      if (name) this.userName = name;
    });

    this.usersService.getCurrentUser().subscribe({
      next: (userData) => {
        const fullImagePath = userData.imagePath 
          ? `https://upskilling-egypt.com:3006/${userData.imagePath}`
          : this.defaultImage;

        this.user = { ...userData, imagePath: fullImagePath };

        this.helperService.updateProfileImage(fullImagePath);
        this.helperService.updateUserName(userData.userName);
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }
}

  


