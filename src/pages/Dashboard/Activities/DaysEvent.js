import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useActivitiesDays from '../../../hooks/api/useActivitiesDays';

function MapDays(days) {
  return days.map((day) => {
    return (
      <DayContainer>
        {new Date(day.Day).toLocaleDateString('pt-Br').slice(0, 5) }
      </DayContainer>
    );
  }
  );
}

export default function DaysEvent() {
  const { days } = useActivitiesDays();
  console.log(days);
  return (
    <>
      <StyledTypography>
          Primeiro, filtre pelo dia do evento:
      </StyledTypography>
      <AllDay>
        {days ? MapDays(days) : ''}
      </AllDay>
    </>
  );
}

const StyledTypography = styled(Typography)`
    margin-bottom: 27px !important;
`;

const AllDay = styled.div`
    display: flex ;
    flex-wrap: wrap;
`;

const DayContainer = styled.div`
    margin: 0px 15px 0px 0px ;
    width: 131px;
    height: 37px;
    background: #E0E0E0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: flex ;
    align-items: center ;
    justify-content: center ;
`;
