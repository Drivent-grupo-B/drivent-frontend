import { useState } from 'react';
import styled from 'styled-components';
import ActivitiesContainer from '../../../components/Activities/ActivitiesContainer';
import useActivitiesRooms from '../../../hooks/api/useActivitiesRooms';
import Activity from './Activity';

export default function ScheduleEvent({ activities }) {
  const { activitiesRooms } = useActivitiesRooms();

  return (
    <ScheduleContainer>
      {activitiesRooms?.map((room) => (
        <ActivityRoomItinerary key={room.id} room={room} activities={activities} />
      ))}
    </ScheduleContainer>
  );
}

function ActivityRoomItinerary({ room, activities }) {
  const [selectedActivity, setSelectedActivity] = useState([]);

  return (
    <div>
      <h2>{room.name}</h2>
      <ActivitiesContainer>
        {activities.map((activity) => (
          <Activity key={activity.id} activity={activity} room={room} selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity}/>
        ))}
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
    color: #7b7b7b;
  }
`;
