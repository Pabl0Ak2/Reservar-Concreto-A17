import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HorariosComponent } from '../horarios/horarios.component';
import { Router, RouterOutlet } from '@angular/router';
import { ReservasService } from '../../reservas.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, HorariosComponent],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export default class CalendarioComponent implements OnInit {
  diaSeleccionado: string | null = null;
  horariosDelDiaSeleccionado: { hora: string, disponible: boolean }[] = [];
  horarios = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
  reservasAnteriores: any[] = [];
  mostrarModal: boolean = false;
  private reservaService = inject(ReservasService)
  private cdr = inject(ChangeDetectorRef)
  fechasDeSeptiembre = this.generarFechasSeptiembre();

  ngOnInit() {
    this.reservaService.reservasAnteriores$.subscribe((reservas) => {
      this.reservasAnteriores = reservas;
      this.cdr;
    });
  }

  generarFechasSeptiembre() {
    const fechas = [];
    const año = 2023;
    const mes = 8;

    for (let dia = 1; dia <= 30; dia++) {
      const fecha = new Date(año, mes, dia);
      fechas.push({ fecha: `${dia}/09/${año}`, horarios: this.generarHorariosAleatorios() });
    }
    return fechas;
  }

  seleccionarDia(dia: any, horariosComponent: any) {
    this.diaSeleccionado = dia.fecha;
    this.horariosDelDiaSeleccionado = dia.horarios;
    horariosComponent.openModal();
  }

  generarHorariosAleatorios() {
    return this.horarios.map(hora => ({
      hora,
      disponible: Math.random() > 0.5
    }));
  }

}
