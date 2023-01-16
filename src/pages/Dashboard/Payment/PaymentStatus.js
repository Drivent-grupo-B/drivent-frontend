import CredCard from '../../../hooks/useCredCard';
import { toast } from 'react-toastify';
import usePaidTicket from '../../../hooks/api/usePaidTicket';
import PaymentHead from '../../../components/Payment/PaymentHead';
import paimentAPI from './paimentAPI';
import { useState } from 'react';

export default function PaymentStatus({ ticket }) {
  const { paid } = usePaidTicket();
  const [bottonVal, setBottonVal ] = useState(true);

  async function envCard({ card, setCard }) {
    setBottonVal(false);
    delete card.acceptedCards;
      
    delete card.focused;
      
    const paymentBody = {
      ticketId: ticket.id,
      cardData: {
        issuer: card.issur,
        expirationDate: card.expiry,
        ...card
      }
    };
    delete paymentBody.cardData.expiry;

    try {      
      const paiment_token = await paimentAPI(card);

      if(!paiment_token) return Error;

      paymentBody['paiment_token']=paiment_token;
      
      await paid(paymentBody);      
      
      toast('Parabéns seu ticket foi pago com sucesso'); 
      ticket.setNewTicket({ ...ticket, status: 'PAID' });
    } catch (error) {
      setBottonVal(true);
      setCard({ ...card });
      toast('Ocorreu um erro com o seu pagamento!'); 
    }
  };

  return(
    <>
      <PaymentHead>
        Pagamento
      </PaymentHead>
      <CredCard envCard={ envCard } bottonVal={ bottonVal } />   
    </>
  );
}
