import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-index-autenticado',
  templateUrl: './index-autenticado.component.html',
  styleUrls: ['./index-autenticado.component.scss'],
})
export class IndexAutenticadoComponent {
  @Input() autenticado!: boolean;
  fg_consultar_giro: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.fg_consultar_giro = this.formBuilder.group({
      txt_pin: ['', [Validators.required]],
    });
  }

  consultarEnvio(): void {
    //
  }
}
