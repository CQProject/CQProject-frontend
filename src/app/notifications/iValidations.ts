export interface Validation {
    ReceiverFK: Number;
    StudentFK:Number;
    NotificationFK: Number;
    Accepted: Boolean;
    Read: Boolean;
}

export interface SentValidation {
    ReceiverFK: Number;
    Receiver: String;
    StudentFK:Number;
    Student:String;
    NotificationFK: Number;
    Accepted: Boolean;
    Read: Boolean;
}