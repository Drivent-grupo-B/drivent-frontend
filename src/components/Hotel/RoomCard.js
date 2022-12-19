import styled from 'styled-components';
import useHotelRooms from '../../hooks/api/useHotelRooms';

export default function RoomCard({ room }) {
  return (
    <CardStyle>
      <h5>{room.name}</h5>
      <div></div>
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

  h5, svg {
    font-size: 20px;
    font-weight: 700;
  }

`;
