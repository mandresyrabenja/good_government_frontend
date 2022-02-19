import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "statistic",
    title: "Statistiques",
    icon: "icon-chart-pie-36",
    class: ""
  }
  ,
  {
    path: "crud-region",
    title: "Régions",
    icon: "icon-world",
    class: ""
  }
  ,
  {
    path: "assign-report",
    title: "Signalements",
    icon: "icon-bell-55",
    class: ""
  }
  // ,
  // {
  //   path: "icons",
  //   title: "Icons",
  //   icon: "icon-atom",
  //   class: ""
  // },
  // {
  //   path: "maps",
  //   title: "Maps",
  //   icon: "icon-world",
  //   class: ""
  // },
  // {
  //   path: "notifications",
  //   title: "Notification",
  //   icon: "icon-bell-55",
  //   class: ""
  // },
  // {
  //   path: "user",
  //   title: "User",
  //   icon: "icon-single-02",
  //   class: ""
  // },
  // {
  //   path: "tables",
  //   title: "Table",
  //   icon: "icon-puzzle-10",
  //   class: ""
  // },
  // {
  //   path: "typography",
  //   title: "Typography",
  //   icon: "icon-align-center",
  //   class: ""
  // }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
