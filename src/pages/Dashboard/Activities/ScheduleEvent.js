import styled from 'styled-components';
import { CgEnter, CgCloseO, CgCheckO } from 'react-icons/cg';
import useActivitiesRooms from '../../../hooks/api/useActivitiesRooms';
import useCreateEntry from '../../../hooks/api/useCreateEntry';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';

export default function ScheduleEvent({ activities }) {
  const { activitiesRooms } = useActivitiesRooms();

  return(
    <ScheduleContainer>
      { activitiesRooms?.map(room => (
        <ActivityRoomItinerary key={ room.id } room={room} activities={activities} />
      )) }
    </ScheduleContainer>
  );
}

function ActivityRoomItinerary({ room, activities }) {
  const { createEntry } = useCreateEntry(); 
  const { userData } = useContext(UserContext);
  function getDateHours(date) {
    return (new Date(date)).getHours();
  }

  function calculateActivityTime(startTime, endTime) {
    const startHour = getDateHours(startTime);
    const endHour = getDateHours(endTime);
    
    return endHour - startHour;
  }

  function renderActivityPeriod(startTime, endTime) {
    const startHour = getDateHours(startTime)+3;
    const endHour = getDateHours(endTime)+3;

    return `${startHour}:00 - ${endHour}:00`;
  }

  function renderTotalVacancies(activity) {
    const totalEntries = activity.Entry.length;
    const capacity = activity.capacity;
    const vacancies = capacity - totalEntries;
    const isEntried = (activity.Entry.filter((entry) => entry.userId === userData.user.id)).length;
    
    if (isEntried) return 'Inscrito';
    if(vacancies <= 0) return 'Esgotado';
    if(vacancies === 1) return `${vacancies} vaga`;

    return `${vacancies} vagas`;
  }

  async function entryActivity(activityId, activityStatus) {  
    if (!(activityStatus === 'Inscrito' || activityStatus === 'Esgotado')) {
      try {
        await createEntry({ activityId });      
        toast('Matrícula realizada com sucesso!');
      } catch (error) {
        toast('Você já tem uma atividade nesse horário!');
      }
    }    
  }

  return (
    <div>
      <h2>{ room.name }</h2>
      <ActivitiesContainer>
        {
          activities.map(activity => {
            if (activity.ActivityRoomId !== room.id) return<></>;
            const activityStatus = renderTotalVacancies(activity);
            return (
              <ActivityWrapper 
                key={activity.id} 
                height={calculateActivityTime(activity.startTime, activity.endTime)} 
                capacity={activity.capacity}
                entries={activity.Entry.length}
                activityStatus={activityStatus}
              >
                <div className='activity-details'>
                  <b>{ activity.name }</b>
                  <p>{ renderActivityPeriod(activity.startTime, activity.endTime) }</p>
                </div>
                <div className='activity-occupancy' onClick={() => entryActivity(activity.id, activityStatus)}>
                  {activityStatus === 'Inscrito' ? <CgCheckO /> : activityStatus === 'Esgotado' ? <CgCloseO /> : <CgEnter />}
                  <p>{activityStatus}</p>
                </div>
              </ActivityWrapper>
            );
          })
        }
      </ActivitiesContainer>
    </div>
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

const ActivityWrapper = styled.div`
  width: 100%;
  height: ${props => props.height*80}px;
  padding: 12px 10px;
  margin-bottom: 10px;
  background-color: ${props => props.activityStatus === 'Inscrito' ? '#D0FFDB' : '#F1F1F1'};
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

  .activity-occupancy {
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
    color: ${props => props.activityStatus === 'Esgotado' ? '#CC6666' : '#078632'};
  }

  &:hover {
    cursor: ${props => props.capacity <= props.entries ? 'default' : 'pointer'};
    filter: ${props => props.capacity <= props.entries ? 'none' : 'brightness(0.95)'};
  }
`;
