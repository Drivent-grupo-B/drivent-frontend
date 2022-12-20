import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket.js';
import Hotels from './Hotels.js';
import Rooms from './Rooms.js';
import ForbiddenPage from '../../../components/Dashboard/ForbiddenPage';

export default function Hotel() {
  const { ticket } = useTicket();

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <HotelContainer>
        {!ticket || ticket?.status === 'RESERVED' ? (
          <ForbiddenPage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</ForbiddenPage>
        ) : ticket?.TicketType.isRemote || !ticket?.TicketType.includesHotel ? (
          <ForbiddenPage>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</ForbiddenPage>
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
  height: 80%;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
