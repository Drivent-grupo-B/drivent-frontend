import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ForbiddenPage from '../../../components/Dashboard/ForbiddenPage';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import { FaCheckCircle } from 'react-icons/fa';

import useTicketTypes from '../../../hooks/api/useTicketTypes.js';

import EventTypes from './EventTypes';
import HotelsOptions from './HotelsOptions';
import TicketSummaryMessage from './TicketSummaryMessage';
import PaymentStatus from './PaymentStatus';
import PaymentHead from '../../../components/Payment/PaymentHead';
import PaymentStatusContainer from '../../../components/Payment/PaymentStatusContainer';
import ConfirmationMessage from '../../../components/Payment/ConfirmationMessage';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const { ticket } = useTicket();
  const [isReserved, setIsReserved] = useState(false);

  const [selectedType, setSelectedType] = useState({});
  const [ticketTypeId, setTicketTypeId] = useState(0);

  function renderEventOrPayment() {
    return (
      !ticket && !isReserved ?
        <>
          <EventTypes
            ticketTypes={ticketTypes}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setTicketTypeId={setTicketTypeId}
          />
          {selectedType.name === 'Online' ? (
            <TicketSummaryMessage selectedOption={selectedType} ticketTypeId={ticketTypeId} setIsReserved={setIsReserved}/>
          ) : (
            <HotelsOptions 
              ticketTypes={ticketTypes} 
              selectedType={selectedType}
              ticketTypeId={ticketTypeId}   
              setTicketTypeId={setTicketTypeId} 
              setIsReserved={setIsReserved}
            />
            
          )}
        </> :
        <PaymentStatusName />
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

function PaymentStatusName() {
  const { ticket } = useTicket();
  const type = ticket?.TicketType;

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
  const [newTicket, setNewTicket] = useState({ ...ticket });

  useEffect(() => {
    if (ticket) {
      setNewTicket({ ...ticket });
    }
  }, [ticket]);
  
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
