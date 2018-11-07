import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BlockUIModule } from 'ng-block-ui';
import { ChartsModule } from 'ng2-charts';
import { TypeaheadModule } from 'ngx-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxMaskModule } from 'ngx-mask';
import { DataGridConfig, EnumDataGridMode, InputFormsConfig, NgxUiHeroDataGridModule, NgxUiHeroInputFormsModule, NgxUiHeroModule } from 'ngx-ui-hero';
import { UiSwitchModule } from 'ngx-ui-switch';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { Spinner2Component } from './components/spinner2/spinner2.component';
import { DebounceDirective } from './directives/debounce.directive';
import { SharedService } from './shared.service';

defineLocale('pt-br', ptBrLocale);

export const dataGridSettings: DataGridConfig = {
    emptyResultsMessage: 'Nenhum registro encontrado no momento.',
    infoMessage: 'Exibindo de {recordsFrom} até {recordsTo}, de {totalRecords} registros encontrados.',
    actionsColumnCaption: 'Ações',
    mode: EnumDataGridMode.OnClient,
    paging: {
      firstText: '<<',
      previousText: '<',
      nextText: '>',
      lastText: '>>',
      boundaryLinks: true,
      directionLinks: true,
      rotate: true,
      maxSize: 10,
      itemsPerPage: 10
    },
    styles: {
      striped: true,
      bordered: true,
      hoverEffect: true,
      responsive: true
    },
    exporting: {
        exportButtonLabel: 'Exportar'
    }
};

export const inputFormsConfig: InputFormsConfig = {
    currency: {
      currencyCode: 'BRL',
      align: 'right',
      allowNegative: true,
      allowZero: true,
      decimal: ',',
      thousands: '.',
      precision: 2,
      prefix: '',
      suffix: ''
    },
    validationMessages: {
      invalid: '{label} está inválido',
      required: '{label} é obrigatório',
      pattern: '{label} está inválido',
      maxlength: 'O valor preenchido é maior do que o máximo permitido',
      minlength: 'O valor preenchido é menor do que o mínimo permitido'
    },
    date: {
      format: 'dd/MM/yyyy',
      theme: 'theme-dark-blue',
      placement: 'bottom',
      locale: 'pt-br'
    },
    upload: {
      placeholder: 'Selecione um arquivo...',
      dropZonePlaceholder: 'Arraste e solte um arquivo aqui para importar.',
      autoUpload: true,
      showDropZone: true,
      showQueue: true,
      withCredentials: false,
      chunk: false,
      chunkSize: 1048576,
      chunkRetries: 3,
      maxFileSize: 4,
      selectButtonIcon: 'fa fa-folder',
      selectButtonLabel: 'Selecionar',
      removeButtonIcon: 'fa fa-trash',
      removeButtonLabel: 'Remover',
      fileTypeErrorMessage: 'A extensão [{extension}] não é permitida.',
      fileSizeErrorMessage: 'Este arquivo excede o tamanho máximo permitido de {maxFileSize}MB.',
      maxFileSizeLabel: 'Tamanho máximo permitido:',
      allowedExtensionsLabel: 'Extensões permitidas:'
    }
};

@NgModule({
    imports: [
        CommonModule,
        NgxUiHeroModule,
        AngularFontAwesomeModule,
        UiSwitchModule,
        FileUploadModule,
        ChartsModule,
        TypeaheadModule.forRoot(),
        BlockUIModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        PaginationModule.forRoot(),
        NgxUiHeroDataGridModule.forRoot(dataGridSettings),
        NgxUiHeroInputFormsModule.forRoot(inputFormsConfig),
        NgxMaskModule.forRoot()
    ],
    declarations: [
        DebounceDirective,
        SpinnerComponent,
        Spinner2Component,
    ],
    providers: [],
    exports: [
        TypeaheadModule,
        NgxUiHeroModule,
        NgxUiHeroDataGridModule,
        NgxUiHeroInputFormsModule,
        AngularFontAwesomeModule,
        BlockUIModule,
        UiSwitchModule,
        BsDropdownModule,
        ModalModule,
        PopoverModule,
        FileUploadModule,
        DebounceDirective,
        SpinnerComponent,
        Spinner2Component,
        ChartsModule,
        PaginationModule,
        NgxMaskModule
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: SharedModule,
          providers: [SharedService]
        };
    }
}
