const numAleatorio = (max: number) => {
  return Math.floor(Math.random() * max)
}

const alfanumeros = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']

const logradouros = [
  'Rua ',
  'Avenida ',
  'Travessa ',
  'Beco ',
  'Boulevard ',
  'Conjunto ',
  'Quadra ',
  'Parque ',
  'Chácara ',
  'Vila ',
]

const regioesAdministrativasDF = [
  'Brasília',
  'Gama',
  'Taguatinga',
  'Brazlândia',
  'Sobradinho',
  'Planaltina',
  'Paranoá',
  'Núcleo Bandeirante',
  'Ceilândia',
  'Guará',
  'Cruzeiro',
  'Samambaia',
  'Santa Maria',
  'São Sebastião',
  'Recanto das Emas',
  'Lago Sul',
  'Riacho Fundo',
  'Lago Norte',
  'Candangolândia',
  'Águas Claras',
  'Riacho Fundo II',
  'Sudoeste/Octogonal',
  'Varjão',
  'Park Way',
  'SCIA/Estrutural',
  'Sobradinho II',
  'Jardim Botânico',
  'Itapoã',
  'SIA',
  'Vicente Pires',
  'Fercal',
  'Sol Nascente/Pôr do Sol',
  'Arniqueira',
]

const complementos = ['Apartamento', 'Casa', 'Bloco', 'Lote', 'Quadra', 'Loja', null]

export const logradouro = () => {
  return (
    logradouros[numAleatorio(logradouros.length)] +
    alfanumeros[numAleatorio(alfanumeros.length)] +
    alfanumeros[numAleatorio(alfanumeros.length)]
  ).toUpperCase()
}

export const regiaoAdministrativaDF = () => {
  return regioesAdministrativasDF[numAleatorio(regioesAdministrativasDF.length)].toUpperCase()
}

export const complemento = () => {
  const compl = complementos[numAleatorio(complementos.length)]
  if (compl === null) return compl
  return compl.toUpperCase()
}

export const numero = () => {
  return numAleatorio(999).toString().padStart(3, '0')
}

export const CEP = () => {
  return `${numAleatorio(10000) + 70000}-${numAleatorio(1000).toString().padStart(3, '0')}`
}
