import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxDatatableModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
