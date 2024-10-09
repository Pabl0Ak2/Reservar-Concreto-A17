import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservasService } from '../../reservas.service';

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent {
  @Input() horarioSeleccionado: string | null = null;
  @Input() diaSeleccionado: string | null = null;
  @Output() reservaConfirmada = new EventEmitter<{ nombre: string; correo: string; telefono: string; horario: string; dia: string }>();
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private reservasService: ReservasService) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  enviarReserva() {
    if (this.userForm.valid) {
      const reservaData = {
        ...this.userForm.value,
        horario: this.horarioSeleccionado,
        dia: this.diaSeleccionado
      };
      this.reservaConfirmada.emit(reservaData);
    }
  }
}
