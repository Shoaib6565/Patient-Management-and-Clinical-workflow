import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './features/authComponents/signin.component';
import { authGuard } from './core/guards/auth-guard.guard';
import { guestGuard } from './core/guards/guest.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout/dashboard-layout.component';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './features/dashboard/doctor-dashboard/doctor-dashboard.component';
import { FrontdeskDashboardComponent } from './features/dashboard/frontdesk-dashboard/frontdesk-dashboard.component';
import { CaseListComponent } from './features/cases/case-list/case-list.component';
import { CaseFormComponent } from './features/cases/case-form/case-form.component';
import { CaseDetailComponent } from './features/cases/case-detail/case-detail.component';
import { AppointmentListComponent } from './features/appointments/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './features/appointments/appointment-form/appointment-form.component';
import { CalendarViewComponent } from './features/appointments/calendar-view/calendar-view.component';
import { roleGuard } from './core/guards/role.guard';
import { PatientListComponent } from './features/patients/patient-list/patient-list.component';
import { PatientFormComponent } from './features/patients/patient-form/patient-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [guestGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [guestGuard] },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'doctor',
        component: DoctorDashboardComponent,
        canActivate: [authGuard],
        data: { role: 'Doctor' },
      },
      {
        path: 'fdo',
        component: FrontdeskDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'FDO' },
      },
      { path: '', redirectTo: 'admin', pathMatch: 'full' }, // Optional: default subroute
    ],
  },
  {
    path: 'cases',
    component: CaseListComponent,
    children: [
      { path: 'case-form', component: CaseFormComponent },
      { path: 'case-detail', component: CaseDetailComponent },
    ],
  },
  {
    path: 'appointments',
    component: AppointmentListComponent,
    children: [
      { path: 'appointment-form', component: AppointmentFormComponent },
      { path: 'appointment-calendar-view', component: CalendarViewComponent },
    ],
  },
  {
    path: 'patients',
    component: PatientListComponent,
    children: [
      {
        path: 'patient-form',
        component: PatientFormComponent,
      },
    ],
  },

  // grouping for all protected routes
  {
    path: '',
    // canActivate: [authGuard],
    children: [
      // {path: 'dashboard', component: DashboardLayoutComponent}
    ],
  },
  // {path: '', redirectTo: ''},

  // if does not math any routes
  { path: '**', component: NotFoundComponent },
];
