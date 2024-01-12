import { EntityState } from "@ngrx/entity";
import { CompanyUser } from "../../user/company-user";

export interface CompanyState extends EntityState<CompanyUser> {
    selectedCompanyId: number | null;
    totalNumberOfCompanies: number;
    loading: boolean;
    error: string;
    sortAscending: boolean;
    sortingCriteria: string;
    searchText: string;
}
