import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientStateService {
  private selectedPatientId = new BehaviorSubject<number | null>(null);

  selectedPatientId$ = this.selectedPatientId.asObservable();

  setPatientId(id: number) {
    this.selectedPatientId.next(id);
  }

  clear() {
    this.selectedPatientId.next(null);
  }
}
