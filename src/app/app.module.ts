import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CrudRegionComponent } from './pages/crud-region/crud-region.component';
import { StatisticService } from './services/statistic.service';
import { AuthInterceptor } from './services/auth-interceptor.service';

import { AssignReportComponent } from './pages/assign-report/assign-report.component';
import { LoginComponent } from './layouts/login/login.component';
import { AuthService } from "./services/auth.service";
import AuthGuard from "./services/auth-guard.service";
import { ReportService } from "./services/report.service";
import { RegionService } from "./services/regionservice";
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, CrudRegionComponent,AssignReportComponent, LoginComponent],
  providers: [
    StatisticService,
    AuthService,
    AuthGuard,
    ReportService,
    RegionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
