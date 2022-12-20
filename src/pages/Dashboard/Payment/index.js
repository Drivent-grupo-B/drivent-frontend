import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import ForbiddenPage from '../../../components/Dashboard/ForbiddenPage';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import { FaCheckCircle } from 'react-icons/fa';
import CredCard from '../../../hooks/useCredCard';
import usePaidTicket from '../../../hooks/api/usePaidTicket';

import useTicketTypes from '../../../hooks/api/useTicketTypes.js';
import { toast } from 'react-toastify';
import EventTypes from './EventTypes';
import OptionBoxStyle from '../../../components/Payment/OptionBoxStyle';
import HotelsOptions from './HotelsOptions';
import TicketSummaryMessage from './TicketSummaryMessage';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const { ticket } = useTicket(); 

  const [selectedType, setSelectedType] = useState({});
  const [ticketTypeId, setTicketTypeId] = useState(0);

  function renderEventOrPayment() {
    return (
      !ticket ?
        <>
          <EventTypes
            ticketTypes={ticketTypes}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setTicketTypeId={setTicketTypeId}
          />
          {selectedType.name === 'Online' ? (
            <TicketSummaryMessage selectedOption={selectedType} ticketTypeId={ticketTypeId} />
          ) : (
            <HotelsOptions 
              ticketTypes={ticketTypes} 
              selectedType={selectedType}
              ticketTypeId={ticketTypeId}   
              setTicketTypeId={setTicketTypeId} 
            />
            
          )}
        </> :
        <PaymentStatusName ticket={ticket} />
    );
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {
        !enrollment || !ticketTypes ? 
          <ForbiddenPage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ForbiddenPage> : 
          renderEventOrPayment()
      }
    </>
  );
}

function PaymentStatusName({ ticket }) {
  const type = ticket.TicketType;

  function renderTicketOption() {
    if (type.isRemote) return 'Online';

    return type.includesHotel ? 'Presencial + Com Hotel' : 'Presencial sem Hotel';
  }

  return(
    <>
      <PaymentHead>
        Ingresso escolhido
      </PaymentHead>
      <PaymentStatusContainer>
        {
          type?
            <>
              <h2>
                { renderTicketOption() }
              </h2>  
              <h3>R$ {type.price / 100}</h3>
            </>
            :
            ''
        }
      </PaymentStatusContainer>
      <PaymentData ticket={ticket} />
    </>
  );
}

function PaymentData({ ticket }) {
  const [ newTicket, setNewTicket ] = useState({ ...ticket });
  
  return (
    <>
      {
        newTicket.status === 'PAID' ? <PaymentConfirmed /> : <PaymentStatus ticket={ { ...newTicket, setNewTicket } }  />
      }
    </>
  );
}

function PaymentConfirmed() {
  return (
    <PaymentContainer>
      <h2>Pagamento</h2>
      <ConfirmationMessage>
        <FaCheckCircle />
        <div>
          <h3>Pagamento confirmado!</h3>
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </div>
      </ConfirmationMessage>
    </PaymentContainer>
  );
}

function PaymentStatus({ ticket }) {
  const [cardComplete, setCardComplete] = useState('');
  const { paid } = usePaidTicket();

  async function envCard() { 
    delete cardComplete.acceptedCards;
    
    delete cardComplete.focused;
    
    const obj = {
      ticketId: ticket.id,
      cardData: {
        issuer: cardComplete.issur,
        expirationDate: cardComplete.expiry,
        ...cardComplete
      }
    };
    delete obj.cardData.expiry;

    try {
      await paid(obj);
      
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

const StyledTypography = styled(Typography)`
  margin-bottom: 27px !important;
`;

const PaymentContainer = styled.section`
  margin-top: 30px;
  h2 {
    font-size: 20px;
    color: #8e8e8e;
  }
`;

const ConfirmationMessage = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 17px;
  font-size: 16px;
  line-height: 19px;
  & > *:first-child {
    font-size: 40px;
    color: #36b853;
  }
  h3 {
    font-weight: 700;
  }
`;

const PaymentStatusContainer = styled(OptionBoxStyle)`
  width: 290px;
  height: 108px;
  background: #ffeed2;
  font-size: 16px;
  line-height: 19px;  
  h3 {
    margin-top: 15px;
    width: 100%;
    text-align: center;
    color: #898989;
  }
`;

const PaymentHead = styled.div`
  margin: 15px;
  width: 290px;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
