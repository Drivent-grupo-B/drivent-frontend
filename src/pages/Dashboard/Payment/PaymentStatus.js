import CredCard from '../../../hooks/useCredCard';
import { toast } from 'react-toastify';
import usePaidTicket from '../../../hooks/api/usePaidTicket';
import { useState } from 'react';
import PaymentHead from '../../../components/Payment/PaymentHead';
export default function PaymentStatus({ ticket }) {
  const [cardComplete, setCardComplete] = useState('');
  const { paid } = usePaidTicket();
  
  async function envCard() { 
    delete cardComplete.acceptedCards;
      
    delete cardComplete.focused;
      
    const paymentBody = {
      ticketId: ticket.id,
      cardData: {
        issuer: cardComplete.issur,
        expirationDate: cardComplete.expiry,
        ...cardComplete
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
      <CredCard setCardComplete={setCardComplete} envCard={envCard} />   
    </>
  );
}
