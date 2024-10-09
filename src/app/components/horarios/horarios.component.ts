import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservaFormComponent } from '../reserva-form/reserva-form.component';
import { ResumenReservaComponent } from '../resumen-reserva/resumen-reserva.component';
import { ReservasService } from '../../reservas.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReservaFormComponent, ResumenReservaComponent],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent {
  @Input() diaSeleccionado: string | null = null;
  @Input() horariosDelDia: { hora: string, disponible: boolean }[] = [];
  private reservaService = inject(ReservasService)
  mostrarModal: boolean = false;
  horarioSeleccionado: string | null = null;
  mostrarFormRes: boolean = false;
  resumenReserva: { nombre: string; correo: string; telefono: string; horario: string; dia: string } | null = null;
  horarioOcupado: boolean = false;
  reservasAnteriores: { nombre: string; correo: string; telefono: string; horario: string; dia: string }[] = [];

  constructor() { }

  openModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.mostrarFormRes = false;
    this.horarioOcupado = false;
    this.resumenReserva = null;
  }

  seleccionarHorario(horario: string, disponible: boolean) {
    if (!disponible) {
      this.horarioOcupado = true;
      this.horarioSeleccionado = null;
      this.mostrarFormRes = false;
    } else {
      this.horarioSeleccionado = horario;
      this.mostrarFormRes = true;
      this.horarioOcupado = false;
    }
    this.resumenReserva = null;
  }

  manejarReserva(reserva: { nombre: string; correo: string; telefono: string; horario: string; dia: string }) {
    if (this.diaSeleccionado) {
      const nuevaReserva = {
        ...reserva,
        dia: this.diaSeleccionado
      };
      this.reservaService.agregarReserva(nuevaReserva);
      this.resumenReserva = nuevaReserva;
      this.reservasAnteriores.push(nuevaReserva);
      const horarioReservado = this.horariosDelDia.find(h => h.hora === reserva.horario);
      if (horarioReservado) {
        horarioReservado.disponible = false;
      }
    }
    this.mostrarFormRes = false;
  }


}
