import { PublicRoutingModule } from './public.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ConsultaDetalheModalComponent } from './consultas/consulta-detalhe-modal/consulta-detalhe-modal.component';
import { ConsultasComponent } from './consultas/consultas.component';

@NgModule({
    imports: [
        CommonModule,
        PublicRoutingModule,
        CoreModule,
        SharedModule
    ],
    exports: [
        
    ],
    declarations: [
        ConsultasComponent, 
        ConsultaDetalheModalComponent
    ],
    entryComponents: [
        ConsultaDetalheModalComponent
    ],
    providers: [],
})
export class PublicModule { }
