import { createContext, useState } from 'react';

const HotelContext = createContext();
export default HotelContext;

export function HotelProvider({ children }) {
  const [selectedHotel, setSelectedHotel] = useState({});

  return (
    <HotelContext.Provider value={{ selectedHotel, setSelectedHotel }}>
      {children}
    </HotelContext.Provider>
  );
}
