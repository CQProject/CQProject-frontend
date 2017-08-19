export interface Notification {
    ID: Number;
    DateTime: Date;
    Subject: String;
    Description: String;
    Urgency: Boolean;
    UserFK: Number;
}