import { Routes } from '@angular/router';
import { SigninComponent } from './features/authComponents/signin.component';
import { authGuard } from './core/guards/auth-guard.guard';
import { guestGuard } from './core/guards/guest.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout/dashboard-layout.component';
import { AdminDashboardComponent } from './features/dashboard/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './features/dashboard/doctor-dashboard/doctor-dashboard.component';
import { FrontdeskDashboardComponent } from './features/dashboard/frontdesk-dashboard/frontdesk-dashboard.component';
import { AppointmentFormComponent } from './features/appointments/appointment-form/appointment-form.component';
import { CalendarViewComponent } from './features/appointments/calendar-view/calendar-view.component';
import { VisitFormComponent } from './features/visits/visit-form/visit-form.component';
import { CaseFormComponent } from './features/cases/case-form/case-form.component';
import { CaseDetailComponent } from './features/cases/case-detail/case-detail.component';
import { PatientFormComponent } from './features/patients/patient-form/patient-form.component';
import { SpecialtyFormComponent } from './features/settings/specialties/specialty-form/specialty-form.component';
import { FirmFormComponent } from './features/settings/firms/firm-form/firm-form.component';
import { InsuranceFormComponent } from './features/settings/insurance/insurance-form/insurance-form.component';
import { CategoryFormComponent } from './features/settings/categories/category-form/category-form.component';
import { LocationFormComponent } from './features/settings/locations/location-form/location-form.component';
import { UserFormComponent } from './features/userManagement/user-form/user-form/user-form.component';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  // Public
  { path: '', component: HomeComponent, canActivate: [guestGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [guestGuard] },

  // Dashboard
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
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
    ],
  },

  // Protected Pages (Lazy Lists)
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [

      //  APPOINTMENTS
      {
        path: 'appointments',
        loadComponent: () =>
          import('./features/appointments/appointment-list/appointment-list.component')
            .then(m => m.AppointmentListComponent),
      },
      { path: 'appointments/create', component: AppointmentFormComponent },
      { path: 'appointments/edit/:id', component: AppointmentFormComponent },
      { path: 'appointments/appointment-calendar-view', component: CalendarViewComponent },

      //  VISITS
      {
        path: 'visits',
        loadComponent: () =>
          import('./features/visits/visit-list/visit-list.component')
            .then(m => m.VisitListComponent),
      },
      { path: 'visits/edit/:id', component: VisitFormComponent },
      { path: 'visits/create/:appointmentId', component: VisitFormComponent },

      //  CASES
      {
        path: 'cases',
        loadComponent: () =>
          import('./features/cases/case-list/case-list.component')
            .then(m => m.CaseListComponent),
      },
      { path: 'cases/case-form', component: CaseFormComponent },
      { path: 'cases/case-detail', component: CaseDetailComponent },

      //  PATIENTS
      {
        path: 'patients',
        loadComponent: () =>
          import('./features/patients/patient-list/patient-list.component')
            .then(m => m.PatientListComponent),
      },
      { path: 'patients/patient-form', component: PatientFormComponent },

      //  SPECIALTIES
      {
        path: 'specialties',
        loadComponent: () =>
          import('./features/settings/specialties/specialty-list/specialty-list.component')
            .then(m => m.SpecialtyListComponent),
      },
      { path: 'specialties/create', component: SpecialtyFormComponent },
      { path: 'specialties/edit/:id', component: SpecialtyFormComponent },

      //  FIRMS
      {
        path: 'firms',
        loadComponent: () =>
          import('./features/settings/firms/firm-list/firm-list.component')
            .then(m => m.FirmListComponent),
      },
      { path: 'firms/create', component: FirmFormComponent },
      { path: 'firms/edit/:id', component: FirmFormComponent },

      //  INSURANCES
      {
        path: 'insurances',
        loadComponent: () =>
          import('./features/settings/insurance/insurance-list/insurance-list.component')
            .then(m => m.InsuranceListComponent),
      },
      { path: 'insurances/create', component: InsuranceFormComponent },
      { path: 'insurances/edit/:id', component: InsuranceFormComponent },

      //  CATEGORIES
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/settings/categories/category-list/category-list.component')
            .then(m => m.CategoryListComponent),
      },
      { path: 'categories/create', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },

      // LOCATIONS
      {
        path: 'locations',
        loadComponent: () =>
          import('./features/settings/locations/location-list/location-list.component')
            .then(m => m.LocationListComponent),
      },
      { path: 'locations/create', component: LocationFormComponent },
      { path: 'locations/edit/:id', component: LocationFormComponent },

      //  USERS 
      {
        path: 'users',
        component: UserFormComponent,
      },

      //  OTHER LISTS
      {
        path: 'fdo-list',
        loadComponent: () =>
          import('./features/userManagement/fdo-list/fdo-list.component')
            .then(m => m.FdoListComponent),
      },
      {
        path: 'doctor-list',
        loadComponent: () =>
          import('./features/userManagement/doctor-list/doctor-list.component')
            .then(m => m.DoctorListComponent),
      },

    ],
  },

  // 404
  { path: '**', component: NotFoundComponent },
];