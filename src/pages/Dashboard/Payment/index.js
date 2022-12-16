import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import ForbiddenPage from '../../../components/Dashboard/ForbiddenPage.js';
import useEnrollment from '../../../hooks/api/useEnrollment.js';
import useTicket from '../../../hooks/api/useTicket.js';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../../../components/Form/Button.js';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [ticketType, setTicketType] = useState({});

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!enrollment ? (
        <ForbiddenPage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ForbiddenPage>
      ) : (
        <>
          <EventTypes ticketType={ticketType} setTicketType={setTicketType} />
          {ticketType.isRemote ? <TicketSummaryMessage ticketType={ticketType} /> : 'Presencial'}
        </>
      )}
    </>
  );
}

function EventTypes({ ticketType, setTicketType }) {
  function handleOption(type) {
    setTicketType({
      name: type,
      price: type === 'Online' ? 10000 : 25000,
      isRemote: type === 'Online' ? true : false,
      includesHotel: false,
    });
  }

  return (
    <TicketTypeContainer type={ticketType}>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <div>
        <OptionBoxStyle onClick={() => handleOption('Presencial')}>
          <h3>Presencial</h3>
          <span>R$ 250</span>
        </OptionBoxStyle>
        <OptionBoxStyle onClick={() => handleOption('Online')}>
          <h3>Online</h3>
          <span>R$ 100</span>
        </OptionBoxStyle>
      </div>
    </TicketTypeContainer>
  );
}

function TicketSummaryMessage({ ticketType }) {
  const formattedPrice = (ticketType.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  return (
    <Summary>
      <h2>
        Fechado! O total ficou em <strong>{formattedPrice}</strong>. Agora é só confirmar:
      </h2>
      <Button type="submit">Reservar Ingresso</Button>
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

    > div:nth-of-type(1) {
      background-color: ${(props) => (props.type.isRemote ? '#ffffff' : '#FFEED2')};
    }

    > div:nth-of-type(2) {
      background-color: ${(props) => (props.type.isRemote ? '#FFEED2' : '#ffffff')};
    }
  }
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
  border: 1px solid #cecece;
  border-radius: 20px;

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

const Summary = styled.footer`
  margin-top: 44px;

  h2 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 10px;
  }
`;
