export interface ISecretaryList{
    Id:Number;
    Photo:String;
    Name:String;
    Email:String;
}

export interface ISecretaryProfile{
    Id:Number;
    Name:String;
    Email:String;
    Photo:String;
    StartWorkTime:Date;
    EndWorkTime:Date;
    FiscalNumber:String;
    CitizenCard:String;
    Phone:String;
    Address:String;
    CreatedDate:Date;
    IsActive:Boolean;
}

export interface IAction{
    Id: Number;
    ExecutionHour:Date;
    Description:String;
    UserId:Number;
    UserName:String;
}