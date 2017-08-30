export interface Notification {
    ID: number;
    Hour: Date;
    Subject: string;
    Description: string;
    Urgency: boolean;
    Approval: boolean;
    UserFK: number;
}

export interface ReceivedNotification {
    ID: number;
    Hour: Date;
    Subject: string;
    Description: string;
    Urgency: boolean;
    Approval: boolean;
    Sender: string;
    SenderFK: number;
    Accepted: boolean;
    Read: boolean;
}