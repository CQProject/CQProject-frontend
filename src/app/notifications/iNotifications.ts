export interface Notification {
    ID: Number;
    Hour: Date;
    Subject: String;
    Description: String;
    Urgency: Boolean;
    Approval: Boolean;
    UserFK: Number;
}

export interface ReceivedNotification {
    ID: Number;
    Hour: Date;
    Subject: String;
    Description: String;
    Urgency: Boolean;
    Approval: Boolean;
    Sender: String;
    SenderFK: Number;
    Accepted: Boolean;
    Read: Boolean;
}