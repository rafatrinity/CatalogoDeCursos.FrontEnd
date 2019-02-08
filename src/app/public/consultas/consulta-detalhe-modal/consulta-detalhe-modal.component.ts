import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { Component, OnInit, Input } from '@angular/core';

import { BaseComponent } from '../../../core/classes/base-component';
import { UiService } from '../../../core/services/ui/ui.service';

@Component({
  selector: 'app-consulta-detalhe-modal', 
  templateUrl: './consulta-detalhe-modal.component.html',
  styleUrls: ['./consulta-detalhe-modal.component.scss'],
})

export class ConsultaDetalheModalComponent extends BaseComponent implements OnInit {
  @BlockUI('loadingModal') blockUI: NgBlockUI;
  
  curso: any;

  inscrever(link: any): void {
    window.open(link, "_blank");
  }
  

  constructor(
    private modalService: BsModalService,
    public ui: UiService
  ) {
    super(ui);
  }

  ngOnInit() {
    this.curso = this.modalService.config.initialState['curso'];
  }


}
