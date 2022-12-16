import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket.js';

export default function Hotel() {
  const { ticket } = useTicket();

  return(
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>        
      <HotelContainer>
        {
          !ticket || ticket?.status !== 'PAID' ?
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
              ''
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
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;
