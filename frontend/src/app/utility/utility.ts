import { BusLineDepartureTimes } from "../bus-line/bus-line-departure-times.model";
import { BusLine } from "../bus-line/bus-line.model";
import { Town } from "../town/town.model";
import { CompanyUser } from "../user/company-user.model";
import { RegularUser } from "../user/regular-user.model";

export function mapToUser(user: any) {
    if (user.type === 'user' || user.type === 'admin') {
        return mapToRegularUser(user);
    }
    else if (user.type === 'company') {
        return mapToCompanyUser(user);
    }
    else
        return user;
}

export function mapToRegularUser(user: any): RegularUser {
    let newUser: RegularUser = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        type: user.type,
        surname: user.surname,
        birthDate: user.birthDate
    };
    return newUser;
}

export function mapToCompanyUser(user: any): CompanyUser {
    const gradeNumber = user.gradeNumber;
    const gradeSum = user.gradeSum;
    let newUser: CompanyUser = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        type: user.type,
        yearEstablished: user.yearEstablished,
        regularPriceFactor: user.regularPriceFactor,
        returnPriceFactor: user.returnPriceFactor,
        discount: user.discount,
    };
    if (gradeNumber == 0)
        newUser.rating = 0;
    else
        newUser.rating = gradeSum / gradeNumber;
    return newUser;
}

export function mapToTown(town: any): Town {
    let newTown: Town = {
        id: town.id,
        name: town.name,
        population: town.population,
        latitude: town.latitude,
        longitude: town.longitude,
    };
    return newTown;
}

export function mapToBusLine(busLine: any): BusLine {
    let newBusLine: BusLine = {
        id: busLine.id,
        busLineId: busLine.busLineId,
        companyId: busLine.companyId,
        companyName: busLine.companyName,
        distance: busLine.distance,
        durationMinutes: busLine.durationMinutes,
        oneWayPrice: busLine.oneWayPrice,
        returnPrice: busLine.returnPrice,
        discount: busLine.discount,
        stops: busLine.stops,
    };
    return newBusLine;
}

export function mapToBusLineDepartureTimes(busLineDepartureTimes: any): BusLineDepartureTimes {
    let newBusLineDepartureTimes: BusLineDepartureTimes = {
        id: busLineDepartureTimes.id,
        busLineId: busLineDepartureTimes.busLineId,
        companyId: busLineDepartureTimes.companyId,
        companyName: busLineDepartureTimes.companyName,
        departureTimes: busLineDepartureTimes.departureTimes,
        capacities: busLineDepartureTimes.capacities,
    };
    return newBusLineDepartureTimes;
}