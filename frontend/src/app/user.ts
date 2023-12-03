import { Permission } from "./profile/profile.service";
import { Workshop } from "./workshop.service";

export interface User { 
    id: number;
    pid: number;
    onyen: string;
    first_name: string;
    last_name: string;
    email: string;
    pronouns: string;
    permissions: Permission[]
    events: Event[]
}

export interface UserDetails { 
    events: Workshop[]
}