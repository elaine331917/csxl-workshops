import { User } from "./user";

export interface Workshop {
    id: number;
    name: string;
    description: string;
    date: string;
    capacity: number;
    users: User[]
}

export const workshops = [

]