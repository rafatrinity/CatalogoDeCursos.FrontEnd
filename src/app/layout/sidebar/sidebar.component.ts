import { Component, OnInit } from '@angular/core';
import { MenuItemModel } from './menu-item.model';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  items: Array<MenuItemModel> = [
    {
      title: 'Enviar Lotes de Eventos',
      icon: 'icons fa fa-upload',
      router: '/enviar-lotes-eventos',
    },
    // {
    //   title: 'Editais',
    //   icon: 'icons icon-calendar',
    //   items: [
    //     {
    //       title: 'Consultar',
    //       icon: 'icons fa fa-search',
    //       router: '/admin/editais/consulta',
    //     },
    //     {
    //       title: 'Incluir',
    //       icon: 'icons icon-note',
    //       router: '/admin/editais/criar',
    //     }
    //   ]
    // },
    // {
    //   title: 'Administração',
    //   icon: 'icons icon-organization',
    //   items: [
    //     {
    //       title: 'Critérios de Julgamento',
    //       icon: 'icons icon-notebook',
    //       router: '/admin/tabelas-basicas/edital/criteriosDeJulgamento',
    //     },
    //     {
    //       title: 'Comissões de Licitação',
    //       icon: 'icons icon-notebook',
    //       router: '/admin/tabelas-basicas/comissoes',
    //     },
    //     {
    //       title: 'Modalidades',
    //       icon: 'icons icon-notebook',
    //       router: '/admin/tabelas-basicas/edital/modalidades',
    //     },
    //     {
    //       title: 'Regime de Execução',
    //       icon: 'icons icon-notebook',
    //       router: '/admin/tabelas-basicas/edital/regimesExecucao',
    //     },
    //     {
    //       title: 'Formas de Publicação',
    //       icon: 'icons icon-notebook',
    //       router: '/admin/tabelas-basicas/publicacao/formasPublicacao',
    //     },
    //     {
    //       title: 'Tipos de Intervenção',
    //       icon: 'icons icon-notebook',
    //       router: '/admin/tabelas-basicas/obra/tiposIntervencao',
    //     },
    //     {
    //       title: 'Tipos de Objetos de Engenharia',
    //       icon: 'icons icon-notebook',
    //       router: '/admin/tabelas-basicas/obra/tiposObjetosDeEngenharia',
    //     },
    //    {
    //       title: 'Tipologias de Objeto de Contratação',
    //       icon: 'icons icon-notebook',
    //       router: '/admin/tabelas-basicas/edital/tipologiasDeContratacao',
    //     }
    //   ]
    // }
  ];

  constructor() { }

  ngOnInit() {
    this.handleMenuCollapses();
  }

  private handleMenuCollapses(): void {
    setTimeout(() => {
      $('ul.menu-lateral li > span.menu-link').on('click', function(e){
        $(this).parent()
          .siblings()
          .children('.menu-link')
            .children('i.fa:last-child')
            .toggleClass('fa-angle-down', true)
            .toggleClass('fa-angle-up', false)
          .parent()
          .parent('li')
          .removeClass('open')
          .children('ul.submenu')
          .stop(true, true)
          .slideUp('fast');

        $(this)
          .children('i.fa:last-child')
            .toggleClass('fa-angle-down', $(this).parent().hasClass('open'))
            .toggleClass('fa-angle-up', !$(this).parent().hasClass('open'))
          .parent()
          .parent('li')
          .toggleClass('open')
          .children('ul.submenu')
          .stop(true, true)
          .slideToggle('fast');
      });
    }, 0);
  }

}
