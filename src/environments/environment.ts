// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // webApiBaseUrl: 'http://localhost:50945/api/',
  webApiBaseUrl: 'http://desenvolvimentodotcore.tce.rj.gov.br/cadastro-publicacoes-webapi/api/',
  servicoImagensApiBaseUrl: 'http://desenvolvimento.tce.rj.gov.br/servico-imagem-servidor/api/',
  scapApiBaseUrl: 'http://desenvolvimentodotcore.tce.rj.gov.br/scap-webapi/api/',
  scapApiBaseUrl2: 'http://homologacaodotcore.tce.rj.gov.br/scap-web-angular-webapi/api/',
  grupoAdAdminDeliberacoes: 'TCERJ\\GrupoGerenciarConsultaDeliberacoes',
  grupoAdAdminConsultas: 'TCERJ\\GrupoGerenciarRegistrodeConsulta',
  grupoAdAdminAtosNormativos: 'TCERJ\\GrupoGerenciarConsultaDeliberacoes',
  grupoAdAdminSumulas: 'TCERJ\\GrupoGerenciarCadastroSumulasJurisprudencia',
  grupoAdAdminContratos: 'TCERJ\\GrupoGerenciarContratos',
  grupoAdAdminResolucoes: 'TCERJ\\GrupoGerenciarConsultaDeliberacoes',
};
