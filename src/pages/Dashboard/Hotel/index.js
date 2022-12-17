import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket.js';
import Hotels from './Hotels.js';

export default function Hotel() {
  const { ticket } = useTicket();

  return(
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>        
      <HotelContainer>
        {
          !ticket || ticket?.status === 'RESERVED' ?
            <h2>
             Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem
            </h2>
            :
            ticket?.ticketTypeId !== 2 ?
              <h2>
            Sua modalidade de ingresso não inclui hospedagem 
            Prossiga para a escolha de atividades
              </h2>
              :
              <Hotels />
        }
      </HotelContainer>     
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 27px !important;
`;

const HotelContainer = styled.div`
  margin-top: 243px;
  margin-left: 244px;
  width: 411px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;
