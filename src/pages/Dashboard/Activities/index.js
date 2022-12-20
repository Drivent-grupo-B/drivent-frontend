import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket.js';

function DescriptionChoice(ticket) {
  if( !ticket.ticketTypeId.isRemote ) {
    return(
      <>
        Você não precisa escolher as atividades
      </>
    );
  }
  return(
    <>
      Você precisa ter confirmado pagamento antes 
      <br/>
      de fazer a escolha de atividade
    </>
  );
}

export default function Activities() {
  const { ticket } = useTicket();  

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <ActivitContainer>
        { ticket && ticket.status === 'RESERVED' ?
          <CenterContainer>
            {DescriptionChoice(ticket)}
          </CenterContainer>
          :
          'ola'
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
