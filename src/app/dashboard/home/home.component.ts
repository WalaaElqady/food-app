import { UsersService } from './../admin/modules/users/services/users.service';
import { HelperService } from 'src/app/dashboard/shared/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../admin/modules/users/models/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userName: string = 'User';
    user: User | null = null;
    

  constructor(private helperService:HelperService,
    private usersService:UsersService
  ) { }

  ngOnInit(): void {
    this.helperService.currentUserName.subscribe(name => {
      if (name) this.userName = name;
    });
    this.usersService.getCurrentUser().subscribe({
      next: (userData) => {
        this.helperService.updateUserName(userData.userName);
      },
      error: (err) => console.error('Error fetching user data:', err)
    });
  }
  
}
