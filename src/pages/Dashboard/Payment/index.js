import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import ForbiddenPage from '../../../components/Dashboard/ForbiddenPage.js';
import useEnrollment from '../../../hooks/api/useEnrollment.js';

export default function Payment() {
  const { enrollment } = useEnrollment();

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!enrollment ? (
        <ForbiddenPage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ForbiddenPage>
      ) : (
        <EventTypes />
      )}
    </>
  );
}

function EventTypes() {
  const [ticketType, setTicketType] = useState({});

  function handleOption(type) {
    setTicketType({
      name: type,
      price: type === 'Online' ? 10000 : 25000,
      isRemote: type === 'Online' ? true : false,
      includesHotel: false,
    });
  }

  return (
    <EventTypeContainer type={ticketType}>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <div>
        <PaymentOption onClick={() => handleOption('Presencial')}>
          <h3>Presencial</h3>
          <span>R$ 250</span>
        </PaymentOption>
        <PaymentOption onClick={() => handleOption('Online')}>
          <h3>Online</h3>
          <span>R$ 100</span>
        </PaymentOption>
      </div>
    </EventTypeContainer>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 27px !important;
`;

const EventTypeContainer = styled.section`
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

const PaymentOption = styled.div`
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
