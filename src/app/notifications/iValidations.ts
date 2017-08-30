export interface Validation {
    ReceiverFK: number;
    StudentFK:number;
    NotificationFK: number;
    Accepted: boolean;
    Read: boolean;
}

export interface SentValidation {
    ReceiverFK: number;
    Receiver: string;
    StudentFK:number;
    Student:string;
    NotificationFK: number;
    Accepted: boolean;
    Read: boolean;
}