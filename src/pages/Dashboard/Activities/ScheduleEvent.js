import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import useDaySchedule from '../../../hooks/api/useDaySchedule.js';

export default function ScheduleEvent({ schedule }) {
  const { scheduleDay } = useDaySchedule(schedule.schedule.dayId);
  console.log(scheduleDay);
  return(
    <ScheduleContainer>
        sdsadasa
    </ScheduleContainer>
  );
}

const ScheduleContainer = styled.div`
    background: red ;
`;
