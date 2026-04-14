import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  // show/hide loader
  @Input() show: boolean = false;

  // optional text
  @Input() text: string = 'Loading...';

  // size control
  @Input() size: number = 40;
}
