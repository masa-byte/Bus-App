import { User } from "../../user/user.model";

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    error: string;
}