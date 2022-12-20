import styled from 'styled-components';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';
import useRoomBooking from '../../hooks/api/useRoomBooking';

export default function RoomCard({ room }) {
  const { roomBooking } = useRoomBooking(room.id);
  if (roomBooking === null) return '';

  function verifyRoomCapacity() {
    const vacancies = {};
    let totalCapacity = room.capacity;
    let totalOfBookings = roomBooking.length;

    while (totalCapacity > 0) {
      vacancies[totalCapacity] = true;
      if (totalOfBookings > 0) vacancies[totalCapacity] = false;
      totalCapacity -= 1;
      totalOfBookings -= 1;
    }

    return Object.values(vacancies);
  }

  return (
    <CardStyle>
      <h5>{room.name}</h5>
      <div>{verifyRoomCapacity().map((vacancy) => (vacancy ? <IoPersonOutline /> : <IoPerson />))}</div>
    </CardStyle>
  );
}

const CardStyle = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px #cecece solid;
  padding: 11px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h5 {
    font-size: 20px;
    font-weight: 700;
  }

  svg {
    color: #000000;
    margin-top: 5px;
  }
`;
