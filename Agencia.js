const { info } = require("console");

console.log("Bem vindo a Agência AVA");

const fs = require('fs');

const influencers = [{
    nome: 'Natália',
    cpf: '96491523004',
    celular: '991313484',
    quantidadeSeguidores: 3000,
    nichos: ['gastronomia', 'esporte'],
    cache: 400,
},{
    nome: 'Julia',
    cpf: '19957097008',
    celular: '991410484',
    quantidadeSeguidores: 500,
    nichos: ['esporte', 'lifestyle'],
    cache: 100,
},{
    nome: 'Jessica',
    cpf: '76218757048',
    celular: '9912220484',
    quantidadeSeguidores: 35000,
    nichos: ['tecnologia', 'lifestyle'],
    cache: 10000,
}];

const dadosJSON = JSON.stringify(influencers)

const informacoesInfluencers = 'informacoes.json';

fs.writeFile(informacoesInfluencers,dadosJSON,(err)=> {
    if(err) { console.error('Ocoreu um erro na gravação', err);
    return;
}
    console.log("Arquivo json criado");
})

console.log("Iniciando sistema de captação de influencer para campanha Nike:");

const campanha = {nomeCampanha: 'Nike', valorCache: 3000, quantidadeMinimaSeguidores: 1000, nichoObrigatorio: 'esporte'};

function validarQuantidadeMinimaSeguidores(seguidor) {
  return seguidor.quantidadeSeguidores >= campanha.quantidadeMinimaSeguidores;
}

function validarCache(seguidor) {
  return seguidor.cache <= campanha.valorCache;
}

function validarNicho(nicho) {
  return nicho === campanha.nichoObrigatorio;
}

function validarTodosNichos(seguidor) {
  return  seguidor.nichos.map(validarNicho).includes(true);
}

function validarInfluencer(campanha, influencers) {
    
    // validação quantidade minima seguidores
    const influencersComSeguidoresApto = influencers.filter(validarQuantidadeMinimaSeguidores);
    
    // validação cache
    const influencersComCacheApto = influencersComSeguidoresApto.filter(validarCache);
    
    // validação nicho
    const influencersAptos = influencersComCacheApto.filter(validarTodosNichos);
    
    return influencersAptos;
}


console.log('Influencers aptos:');
console.log(validarInfluencer(campanha, influencers));