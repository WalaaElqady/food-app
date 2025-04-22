import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
interface NavItem {
  title: string;
  icon: string;
  link?: string;
  action?: () => void;
  isActive: boolean;
  role: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() toggle = new EventEmitter<boolean>();

  toggleSidebar(): void {
    const newValue = !this.isCollapsed;
    this.toggle.emit(newValue);
  }
  
  navItems: NavItem[] = [
    { title: 'Home', icon: 'fa-solid fa-house', link: '/dashboard', isActive: false, role: this.isAdmin() || this.isUser()  },
    { title: 'Users', icon: 'fa-solid fa-users', link: '/dashboard/admin/users', isActive: false, role: this.isAdmin()},
    { title: 'Recipes', icon: 'fa-solid fa-utensils', link: '/dashboard/admin/recipes', isActive: false, role: this.isAdmin() },
    { title: 'Categories', icon: 'fa-solid fa-list', link: '/dashboard/admin/categories', isActive: false, role: this.isAdmin() },
    { title: 'Change Password', icon: 'fa-solid fa-key', link: '/dashboard/admin/change-password', isActive: false, role: this.isAdmin() },
    { title: 'Recipes', icon: 'fa-solid fa-utensils', link: '/dashboard/user/user-recipes', isActive: false, role:this.isUser()},
    { title: 'Favorites', icon: 'fa-solid fa-heart', link: '/dashboard/user/favorites', isActive: false, role: this.isUser()},
    { title: 'Logout', icon: 'fa-solid fa-right-from-bracket',action: () => this.logOut(), isActive: false, role: this.isAdmin() || this.isUser() }

  ];

  constructor(private router: Router,
  ) {}

  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.isCollapsed = true;
      this.toggle.emit(this.isCollapsed);
    }
    this.updateActiveItem();
  }

  updateActiveItem(): void {
    const currentUrl = this.router.url;
    this.navItems.forEach(item => {
      item.isActive = currentUrl === item.link;
    });
  }
  

  setActive(index: number): void {
    this.navItems.forEach((item, i) => item.isActive = i === index);
  }
    isAdmin(): boolean{
    return localStorage.getItem('role') === 'SuperAdmin' ? true : false 
  }
  isUser(): boolean{
    return localStorage.getItem('role') === 'SystemUser' ? true : false 
  }
  logOut(): void {
    localStorage.clear();

    setTimeout(() => {
        window.location.href = '/auth';
    }, 1000); 
}
}
