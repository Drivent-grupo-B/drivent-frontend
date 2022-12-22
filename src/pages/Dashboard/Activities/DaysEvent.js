import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import useActivitiesDays from '../../../hooks/api/useActivitiesDays';

function OneDay(day) {
  const [ color, setColor ] = useState(true);

  function choiceSelect() {
    if(day.day.schedule) return;
    setColor(!color);
    day.day.setSchedule({ dayId: day.day.id });
  }
  return(
    <DayContainer color={color} onClick={ choiceSelect }>{day.children}</DayContainer>
  );
}

function MapDays(days) {
  if(!days.days) return [];

  return days.days.map((day, index) => {
    const dayFormat = new Date(day.Day)
      .toLocaleDateString('pt-Br', { weekday: 'long',  month: '2-digit', day: 'numeric' })
      .replace(/-feira,/g, ' ');

    return (
      <OneDay key={ index } day={{ id: day.id, setSchedule: days.setSchedule, schedule: days.schedule }} >
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
        { MapDays( { days, setSchedule: schedule.setSchedule, schedule: schedule.schedule } ) }
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
    background: ${props => props.color ? '#E0E0E0': '#FFD37D' };
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: flex ;
    align-items: center ;
    justify-content: center ;
`;
