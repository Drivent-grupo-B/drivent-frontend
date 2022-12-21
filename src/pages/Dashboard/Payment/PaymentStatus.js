import CredCard from '../../../hooks/useCredCard';
import { toast } from 'react-toastify';
import usePaidTicket from '../../../hooks/api/usePaidTicket';
import { useState } from 'react';
import PaymentHead from '../../../components/Payment/PaymentHead';

export default function PaymentStatus({ ticket }) {
  const [cardComplete, setCardComplete] = useState('');
  const { paid } = usePaidTicket();
  
  async function envCard(card) { 
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
      await paid(paymentBody);
        
      toast('Parabéns seu ticket foi pago com sucesso'); 
      ticket.setNewTicket({ ...ticket, status: 'PAID' });
    } catch (error) {
      toast('Ocorreu um erro com o seu pagamento!'); 
    }
  };
  
  return(
    <>
      <PaymentHead>
        Pagamento
      </PaymentHead>
      <CredCard cardComplete={ cardComplete } setCardComplete={setCardComplete} envCard={envCard} />   
    </>
  );
}
