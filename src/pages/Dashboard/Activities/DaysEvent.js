import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import useActivities from '../../../hooks/api/useActivities';
import useActivitiesDays from '../../../hooks/api/useActivitiesDays';

function OneDay(day) {
  const isColored = day.day.id !== day.day.coloredDay;
  const { activities } = useActivities(day.day.id);

  function choiceSelect() {
    day.day.setSchedule({ dayId: day.day.id, activities });
    day.day.setColoredDay(day.day.id);
  }

  return(
    <DayContainer colored={isColored} onClick={ choiceSelect }>{day.children}</DayContainer>
  );
}

function MapDays(days) {
  const [ coloredDay, setColoredDay ] = useState(-1);
  if(!days.days) return [];

  return days.days.map((day, index) => {
    const dayFormatAux = new Date(day.Day)
      .toLocaleDateString('pt-Br', { weekday: 'long',  month: '2-digit', day: 'numeric' })
      .replace(/-feira/g, '');
    
    const dayFormat = dayFormatAux[0].toUpperCase() + dayFormatAux.substring(1);

    return (
      <OneDay key={ index } day={{ id: day.id, setSchedule: days.setSchedule, key: index, coloredDay, setColoredDay }} >
        { dayFormat }
      </OneDay>
    );
  }
  );
}

export default function DaysEvent({ schedule }) {
  const { days } = useActivitiesDays();

  return (
    <>
      <StyledTypography>
          Primeiro, filtre pelo dia do evento:
      </StyledTypography>
      <AllDay>
        { MapDays( { days, setSchedule: schedule.setSchedule } ) }
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
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color:  #000000 ;
    margin: 0px 15px 15px 0px ;
    width: 150px;
    height: 37px;
    background: ${props => props.colored ? '#E0E0E0': '#FFD37D' };
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: flex ;
    align-items: center ;
    justify-content: center ;
    

    &:hover{
      cursor: pointer;
      filter: brightness(0.95);
    }
`;
