import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './form-modal.component.html'
})
export class ModalComponent {

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  stop(event: Event) {
    event.stopPropagation();
  }
}
