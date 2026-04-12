import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  imports: [],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css'
})
export class Page404Component {
  router = inject(Router)
  goToHome(){
    this.router.navigate(['/']);
  }
}
