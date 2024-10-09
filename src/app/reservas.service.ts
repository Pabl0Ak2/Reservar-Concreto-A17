import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Reserva {
  nombre: string;
  fecha: string;
  hora: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private reservasAnterioresSubject = new BehaviorSubject<any[]>([]);
  reservasAnteriores$ = this.reservasAnterioresSubject.asObservable();

  agregarReserva(reserva: any) {
    const currentReservas = this.reservasAnterioresSubject.value;
    this.reservasAnterioresSubject.next([...currentReservas, reserva]);
  }

  obtenerReservas() {
    return this.reservasAnterioresSubject.value;
  }
}
