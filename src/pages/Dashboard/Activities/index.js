import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket.js';
import DaysEvent from './DaysEvent';

function DescriptionChoice(ticket) {
  if( !ticket || ticket.status === 'RESERVED') {
    return(
      <CenterContainer>
        Você precisa ter confirmado pagamento antes 
        <br/>
        de fazer a escolha de atividade
      </CenterContainer>
    );
  }
  
  if( !ticket.ticketTypeId.isRemote ) {
    return(
      <CenterContainer>
        Você não precisa escolher as atividades
      </CenterContainer>
    );
  }
}

export default function Activities() {
  const { ticket } = useTicket();  

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <ActivitContainer>
        { !ticket ?
          DescriptionChoice(ticket)
          :
          <DaysEvent />
        }
      </ActivitContainer>
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

const ActivitContainer = styled.div`
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
