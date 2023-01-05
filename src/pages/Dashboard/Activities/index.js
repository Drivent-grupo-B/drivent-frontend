import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket.js';
import DaysEvent from './DaysEvent';
import ScheduleEvent from './ScheduleEvent';

function DescriptionChoice( ticket ) {
  if( !ticket || ticket.status === 'RESERVED') {
    return(
      <CenterContainer>
        Você precisa ter confirmado pagamento antes 
        <br/>
        de fazer a escolha de atividade
      </CenterContainer>
    );
  }
  
  if( ticket.TicketType.isRemote ) {
    return(
      <CenterContainer>
        Você não precisa escolher as atividades
      </CenterContainer>
    );
  }
}

export default function Activities() {
  const [ schedule, setSchedule ] = useState();
  const { ticket } = useTicket();  

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <ActivitContainer>
        { 
          !ticket || ticket?.status === 'RESERVED' || ticket?.TicketType.isRemote  ?
            DescriptionChoice(ticket)
            :
            <DaysEvent schedule={{ schedule, setSchedule }}/>
        }
      </ActivitContainer>
      { 
        schedule ? 
          <ScheduleEvent activities={schedule.activities} dayId={schedule.dayId} />  
          : 
          '' 
      }

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
