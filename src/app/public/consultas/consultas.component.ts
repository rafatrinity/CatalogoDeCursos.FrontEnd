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
import { promise } from 'protractor';

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



  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }
  eventos: any[];
  Eixos: any[];
  nome: any;
  turmas: Array<any>;
  tipoEvento: any;
  selected: string;
  noResult = false;
  cursos: any[];
  Metodologias: Array<any>;
  professores: Array<any>;
  publicos: Array<any>;
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
  professor: number;

  constructor(
    private alertService: AlertService,
    private consultasService: ConsultasService,
    private modalService: BsModalService,
    public ui: UiService
    ) {
    super(ui);
  }


  popar() {
    this.alertService.info('Info', '<p>Assunto: Impedimento temporário de inscrição em atividades de Capacitação</p><p>Uma vez confirmada sua inscrição, qualquer desistência de participação deverá ser comunicada à Escola por meio de Ofício, com antecedência mínima de 5 (cinco) dias úteis do início da atividade.</p>Por motivos alheios à sua vontade, caso não seja possível a comunicação citada acima, deverá ser enviado à Escola Ofício, justificando a impossibilidade de participação.</p></br><p>O não comparecimento, em desobediência às regras acima, implicará as seguintes determinações:</p></br><p>* Serão bloqueadas por 3 (três) meses as inscrições dos alunos com frequência < 75% (alunos reprovados por frequência);</p><p>* Os 3 (três) meses de bloqueio são contados a partir da data final do curso a que o aluno não compareceu;</p><p>* O bloqueio será efetivado no momento da inscrição.<p></br><p>A justificativa será recebida e passará por análise interna da Escola e, em quaisquer hipóteses, o aluno será comunicado da decisão final.</p>');
  }

  ngOnInit() {
    this.carregarTela();
  }

  Filtrar(): void {
    this.inicializar();
  }
  LimparFiltros(): void {
    this.professor = null;
    this.nome = '';
    this.tipoEvento = null;
    this.LimparFiltrosAvancados();
    this.inicializar();
  }
  LimparFiltrosAvancados(): void {
    this.filtrosAvancados = {};
  }

  inscrever(link: any): void {
    window.open(link, "_blank");
  }

  PageChanged(event: any): void {
    this.paginaAtual = event.page;
    this.renderizarDados();
  }

  VerDetalhes(curso: any): void {
    this.modalService.show(ConsultaDetalheModalComponent, {
      class: 'modal-xl',
      initialState: {
        curso: curso
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
      this.carregarComboEixos(),
      this.carregarComboProfessores(),
      this.carregarComboCursos(),
      this.carregarComboEventos(),
      this.carregarComboPublico(),
      this.carregarComboTurmas(),
      this.carregarComboMetodologia(),
      ])
    .then(() => this.blockUI.stop())
    .catch(() => this.blockUI.stop());
  }
  carregarComboEventos(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterEventos()
      .subscribe(
        result => {
          this.eventos = result;
          resolve();
        },
        error => reject(error)
        );
    });

    return promise;
  }

  private carregarComboCursos(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterCursos()
      .subscribe(
        result => {
          this.cursos = result;
          resolve();
        },
        error => reject(error)
        );
    });

    return promise;
  }

  private carregarComboTurmas(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterTurmas()
      .subscribe(
        result => {
          this.turmas = result;
          resolve();
        },
        error => reject(error)
        );
    });

    return promise;
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

  private carregarComboProfessores(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterProfessores()
      .subscribe(
        result => {
          this.professores = result;
          resolve();
        },
        error => reject(error)
        );
    });

    return promise;
  }

  private carregarComboPublico(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterPublico()
      .subscribe(
        result => {
          this.publicos = result;
          resolve();
        },
        error => reject(error)
        );
    });

    return promise;
  }

  private carregarComboMetodologia(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterMetodologia()
      .subscribe(
        result => {
          this.Metodologias = result;
          resolve();
        },
        error => reject(error)
        );
    });

    return promise;
  }

  private carregarComboEixos(): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      this.consultasService.ObterEixo()
      .subscribe(
        result => {
          this.Eixos = result;
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
    if (!this.cursos || this.cursos.length == 0) {
      return;
    }

    function compareProf(prof, turmas) {
      if (turmas)
        return turmas.filter(x => (prof == x.professor.id)).length > 0;
    }

    function comparePub(pub, turmas) {
      if (turmas) {
        for (let turma of turmas)
          return turma.publicoAlvo.filter(x => (pub == x.id)).length > 0;
      }
    }

    this.dadosFiltrados = this.cursos.filter(x =>
      (!this.nome || x.nome.toUpperCase().indexOf(this.nome.toUpperCase()) >= 0)
      && (!this.professor || compareProf(this.professor, x.turmas))
      && (!this.filtrosAvancados.publico || comparePub(this.filtrosAvancados.publico, x.turmas))
      && (!this.filtrosAvancados.evento || x.evento.id == this.filtrosAvancados.evento)
      && (!this.filtrosAvancados.metodologia || x.metodologia.id == this.filtrosAvancados.metodologia)
      && (!this.filtrosAvancados.Eixo || x.eixo.id == this.filtrosAvancados.Eixo)
      );


    console.log(this.dadosFiltrados);
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
