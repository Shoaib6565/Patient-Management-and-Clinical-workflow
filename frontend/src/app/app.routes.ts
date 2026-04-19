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
import { VisitListComponent } from './features/visits/visit-list/visit-list.component';
import { VisitFormComponent } from './features/visits/visit-form/visit-form.component';
import { PatientFormComponent } from './features/patients/patient-form/patient-form.component';
import { SpecialtyListComponent } from './features/settings/specialties/specialty-list/specialty-list.component';
import { SpecialtyFormComponent } from './features/settings/specialties/specialty-form/specialty-form.component';
import { FirmListComponent } from './features/settings/firms/firm-list/firm-list.component';
import { FirmFormComponent } from './features/settings/firms/firm-form/firm-form.component';
import { InsuranceListComponent } from './features/settings/insurance/insurance-list/insurance-list.component';
import { InsuranceFormComponent } from './features/settings/insurance/insurance-form/insurance-form.component';
import { CategoryListComponent } from './features/settings/categories/category-list/category-list.component';
import { CategoryFormComponent } from './features/settings/categories/category-form/category-form.component';
import { LocationListComponent } from './features/settings/locations/location-list/location-list.component';
import { LocationFormComponent } from './features/settings/locations/location-form/location-form.component';

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




  // grouping for all protected routes with dashboard layout
  {
    path: '',
    component: DashboardLayoutComponent, //  same layout
    children: [
      {
        path: 'appointments',
        component: AppointmentListComponent,
        children: [
          { path: 'create', component: AppointmentFormComponent },
          { path: 'edit/:id', component: AppointmentFormComponent },
          {
            path: 'appointment-calendar-view',
            component: CalendarViewComponent,
          },
        ],
      },
      {
        path: 'visits',
        component: VisitListComponent,
        children: [
          { path: 'edit/:id', component: VisitFormComponent },
          { path: 'create/:appointmentId', component: VisitFormComponent },

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
        path: 'patients',
        component: PatientListComponent,
        children: [
          {
            path: 'patient-form',
            component: PatientFormComponent,
          },
        ],
      },
      {
        path: 'specialties',
        component: SpecialtyListComponent,
        children: [
          { path: 'create', component: SpecialtyFormComponent },
          {path: 'edit/:id', component: SpecialtyFormComponent },
        ]
      },
      {
        path: 'firms',
        component: FirmListComponent,
        children: [
          { path: 'create', component: FirmFormComponent },
          {path: 'edit/:id', component: FirmFormComponent },
        ]
      },
      {
        path: 'insurances',
        component: InsuranceListComponent,
        children: [
          { path: 'create', component: InsuranceFormComponent },
          {path: 'edit/:id', component: InsuranceFormComponent },
        ]
      },
      {
        path: 'categories',
        component: CategoryListComponent,
        children: [
          { path: 'create', component: CategoryFormComponent },
          {path: 'edit/:id', component: CategoryFormComponent },
        ]
      },
      {
        path: 'locations',
        component: LocationListComponent,
        children: [
          { path: 'create', component: LocationFormComponent },
          {path: 'edit/:id', component: LocationFormComponent },
        ]
      },

    ],
  },


  // if does not math any routes
  { path: '**', component: NotFoundComponent },
];
