export interface Notification {
    ID: number;
    Hour: Date;
    Subject: string;
    Description: string;
    Urgency: boolean;
    Approval: boolean;
    UserFK: number;
}