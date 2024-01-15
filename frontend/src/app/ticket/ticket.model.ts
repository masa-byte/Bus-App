
export interface Ticket {
    id: string;
    userId: string;
    busLineId: string;
    departureDate: Date;
    price: number;
    durationMinutes: number;
    distance: number;
    startTownName: string;
    endTownName: string;
    companyName: string;
}