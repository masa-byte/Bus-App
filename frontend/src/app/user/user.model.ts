import { CompanyUser } from "./company-user.model";
import { RegularUser } from "./regular-user.model";

export interface User extends RegularUser, CompanyUser {
}