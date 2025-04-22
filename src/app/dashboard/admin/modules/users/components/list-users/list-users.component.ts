import { IGroupData } from './../../models/users';
import { Component, OnInit } from '@angular/core';
import { IGetSearchParams, IGetUsersParams, IUserData } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
    usersList: IUserData[] = [];
    defaultImage = '../../../../assets/images/logo_upsilling.png';
    baseUrl = 'https://upskilling-egypt.com:3006/';

    tableRes: any;
    searchQuery: string = '';
    searchSubject = new Subject<string>();
    groupList: IGroupData[] =[
      {"id": 1, "name" : "SuperAdmin"},
      {"id": 2, "name" : "SystemUser"},
    ];
  tableQueryParams: IGetSearchParams = {
    userName: '',
    groups: 0,
    pageSize: 5,
    pageNumber: 1,
  };
  constructor(private usersService: UsersService,
      public dialog: MatDialog,) { 
        this.getUsersData();
      }
      ngOnInit() {
        this.searchSubject.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap(query => {
            this.tableQueryParams = {
              ...this.tableQueryParams,
              userName: query,
              pageNumber: 1
            };
            console.log(this.tableQueryParams);
            return this.usersService.getUsers(this.tableQueryParams);
          })
    
        ).subscribe({
          next: (res) => {
            this.usersList = res.data;
            console.log("API Response:", res);
          },
          error: (err) => {
            console.error('Error fetching recipes:', err);
          }
        });
        }
        
      onSearchInputChange() {
        this.searchSubject.next(this.searchQuery);
      }
      getUsersData() {

        this.usersService.getUsers(this.tableQueryParams).subscribe({
          next: (res) => {
            if (res?.data?.length) { 
              this.usersList = res.data;
              this.tableRes = res;
              console.log(this.tableQueryParams);
            } else {
              this.usersList = [];
              console.log("No users found.");
            }
          },
          error: (err) => {
            console.error('Error fetching users:', err);
          }
        });
  
      }
      getUserImage(imagePath: string | undefined): string {
        return imagePath ? this.baseUrl + imagePath : this.defaultImage;
      }
      clearFilters(): void {
        this.searchQuery = '';
        this.tableQueryParams = {
          userName: '',
          groups: 0,
          pageSize: 5,
          pageNumber: 1,
        };
        this.getUsersData();
      }
      handlePageEvents(event: PageEvent): void {
        if (
          this.tableQueryParams.pageNumber !== event.pageIndex + 1 ||
          this.tableQueryParams.pageSize !== event.pageSize
        ) {
          this.tableQueryParams = {
            ...this.tableQueryParams, 
            pageNumber: event.pageIndex + 1,
            pageSize: event.pageSize
          };
          this.getUsersData();
        }
      }
}
