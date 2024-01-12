import { CompanyUser } from "./company-user";
import { RegularUser } from "./regular-user";

export interface User extends RegularUser, CompanyUser {
}