import { BusLineDepartureTimes } from "src/bus-line/bus-line-departure-times.entity";
import { Ticket } from "src/ticket/ticket.entity";
import { Town } from "src/town/town.entity";
import { CompanyUser } from "src/user/company-user.entity";
import { RegularUser } from "src/user/regular-user.entity";

export function mapNeo4jNodeToUser(node: any): RegularUser | CompanyUser {
    if (node.properties.type == 'company') {
        return mapNeo4jNodeToCompanyUser(node)
    }
    else {
        return mapNeo4jNodeToRegularUser(node)
    }
}

export function mapNeo4jNodeToRegularUser(node: any, passwordInclude: boolean = true): RegularUser {
    const user = new RegularUser();
    user.id = node.identity.toString();
    user.name = node.properties.name;
    user.surname = node.properties.surname;
    user.email = node.properties.email;
    if (passwordInclude)
        user.password = node.properties.password;
    user.phone = node.properties.phone;
    user.type = node.properties.type;
    user.birthDate = node.properties.birthDate;
    return user;
}

export function mapNeo4jNodeToCompanyUser(node: any, passwordInclude: boolean = true): CompanyUser {
    const user = new CompanyUser();
    user.id = node.identity.toString();
    user.name = node.properties.name;
    user.email = node.properties.email;
    if (passwordInclude)
        user.password = node.properties.password;
    user.phone = node.properties.phone;
    user.type = node.properties.type;
    user.yearEstablished = node.properties.yearEstablished;
    user.regularPriceFactor = node.properties.regularPriceFactor;
    user.returnPriceFactor = node.properties.returnPriceFactor;
    user.discount = node.properties.discount;
    user.gradeNumber = node.properties.gradeNumber;
    user.gradeSum = node.properties.gradeSum;
    return user;
}

export function mapNeo4jNodeToTown(node: any): Town {
    const town = new Town();
    town.id = node.identity.toString();
    town.name = node.properties.name;
    town.population = node.properties.population;
    town.latitude = node.properties.latitude;
    town.longitude = node.properties.longitude;
    return town;
}

export function mapNeo4jNodeToBusLineDepartureTime(node: any): BusLineDepartureTimes {
    const busLineDepartureTime = new BusLineDepartureTimes();
    busLineDepartureTime.id = node.identity.toString();
    busLineDepartureTime.departureTimes = node.properties.departureTimes;
    busLineDepartureTime.capacities = node.properties.capacities;
    return busLineDepartureTime;
}

export function mapNeo4jNodeToTicket(node: any): Ticket {
    const ticket = new Ticket();
    ticket.id = node.identity.toString();
    ticket.busLineId = node.properties.busLineId;
    ticket.price = node.properties.price;
    ticket.departureTime = node.properties.departureTime;
    ticket.companyId = node.properties.companyId;
    ticket.distance = node.properties.distance;
    ticket.durationMinutes = node.properties.durationMinutes;
    ticket.endTownName = node.properties.endTownName;
    ticket.startTownName = node.properties.startTownName;
    ticket.departureDate = node.properties.departureDate;
    ticket.numberOfSeats = node.properties.numberOfSeats;
    ticket.returnTicket = node.properties.returnTicket;
    return ticket;
}
