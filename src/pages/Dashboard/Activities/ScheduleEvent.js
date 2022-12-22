import styled from 'styled-components';
import useDaySchedule from '../../../hooks/api/useDaySchedule.js';
import { FaDoorOpen } from 'react-icons/fa';

export default function ScheduleEvent({ schedule }) {
  const { scheduleDay } = useDaySchedule(schedule.schedule.dayId);
  console.log(scheduleDay);
  return(
    <ScheduleContainer>
      <div>
        <h2>Auditório Principal</h2>
        <ActivitiesContainer>
          <Activity height={1}>
            <div className='activity-details'>
              <b>Minecraft: Montando o PC ideal</b>
              <p>09:00 - 10:00</p>
            </div>
            <div className='activity-occupancy'>
              <FaDoorOpen />
              <p>27 vagas</p>
            </div>
          </Activity>
          <Activity height={1}>
            <div className='activity-details'>
              <b>Minecraft: Montando o PC ideal</b>
              <p>09:00 - 10:00</p>
            </div>
            <div className='activity-occupancy'>
              <FaDoorOpen />
              <p>27 vagas</p>
            </div>
          </Activity>
        </ActivitiesContainer>
      </div>
      <div>
        <h2>Auditório Lateral</h2>
        <ActivitiesContainer>
          <Activity height={1}>
            <div className='activity-details'>
              <b>Minecraft: Montando o PC ideal</b>
              <p>09:00 - 10:00</p>
            </div>
            <div className='activity-occupancy'>
              <FaDoorOpen />
              <p>27 vagas</p>
            </div>
          </Activity>
          <Activity height={1}>
            <div className='activity-details'>
              <b>Minecraft: Montando o PC ideal</b>
              <p>09:00 - 10:00</p>
            </div>
            <div className='activity-occupancy'>
              <FaDoorOpen />
              <p>27 vagas</p>
            </div>
          </Activity>
        </ActivitiesContainer>
      </div>
      <div>
        <h2>Sala de Workshop</h2>
        <ActivitiesContainer>
          <Activity height={1}>
            <div className='activity-details'>
              <b>Minecraft: Montando o PC ideal</b>
              <p>09:00 - 10:00</p>
            </div>
            <div className='activity-occupancy'>
              <FaDoorOpen />
              <p>27 vagas</p>
            </div>
          </Activity>
          <Activity height={2} full={false}>
            <div className='activity-details'>
              <b>Minecraft: Montando o PC ideal</b>
              <p>09:00 - 10:00</p>
            </div>
            <div className='activity-occupancy'>
              <FaDoorOpen />
              <p>27 vagas</p>
            </div>
          </Activity>
          <Activity height={3} full={true}>
            <div className='activity-details'>
              <b>Minecraft: Montando o PC ideal</b>
              <p>09:00 - 10:00</p>
            </div>
            <div className='activity-occupancy'>
              <FaDoorOpen />
              <p>Esgotado</p>
            </div>
          </Activity>
        </ActivitiesContainer>
      </div>
    </ScheduleContainer>
  );
}

const ScheduleContainer = styled.section`
  margin-top: 45px;
  display: flex;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > div h2 {
    font-size: 17px;
    margin-bottom: 13px;
    color: #7B7B7B;
  }
`;

const ActivitiesContainer = styled.div`
  width: 100%;
  height: 350px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #D7D7D7;
  overflow: scroll;
  
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Activity = styled.div`
  width: 100%;
  height: ${props => props.height*80}px;
  padding: 12px 10px;
  margin-bottom: 10px;
  background-color: #F1F1F1;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  text-align: center;

  .activity-details {
    width: 80%;
    height: 100%;
    padding-right: 10px;
    font-size: 12px;
    color: #343434;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: start;
    border-right: 1px solid #CFCFCF;
  }

  .activity-details b {
    margin-bottom: 6px;
    font-weight: 700;
  }

  .acticity-occupancy {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }

  .activity-occupancy p {
    font-size: 9px;
  }

  & {
    color: ${props => props.full ? '#CC6666' : '#078632'};
  }
`;
