import styled from 'styled-components';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';
import useRoomBooking from '../../hooks/api/useRoomBooking';
import { useEffect, useState } from 'react';

export default function RoomCard({ room, selectedRoom, setSelectedRoom }) {
  const { roomBooking } = useRoomBooking(room.id);
  const [isFull, setIsFull] = useState(false);
  const [iconsList, setIconsList] = useState([]);

  useEffect(() => {
    const vacancies = {};
    let totalCapacity = room.capacity;
    let totalOfBookings = roomBooking?.length;
    if (totalCapacity === totalOfBookings) setIsFull(true);

    while (totalCapacity > 0) {
      vacancies[totalCapacity] = 'avaiable';
      if (totalOfBookings > 0) vacancies[totalCapacity] = 'unavaiable';
      totalCapacity -= 1;
      totalOfBookings -= 1;
    }

    setIconsList(Object.values(vacancies));
  }, [roomBooking, room]);

  function selectRoom() {
    if (isFull) return;

    setSelectedRoom({ id: room.id, hotelId: room.hotelId });
    if (selectedRoom.id === room.id) return;

    const icons = [...iconsList];
    const hasSelected = icons.find((icon) => icon === 'selected');
    if (hasSelected) return;
    icons.shift();
    icons.push('selected');
    icons.sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

    setIconsList([...icons]);
  }

  return (
    <CardStyle isFull={isFull} selectedRoom={selectedRoom.id} roomId={room.id} onClick={selectRoom}>
      <h5>{room.name}</h5>
      <div>
        {iconsList.map((vacancy, index) => {
          if (vacancy === 'selected' && selectedRoom.id === room.id) {
            return <IoPerson key={index} color="#FF4791" />;
          } else if (vacancy === 'unavaiable') {
            return <IoPerson key={index} />;
          } else {
            return <IoPersonOutline key={index} />;
          }
        })}
      </div>
    </CardStyle>
  );
}

const CardStyle = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px #cecece solid;
  background-color: ${(props) => {
    if (props.isFull) {
      return '#E9E9E9';
    } else if (props.selectedRoom === props.roomId) {
      return '#FFEED2';
    } else {
      return '#ffffff';
    }
  }};
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

  &:hover {
    filter: brightness(0.95);
    cursor: pointer;
  }
`;
