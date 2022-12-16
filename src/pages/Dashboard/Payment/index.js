import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function Payment() {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <EventTypeContainer>
        <h2>Primeiro, escolha sua modalidade de ingresso</h2>
        <div>
          <PaymentOption>
            <h3>Presencial</h3>
            <span>R$ 250</span>
          </PaymentOption>
          <PaymentOption>
            <h3>Online</h3>
            <span>R$ 100</span>
          </PaymentOption>
        </div>
      </EventTypeContainer>
    </>
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
`;
