export interface BookingHistoryDTO {
  id: number;
  pnr: string;
  tripType: string;
  bookingTime: string;
  seatsBooked: string;
  mealType: string;
  totalPrice: number;
  canceled: boolean;

  airline: string;
  fromPlace: string;
  toPlace: string;
  departureTime: string;
  arrivalTime: string;

  returnFlight?: {
    airline: string;
    fromPlace: string;
    toPlace: string;
    departureTime: string;
    arrivalTime: string;
  };
}
