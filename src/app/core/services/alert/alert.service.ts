import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable()
export class AlertService {

  constructor() {}
  swal(args: SweetAlertOptions) {
    return swal(args)
  }
  
  private alert(options) {
    const baseOptions = {
      confirmButtonText: 'OK',
      focusConfirm: false,
      type: 'info',
    }
    return this.swal((<any>Object).assign(baseOptions, options))
  }

  prompt(options) {
    const baseOptions = {
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      input: 'text'
    }
    return this.swal((<any>Object).assign({}, baseOptions, options))
  }

  question(title: string, text: string) {
    return this.alert({ 
      type: 'question', 
      title: title || 'TCE-RJ',
      html: text,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não' 
    });
  }
  success(title: string, text: string) {
    return this.alert({ 
      type: 'success', 
      title: title || 'TCE-RJ',
      html: text 
    });
  }
  error(title: string, text: string) {
    return this.alert({ 
      type: 'error', 
      title: title || 'TCE-RJ',
      html: text 
    });
  }
  warning(title: string, text: string) {
    return this.alert({ 
      type: 'warning', 
      title: title || 'TCE-RJ',
      html: text 
    });
  }
  info(title: string, text: string) {
    return this.alert({ 
      type: 'info', 
      title: title || 'TCE-RJ',
      html: text 
    });
  }  

}
