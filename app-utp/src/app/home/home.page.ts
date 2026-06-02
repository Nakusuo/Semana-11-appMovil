import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage {
  nombre: string = '';
  correo: string = '';
  tipoApp: string = '';
  mensaje: string = '';
  registroValido: boolean = false;

  constructor() { }
  validarRegistro() {
    const correoValido =
      this.correo.includes('@') && this.correo.includes('.');
    if (!this.nombre.trim() || !this.correo.trim() || !this.tipoApp) {
      this.registroValido = false;
      this.mensaje = 'Complete todos los campos antes de continuar.';
      return;
    }
    if (!correoValido) {
      this.registroValido = false;
      this.mensaje = 'Ingrese un correo válido.';
      return;
    }
    this.registroValido = true;
    this.mensaje =
      'Registro válido. Bienvenido/a ' + this.nombre +
      '. Tipo de app: ' + this.tipoApp + '.';
  }

  limpiar() {
    this.nombre = '';
    this.correo = '';
    this.tipoApp = '';
    this.mensaje = '';
    this.registroValido = false;
  }
}