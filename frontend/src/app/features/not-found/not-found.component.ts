import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  countdown: number = 10;
  private timer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.goHome();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  goHome(): void {
    clearInterval(this.timer);
    this.router.navigate(['/']);
  }

  goSignIn(): void {
    clearInterval(this.timer);
    this.router.navigate(['/signin']);
  }
}
