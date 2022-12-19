import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket.js';
import Hotels from './Hotels.js';
import Rooms from './Rooms.js';

export default function Hotel() {
  const { ticket } = useTicket();

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <HotelContainer>
        {!ticket || ticket?.status === 'RESERVED' ? (
          <h2>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</h2>
        ) : ticket?.TicketType.isRemote || !ticket?.TicketType.includesHotel ? (
          <h2>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</h2>
        ) : (
          <>
            <Hotels />
            <Rooms />
          </>
        )}
      </HotelContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 27px !important;
`;

const HotelContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
