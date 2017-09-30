export interface UserProfile {
    ID: number;
    Photo: string;
    Name: string;
    Email: string;
    IsActive: boolean;
    Function: string;
}

export interface UserDetails {
    ID: number, 
    Photo: string, 
    FiscalNumber: string, 
    Password:string,
    CitizenCard: string, 
    PhoneNumber: string, 
    Address: string, 
    Name: string, 
    Email: string, 
    RegisterDate: Date, 
    Function: string, 
    Curriculum: string,
    DateOfBirth: Date,
    IsActive: boolean
}

export class UserDetailsToPost {
    ID: number;
    Photo: string; 
    FiscalNumber: string;
    Password: string;
    CitizenCard: string ;
    PhoneNumber: string; 
    Address: string; 
    Name: string; 
    Email: string; 
    RegisterDate: Date; 
    Function: string; 
    Curriculum: string;
    DateOfBirth: Date;
    IsActive: boolean;
}