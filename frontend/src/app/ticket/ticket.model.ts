
export interface Ticket {
    id: string;
    userId: string;
    busLineId: string;
    companyId: string;
    departureDate: string;
    departureTime: string;
    price: number;
    durationMinutes: number;
    distance: number;
    startTownName: string;
    endTownName: string;
    returnTicket: boolean;
    numberOfSeats: number;
    ratedCompany: boolean;
}