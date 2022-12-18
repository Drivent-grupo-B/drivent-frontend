import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import ForbiddenPage from '../../../components/Dashboard/ForbiddenPage';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import { FaCheckCircle } from 'react-icons/fa';
import CredCard from '../../../hooks/useCredCard';
import usePaidTicket from '../../../hooks/api/usePaidTicket';

import Button from '../../../components/Form/Button.js';
import useTicketTypes from '../../../hooks/api/useTicketTypes.js';
import useCreateTicket from '../../../hooks/api/useCreateTicket.js';
import { toast } from 'react-toastify';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const [selectedType, setSelectedType] = useState({});
  const [ticketTypeId, setTicketTypeId] = useState(0);

  const { ticket } = useTicket();

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

function EventTypes({ ticketTypes, selectedType, setSelectedType, setTicketTypeId }) {
  return (
    <TicketTypeContainer>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <div>
        {ticketTypes
          .filter((type) => !type.includesHotel)
          .map((type) => (
            <OptionBox
              type={type}
              key={type.id}
              setSelectedType={setSelectedType}
              selectedType={selectedType}
              setTicketTypeId={setTicketTypeId}
            />
          ))}
      </div>
    </TicketTypeContainer>
  );
}

function HotelsOptions({ ticketTypes, selectedType, setTicketTypeId, ticketTypeId }) {
  const [hotelType, setHotelType] = useState({});
  if (Object.keys(selectedType).length === 0) return '';

  return (
    <HotelOptionsContainer>
      <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
      <div>
        {ticketTypes
          .filter((type) => type.name === 'Presencial')
          .map((type) => (
            <IncludesHotelBox
              type={type}
              name={type.includesHotel ? 'Com Hotel' : 'Sem Hotel'}
              key={type.id}
              setTicketTypeId={setTicketTypeId}
              hotelType={hotelType}
              setHotelType={setHotelType}
            />
          ))}
      </div>
      {hotelType.name ? (
        <TicketSummaryMessage selectedOption={hotelType} ticketTypeId={ticketTypeId} />
      ) : (
        ''            
      )}
    </HotelOptionsContainer>
  );
}

function OptionBox({ type, setSelectedType, setTicketTypeId, selectedType }) {
  function handleOption() {
    setSelectedType({ name: type.name, price: type.price });
    setTicketTypeId(type.id);
  }

  return (
    <OptionBoxStyle selectedType={selectedType.name ? selectedType.name : ''} name={type.name} onClick={handleOption}>
      <h3>{type.name}</h3>
      <span>R$ {type.price / 100}</span>
    </OptionBoxStyle>
  );
}

function IncludesHotelBox({ type, name, setTicketTypeId, setHotelType, hotelType }) {
  function handleHotelOption() {
    setTicketTypeId(type.id);
    setHotelType({ name, price: type.price });
  }

  return (
    <HotelBoxStyle hotelType={hotelType.name ? hotelType.name : ''} name={name} onClick={handleHotelOption}>
      <h3>{name}</h3>
      <span>+ R$ {type.price / 100 - 250}</span>
    </HotelBoxStyle>
  );
}

function TicketSummaryMessage({ selectedOption, ticketTypeId }) {
  const { postCreatedTicket } = useCreateTicket();
  const formattedPrice = (selectedOption.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  async function reserveTicket() {
    try {
      postCreatedTicket({ ticketTypeId });
      toast('Ticket reservado com sucesso!');
    } catch (error) {
      toast('Não foi possível reservar seu ticket!');
    }
  }

  return (
    <Summary>
      <h2>
        Fechado! O total ficou em <strong>{formattedPrice}</strong>. Agora é só confirmar:
      </h2>
      <Button onClick={reserveTicket}>Reservar Ingresso</Button>
    </Summary>
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
  return (
    <>
      {
        ticket.status === 'PAID' ? <PaymentConfirmed /> : <PaymentStatus ticket={ticket}  /> // TODO: Add Card data insertion display here
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
  const { ticketTypes } = useTicketTypes();

  const type = !ticketTypes? '' : ticketTypes.find((value) => 
    (ticket.ticketTypeId === value.id)
  );

  async function envCard() { 
    delete cardComplete.acceptedCards;
    
    delete cardComplete.focused;
    
    const obj = {
      ticketId: type.id,
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
    } catch (error) {
      envCard();
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

const TicketTypeContainer = styled.section`
  h2 {
    font-size: 20px;
    color: #8e8e8e;
  }
  > div {
    display: flex;
    gap: 24px;
    margin-top: 17px;
  }
`;

const HotelOptionsContainer = styled(TicketTypeContainer)`
  margin-top: 44px;
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

const OptionBoxStyle = styled.div`
  width: 145px;
  height: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: ${(props) => (props.name === props.selectedType ? 'none' : '1px solid #cecece')};
  border-radius: 20px;
  background-color: ${(props) => (props.name === props.selectedType ? '#FFEED2' : '#ffffff')};
  transition: none;
  h3 {
    font-size: 16px;
    color: #454545;
  }
  span {
    font-size: 14px;
    color: #898989;
  }
  &:hover {
    cursor: pointer;
    filter: brightness(0.96);
  }
`;

const HotelBoxStyle = styled(OptionBoxStyle)`
  border: ${(props) => (props.name === props.hotelType ? 'none' : '1px solid #cecece')};
  background-color: ${(props) => (props.name === props.hotelType ? '#FFEED2' : '#ffffff')};
`;

const Summary = styled.footer`
  margin-top: 44px;

  h2 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 10px;
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
