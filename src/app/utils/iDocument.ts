export interface Document{
    ID: number;
    File: string;
    IsVisible: boolean;
    SubmitedIn: Date;
    ClassFK: number;
    UserFK: number;
}