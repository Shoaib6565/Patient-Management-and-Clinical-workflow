import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './features/authComponents/signin.component'
import { authGuard } from './core/guards/auth-guard.guard';
import { guestGuard } from './core/guards/guest.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [guestGuard]},
    { path: 'signin', component: SigninComponent, canActivate: [guestGuard] },
    // grouping for all protected routes
    {
        path: '',
        canActivate: [authGuard],
        children: [

        ]
    },
    // {path: '', redirectTo: ''},

    // if does not math any routes
    { path: '**', component: NotFoundComponent }

];
