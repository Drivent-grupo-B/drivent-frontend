import HotelCard from '../../../components/Hotel/HotelCard.js';
import useHotel from '../../../hooks/api/useHotel.js';
export default function Hotels() {
  const { hotels } = useHotel();
  return(
    <>
      {hotels ? 
        hotels.map((hotel) => {
          <HotelCard hotel={hotel}/>;
        })
        :
        'Não tem hotéis cadastrados!'
      }
    </>
  );
}
