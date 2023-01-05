import styled from 'styled-components';
import { toast } from 'react-toastify';
import useCreateEntry from '../../../hooks/api/useCreateEntry';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { CgEnter, CgCloseO, CgCheckO } from 'react-icons/cg';

export default function Activity({ activity, room, selectedActivity, setSelectedActivity }) {
  if (activity.ActivityRoomId !== room.id) return <></>;

  const { createEntry } = useCreateEntry();
  const { userData } = useContext(UserContext);
  const activityStatus = renderTotalVacancies(activity);

  function getDateHours(date) {
    return new Date(date).getHours();
  }

  function calculateActivityTime(startTime, endTime) {
    const startHour = getDateHours(startTime);
    const endHour = getDateHours(endTime);

    return endHour - startHour;
  }

  function renderActivityPeriod(startTime, endTime) {
    const startHour = getDateHours(startTime) + 3;
    const endHour = getDateHours(endTime) + 3;

    return `${startHour}:00 - ${endHour}:00`;
  }

  function renderTotalVacancies(activity) {
    const totalEntries = activity.Entry.length;
    const capacity = activity.capacity;
    const vacancies = capacity - totalEntries;
    const isEntried = activity.Entry.filter((entry) => entry.userId === userData.user.id).length;

    if (isEntried) return 'Inscrito';
    if (vacancies <= 0) return 'Esgotado';
    if (vacancies === 1) return `${vacancies} vaga`;

    return `${vacancies} vagas`;
  }

  async function entryActivity(activity, activityStatus) {
    if (!(activityStatus === 'Inscrito' || activityStatus === 'Esgotado' || selectedActivity === activity.name)) {
      try {
        await createEntry({ activityId: activity.id });
        setSelectedActivity(activity.name);
        toast('Matrícula realizada com sucesso!');
      } catch (error) {
        toast('Você já tem uma atividade nesse horário!');
      }
    }
  }
  return (
    <ActivityWrapper
      key={activity.id}
      height={calculateActivityTime(activity.startTime, activity.endTime)}
      capacity={activity.capacity}
      entries={activity.Entry.length}
      name={activity.name}
      selectedActivity={selectedActivity}
      activityStatus={activityStatus}
      onClick={() => entryActivity(activity, activityStatus)}
    >
      <div className="activity-details">
        <b>{activity.name}</b>
        <p>{renderActivityPeriod(activity.startTime, activity.endTime)}</p>
      </div>
      <div className="activity-occupancy">
        {activityStatus === 'Inscrito' || selectedActivity === activity.name ? (
          <CgCheckO />
        ) : activityStatus === 'Esgotado' ? (
          <CgCloseO />
        ) : (
          <CgEnter />
        )}
        <p>{selectedActivity === activity.name ? 'Inscrito' : activityStatus}</p>
      </div>
    </ActivityWrapper>
  );
}

const ActivityWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.height * 80}px;
  padding: 12px 10px;
  margin-bottom: 10px;
  background-color: ${(props) =>
    props.activityStatus === 'Inscrito' || props.selectedActivity === props.name ? '#D0FFDB' : '#F1F1F1'};
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
    border-right: 1px solid #cfcfcf;
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
    color: ${(props) => (props.activityStatus === 'Esgotado' ? '#CC6666' : '#078632')};
  }

  &:hover {
    cursor: ${(props) =>
    props.capacity <= props.entries ||
      props.activityStatus === 'Inscrito' ||
      props.activityStatus === 'Esgotado' ||
      props.selectedActivity
      ? 'default'
      : 'pointer'};
    filter: ${(props) =>
    props.capacity <= props.entries ||
      props.activityStatus === 'Inscrito' ||
      props.activityStatus === 'Esgotado' ||
      props.selectedActivity
      ? 'none'
      : 'brightness(0.95)'};
  }
`;
