import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumen-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-reserva.component.html',
  styleUrl: './resumen-reserva.component.css'
})
export class ResumenReservaComponent {
  @Input() nombre: string | null = null;
  @Input() correo: string | null = null;
  @Input() telefono: string | null = null;
  @Input() dia: string | null = null;
  @Input() horario: string | null = null;
}
