import { GerencianetCartao } from 'gerencianet-cartao-ts';

class MinhaClasse {
  async recuperaPaymentToken(card) {
    const payee_code = process.env.REACT_APP_USER_IDENTFIER;
    const is_producao = false;
    const sdkGn = await GerencianetCartao.instance(payee_code, is_producao);
  
    const retorno = await sdkGn.getPaymentToken({
      brand: card.brand,                       // bandeira do cartão
      number: card.number,                     // número do cartão
      cvv: card.cvv,                           // código de segurança
      expiration_month: card.expiration_month, // mês de vencimento
      expiration_year: card.expiration_year,   // ano de vencimento
    });
    return retorno.payment_token;    
  }
}

export default async function paimentAPI(card) {
  const minhaClasse = new MinhaClasse();
  card['brand'] = card.issuer.toLowerCase();
  card['expiration_month'] = card.expiry.slice(0, 2);
  card['expiration_year'] = '20'+card.expiry.slice(2, 4);
  
  delete card.expiry;
  delete card.issuer;

  const payment_token = await minhaClasse.recuperaPaymentToken(card);
 
  return payment_token;
}
