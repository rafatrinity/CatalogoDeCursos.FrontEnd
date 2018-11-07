import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../../../core/classes/base-component';
import { UiService } from '../../../core/services/ui/ui.service';
import { ConsultasService } from '../../../services/consultas.service';

@Component({
  selector: 'app-consulta-detalhe-modal',
  templateUrl: './consulta-detalhe-modal.component.html',
  styleUrls: ['./consulta-detalhe-modal.component.scss']
})
export class ConsultaDetalheModalComponent extends BaseComponent implements OnInit {
  @BlockUI('loadingModal') blockUI: NgBlockUI;

  consulta: any;
  consultas: Array<any>;
  consultasRevogadas: Array<any>;
  tiposDecisao: Array<any>;

  constructor(
    private modalService: BsModalService,
    private modalRef: BsModalRef,
    private consultasService: ConsultasService,
    public ui: UiService
  ) {
    super(ui);
  }

  ngOnInit() {
    this.consulta = this.modalService.config.initialState['consulta'];
    this.carregarTela();
  }

  BaixarDocumento(): void {
    this.consultasService.BaixarDocumento(this.consulta.id);
  }

  ObterDescricaoDoTipoDeDecisao(): string {
    if (!this.consulta) {
      return;
    }

    switch (this.consulta.tipoDeDecisao) {
      case 1:
        return 'Conhecida';
      case 2:
        return 'Não conhecida';
      case 3:
        return 'Conhecimento parcial';
      default:
        return '';
    }
  }

  ExibirOutraConsulta(consulta: any): void {
    this.consulta = consulta;
    this.tratarConsultasRevogadas();
  }

  private carregarTela(): void {
    this.blockUI.start('Carregando...');

    Promise.all([
      this.carregarConsultas(),
      this.carregarComboTiposDeDecisao(),
    ])
    .then(() => this.blockUI.stop())
    .catch(() => this.blockUI.stop());
  }
  private carregarConsultas(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterTodos()
        .subscribe(
          result => {
            this.consultas = result;
            this.tratarConsultasRevogadas();
            resolve();
          },
          error => reject(error)
        );
    });

    return promise;
  }
  private carregarComboTiposDeDecisao(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterTiposDeDecisao()
        .subscribe(
          result => {
            this.tiposDecisao = result;
            resolve();
          },
          error => reject(error)
        );
    });

    return promise;
  }
  private tratarConsultasRevogadas(): void {
    if (!this.consultas || this.consultas.length == 0) {
      return;
    }

    this.consultasRevogadas = this.consultas.filter(x => x.revogadaPor == this.consulta.numero);
  }

}
