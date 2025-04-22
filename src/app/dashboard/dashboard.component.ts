import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false;

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (window.innerWidth <= 768) {
      this.isSidebarCollapsed = true;
    }
  }

  toggleSidebar(): void {
    if (window.innerWidth <= 768) {
      this.isSidebarCollapsed = true;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  onSidebarToggle(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
  }
}

