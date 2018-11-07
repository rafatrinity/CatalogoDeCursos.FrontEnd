import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TruncatePipe } from './pipes/truncate.pipe';
import { AlertService } from './services/alert/alert.service';
import { ApiService } from './services/api/api.service';
import { ResponseHandlerService } from './services/api/response-handler.service';
import { UiService } from './services/ui/ui.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
  ],
  providers: [
    UiService,
    AlertService,
    ApiService,
    ResponseHandlerService,
  ],
  declarations: [
    TruncatePipe,
  ],
  exports: [
    TruncatePipe,
  ]
})
export class CoreModule { }
