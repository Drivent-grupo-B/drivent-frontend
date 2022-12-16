import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import ForbiddenPage from '../../../components/Dashboard/ForbiddenPage.js';
import useEnrollment from '../../../hooks/api/useEnrollment.js';
import useTicket from '../../../hooks/api/useTicket.js';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../../../components/Form/Button.js';
import useTicketTypes from '../../../hooks/api/useTicketTypes.js';
import useCreateTicket from '../../../hooks/api/useCreateTicket.js';
import { toast } from 'react-toastify';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const [selectedType, setSelectedType] = useState('');
  const [ticketTypeId, setTicketTypeId] = useState(0);

  const { ticket } = useTicket();

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!enrollment || !ticketTypes ? (
        <ForbiddenPage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ForbiddenPage>
      ) : !ticket ? (
        <>
          <EventTypes
            ticketTypes={ticketTypes}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setTicketTypeId={setTicketTypeId}
          />
          {selectedType === 'Online' ? (
            <TicketSummaryMessage ticketTypes={ticketTypes} ticketTypeId={ticketTypeId} />
          ) : (
            <HotelsOptions ticketTypes={ticketTypes} selectedType={selectedType} setTicketTypeId={setTicketTypeId} />
          )}
        </>
      ) : (
        <PaimentStatus ticket={ticket} ticketTypes={ticketTypes} />
      )}
    </>
  );
}

function EventTypes({ ticketTypes, selectedType, setSelectedType, setTicketTypeId }) {
  return (
    <TicketTypeContainer type={selectedType}>
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

function HotelsOptions({ ticketTypes, selectedType, setTicketTypeId }) {
  const [hotelType, setHotelType] = useState('');
  if (selectedType === '') return '';

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
    </HotelOptionsContainer>
  );
}

function OptionBox({ type, setSelectedType, setTicketTypeId, selectedType }) {
  function handleOption() {
    setSelectedType(type.name);
    setTicketTypeId(type.id);
  }

  return (
    <OptionBoxStyle selectedType={selectedType} name={type.name} onClick={handleOption}>
      <h3>{type.name}</h3>
      <span>R$ {type.price / 100}</span>
    </OptionBoxStyle>
  );
}

function IncludesHotelBox({ type, name, setTicketTypeId, setHotelType, hotelType }) {
  function handleHotelOption() {
    setTicketTypeId(type.id);
    setHotelType(name);
  }

  return (
    <HotelBoxStyle hotelType={hotelType} name={name} onClick={handleHotelOption}>
      <h3>{name}</h3>
      <span>+ R$ {type.price / 100 - 250}</span>
    </HotelBoxStyle>
  );
}

function TicketSummaryMessage({ ticketTypes, ticketTypeId }) {
  const { postCreatedTicket } = useCreateTicket();
  const formattedPrice = (ticketTypes[2].price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

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

function PaymentData({ ticket }) {
  return (
    <>
      {
        ticket.status === 'PAID' ? <PaymentConfirmed /> : <></> // TODO: Add Card data insertion display here
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

function PaimentStatus({ ticket, ticketTypes }) {
  const type = !ticketTypes
    ? ''
    : ticketTypes.find((value) => {
      if (ticket.ticketTypeId === value.id) return value;
    });

  return (
    <>
      <PaimentHead>Ingresso escolhido</PaimentHead>
      <PaimentStatusContainer>
        {type ? (
          type.isRemote ? (
            <h2>
              Online
              <h3>R$ {type.price}</h3>
            </h2>
          ) : (
            <h2>
              {type.includesHotel ? 'Presencial + Com Hotel' : 'Presencial sem Hotel'}
              <h3>R$ {type.price}</h3>
            </h2>
          )
        ) : (
          ''
        )}
      </PaimentStatusContainer>
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
const PaimentStatusContainer = styled(OptionBoxStyle)`
  width: 290px;
  height: 108px;
  background: #ffeed2;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  section {
  }
  h3 {
    margin-top: 15px;
    width: 100%;
    text-align: center;
    color: #898989;
  }
`;
const PaimentHead = styled.div`
  margin: 15px;
  width: 290px;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
