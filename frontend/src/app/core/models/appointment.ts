export interface Appointment {
  id?: number;
  patient_name: string;
  doctor_name: string;
  specialty_name: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  status: string;
  location_name: string;
}
