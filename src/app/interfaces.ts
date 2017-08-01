export interface ISecretarySummary {
    Id: Number;
    Photo: String;
    Name: String;
    Email: String;
}

export interface IClassSummary {
    Id: Number;
    SchoolYear: String;
    ClassDesc: String;
}

export interface ITeacherSummary {
    Id: Number;
    Photo: String;
    Name: String;
    Email: String;
}

export interface ISecretaryProfile {
    Id: Number;
    Name: String;
    Email: String;
    Photo: String;
    StartWorkTime: Date;
    EndWorkTime: Date;
    FiscalNumber: String;
    CitizenCard: String;
    Phone: String;
    Address: String;
    CreatedDate: Date;
    IsActive: Boolean;
    Curriculum: String;
}

export interface IClassProfile {
    Id: Number;
    SchoolYear: String;
    ClassDesc: String;
    TeacherId: Number;
    Teacher: ITeacherSummary[];
    Schedule: ISchedule[];
}

export interface ITeacherProfile {
    Id: Number;
    Name: String;
    Email: String;
    Photo: String;
    FiscalNumber: String;
    CitizenCard: String;
    Phone: String;
    Address: String;
    CreatedDate: Date;
    IsActive: Boolean;
    Curriculum: String;
}

export interface ISchedule {
    Id: Number;
    Subject: String;
    StartingTime: String;
    EndingTime: Number;
    TeacherId: Number;
    Teacher: String;
    ClassId: String;
    Class: String;
}

export interface IAction {
    Id: Number;
    ExecutionHour: Date;
    Description: String;
    UserId: Number;
    UserName: String;
}