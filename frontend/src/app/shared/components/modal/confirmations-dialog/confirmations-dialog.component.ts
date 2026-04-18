import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule],
  templateUrl: './confirmations-dialog.component.html',
  styleUrl: './confirmations-dialog.component.css'
})
export class ConfirmDialogComponent {

  @Input() visible:boolean = false;
  @Input() title:string = "Confirm";
  @Input() message:string = "Are you sure?";
  @Input() buttonName: string = "Delete";

  @Output() onConfirm = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  confirm(){
    this.onConfirm.emit();
  }

  cancel(){
    this.onCancel.emit();
  }

}
