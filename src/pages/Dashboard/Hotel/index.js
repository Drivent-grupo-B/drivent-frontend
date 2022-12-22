import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket.js';
import Hotels from './Hotels.js';
import Rooms from './Rooms.js';

export default function Hotel() {
  const { ticket } = useTicket();
  const [isClicked, setIsClicked] = useState(false);
  const [newBooking, setNewBooking] = useState(null);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <HotelContainer>
        {
          !ticket || ticket?.status === 'RESERVED' ?
            <CenterContainer>
              Você precisa ter confirmado pagamento antes <br />de fazer a escolha de hospedagem
            </CenterContainer>
            :
            (ticket?.TicketType.isRemote || !ticket?.TicketType.includesHotel) ?
              <CenterContainer>
                <p>Sua modalidade de ingresso não inclui hospedagem</p>
                <p>Prossiga para a escolha de atividades</p>
              </CenterContainer>
              :
              <>
                <Hotels isClicked={isClicked} setIsClicked={setIsClicked} newBooking={newBooking}/>
                <Rooms setIsClicked={setIsClicked} isClicked={isClicked} setNewBooking={setNewBooking}/>
              </>
        }
      </HotelContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 27px !important;
`;

const CenterContainer = styled.div`
  margin-top: 25% ;
  text-align: center ;
`;

const HotelContainer = styled.div`
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
