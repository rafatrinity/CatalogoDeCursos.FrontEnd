import { AlertService } from './../../core/services/alert/alert.service';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalService } from 'ngx-bootstrap';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../core/classes/base-component';
import { UiService } from '../../core/services/ui/ui.service';
import { ConsultasService } from '../../services/consultas.service';
import { ConsultaDetalheModalComponent } from './consulta-detalhe-modal/consulta-detalhe-modal.component';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
  styles: [
    `
:host >>> .popover {
  background-color: #009688;
  color: #fff;
}
:host >>> .popover>.arrow:after {
  border-top-color: #009688;
}
  `
  ]
})




export class ConsultasComponent extends BaseComponent implements OnInit {
  @BlockUI('loading') blockUI: NgBlockUI;
  @ViewChild('paginator') paginator: PaginationComponent;

  selected: string;
  noResult = false;
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];
  Metodologia: any;
  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  relatores: Array<any>;
  jurisdicionados: Array<any>;
  datasPublicacao: Array<any>;
  tiposDecisao: Array<any>;
  dadosFiltrados: Array<any>;
  dadosEmExibicao: Array<any>;
  dadosDoBanco: Array<any>;
  paginaAtual: number;
  cardDeckInitialized: boolean;
  animationsInitialized: boolean;
  numeroItensPorPagina: number = 8;
  buscaAvancada: boolean = false;
  filtros: any = {};
  filtrosAvancados: any = {};

  constructor(
    private alertService: AlertService,
    private consultasService: ConsultasService,
    private modalService: BsModalService,
    public ui: UiService
  ) {
    super(ui);
  }

  

  popar() {
    this.alertService.info('Info', '<p>Considerando a Deliberação n° 231, de 30 de agosto de 2005 - Regimento Interno da Escola de Contas do Estado do Rio de Janeiro.</p><p>Assunto: Impedimento temporário de inscrição em atividades de Capacitação</p><p>Uma vez confirmada sua inscrição, qualquer desistência de participação deverá ser comunicada à Escola por meio de Ofício, com antecedência mínima de 5 (cinco) dias úteis do início da atividade.</p>Por motivos alheios à sua vontade, caso não seja possível a comunicação citada acima, deverá ser enviado à Escola Ofício, justificando a impossibilidade de participação.</p></br><p>O não comparecimento, em desobediência às regras acima, implicará as seguintes determinações:</p></br><p>* Serão bloqueadas por 3 (três) meses as inscrições dos alunos com frequência < 75% (alunos reprovados por frequência);</p><p>* Os 3 (três) meses de bloqueio são contados a partir da data final do curso a que o aluno não compareceu;</p><p>* O bloqueio será efetivado no momento da inscrição.<p></br><p>A justificativa será recebida e passará por análise interna da Escola e, em quaisquer hipóteses, o aluno será comunicado da decisão final.</p>');
  }

  ngOnInit() {
    this.carregarTela();
  }

  Filtrar(): void {
    this.inicializar();
  }
  LimparFiltros(): void {
    this.filtros.numero = '';
    this.filtros.anoPublicacao = '';
    this.filtros.ementa = '';
    this.filtros.processo = '';
    this.Metodologia = null;
    this.LimparFiltrosAvancados();
    this.inicializar();
  }
  LimparFiltrosAvancados(): void {
    this.filtrosAvancados = {};
  }

  inscrever(): void{
    window.open('https://seguro.tce.rj.gov.br/sia/Account/Login?ReturnUrl=%2fsia%2fHOME%2fALUNO%3fdestino%3dINSCREVER%26SequencialProduto%3d1913%26AnoProgramacao%3d2018%26SequencialProgramacao%3d21%26SequencialOcorrencia%3d3&destino=INSCREVER&SequencialProduto=1913&AnoProgramacao=2018&SequencialProgramacao=21&SequencialOcorrencia=3',"_blank");
  }

  BaixarDocumento(consulta: any): void {
    this.consultasService.BaixarDocumento(consulta.id);
  }

  PageChanged(event: any): void {
    this.paginaAtual = event.page;
    this.renderizarDados();
  }

  VerDetalhes(consulta: any): void {
    this.modalService.show(ConsultaDetalheModalComponent, {
      class: 'modal-xl',
      initialState: {
        consulta: consulta
      }
    });
  }

  AlterarNumeroItensPorPagina(): void {
    this.dadosEmExibicao = null;
    setTimeout(() => {
      this.inicializar();
    });
  }

  private carregarTela(): void {
    this.blockUI.start('Carregando...');

    Promise.all([
      this.carregarDados(),
      this.carregarComboRelatores(),
      this.carregarComboJurisdicionados(),
      this.carregarComboDatasDePublicacao(),
      this.carregarComboTiposDeDecisao(),
    ])
      .then(() => this.blockUI.stop())
      .catch(() => this.blockUI.stop());
  }
  private carregarDados(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterTodos()
        .subscribe(
          result => {
            this.dadosDoBanco = result;
            this.inicializar();
            this.tratarFinalizacaoDoCarregamentoDasAnimacoes();
            resolve();
          },
          error => reject(error)
        );
    });

    return promise;
  }
  private carregarComboRelatores(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterRelatores()
        .subscribe(
          result => {
            this.relatores = result;
            resolve();
          },
          error => reject(error)
        );
    });

    return promise;
  }
  private carregarComboJurisdicionados(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterJurisdicionados()
        .subscribe(
          result => {
            if (result) {
              this.jurisdicionados = result.filter(x => x != null);
            } else {
              this.jurisdicionados = [];
            }

            resolve();
          },
          error => reject(error)
        );
    });

    return promise;
  }
  private carregarComboDatasDePublicacao(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterDatasDePublicacao()
        .subscribe(
          result => {
            this.datasPublicacao = [];

            if (result) {
              for (let i = 0; i < result.length; i++) {
                let ano = result[i].substr(0, 4);
                let mes = result[i].substr(5, 2);
                let dia = result[i].substr(8, 2);

                this.datasPublicacao.push({
                  id: `${ano}-${mes}-${dia}`,
                  text: `${dia}/${mes}/${ano}`
                });
              }
            }

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

  private inicializar(): void {
    this.paginaAtual = 1;

    this.renderizarDados();
  }
  private renderizarDados(): void {
    this.cardDeckInitialized = false;

    this.aplicarFiltros();
    this.aplicarOrdenacao();
    this.aplicarPaginacao();

    setTimeout(() => {
      this.cardDeckInitialized = true;
    }, 1000);
  }
  private aplicarFiltros(): void {
    if (!this.dadosDoBanco || this.dadosDoBanco.length == 0) {
      return;
    }

    this.dadosFiltrados = this.dadosDoBanco.filter(x =>
      (!this.filtros.numero || x.numero == this.filtros.numero)
      && (!this.filtros.anoPublicacao || this.obterAno(x.publicacao) == Number(this.filtros.anoPublicacao))
      && (!this.filtros.ementa || x.ementaReduzida.toUpperCase().indexOf(this.filtros.ementa.toUpperCase()) >= 0)
      && (!this.filtros.processo || x.numeroDoProcesso == this.filtros.processo)
      && (!this.filtrosAvancados.relator || x.relator == this.filtrosAvancados.relator)
      && (!this.filtrosAvancados.jurisdicionado || x.jurisdicionado == this.filtrosAvancados.jurisdicionado)
      && (!this.filtrosAvancados.dataPublicacao || this.obterDataFormatadaParaComparar(x.publicacao) == this.filtrosAvancados.dataPublicacao)
      && (!this.filtrosAvancados.tipoDecisao || x.tipoDeDecisao == this.filtrosAvancados.tipoDecisao)
    );
  }
  private aplicarOrdenacao(): void {
    this.dadosFiltrados = _.orderBy(this.dadosFiltrados, x => x.numero, 'desc');
  }
  private aplicarPaginacao(): void {
    if (!this.dadosFiltrados) {
      return;
    }

    const indiceInicial = (this.paginaAtual - 1) * this.numeroItensPorPagina;
    const indiceFinal = this.paginaAtual * this.numeroItensPorPagina;

    this.dadosEmExibicao = this.dadosFiltrados.slice(indiceInicial, indiceFinal);

    if (this.paginator) {
      this.paginator.page = this.paginaAtual;
      this.paginator.totalItems = this.dadosFiltrados.length;
    }
  }
  private tratarFinalizacaoDoCarregamentoDasAnimacoes(): void {
    setTimeout(() => {
      this.animationsInitialized = true;
    }, 3000);
  }

  private obterDataFormatadaParaComparar(data: any): string {
    if (!data) {
      return '';
    }

    let ano = data.substr(0, 4);
    let mes = data.substr(5, 2);
    let dia = data.substr(8, 2);

    return `${ano}-${mes}-${dia}`;
  }
  private obterAno(data: Date): number {
    if (!data) {
      return 0;
    }

    data = new Date(data);
    return data.getFullYear();
  }

}
