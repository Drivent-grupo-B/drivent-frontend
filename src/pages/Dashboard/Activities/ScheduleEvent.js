import styled from 'styled-components';
import useDaySchedule from '../../../hooks/api/useDaySchedule.js';

export default function ScheduleEvent({ schedule }) {
  const { scheduleDay } = useDaySchedule(schedule.schedule.dayId);
  return(
    <ScheduleContainer>
      {`dia ${schedule.schedule.dayId}`}
    </ScheduleContainer>
  );
}

const ScheduleContainer = styled.div`
    background: red ;
`;
