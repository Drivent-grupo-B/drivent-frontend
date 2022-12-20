import styled from 'styled-components';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';
import useRoomBooking from '../../hooks/api/useRoomBooking';
import { useEffect, useState } from 'react';

export default function RoomCard({ room }) {
  const { roomBooking } = useRoomBooking(room.id);
  const [isFull, setIsFull] = useState(false);
  const [iconsList, setIconsList] = useState([]);

  useEffect(() => {
    if (roomBooking === null) return '';
    const vacancies = {};
    let totalCapacity = room.capacity;
    let totalOfBookings = roomBooking.length;
    if (totalCapacity === totalOfBookings) setIsFull(true);

    while (totalCapacity > 0) {
      vacancies[totalCapacity] = true;
      if (totalOfBookings > 0) vacancies[totalCapacity] = false;
      totalCapacity -= 1;
      totalOfBookings -= 1;
    }

    setIconsList(Object.values(vacancies));
  }, [roomBooking, room]);

  return (
    <CardStyle isFull={isFull}>
      <h5>{room.name}</h5>
      <div>{iconsList.map((vacancy) => (vacancy ? <IoPersonOutline /> : <IoPerson />))}</div>
    </CardStyle>
  );
}

const CardStyle = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px #cecece solid;
  background-color: ${(props) => (props.isFull ? '#E9E9E9' : '#ffffff')};
  padding: 11px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h5 {
    color: ${(props) => (props.isFull ? '#9D9D9D' : '#454545')};
    font-size: 20px;
    font-weight: 700;
  }

  svg {
    color: ${(props) => (props.isFull ? '#8C8C8C' : '#000000')};
    margin-top: 5px;
  }
`;
