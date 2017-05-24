export interface ISecretaryList{
    id:Number;
    name:String;
    email:String;
    photo:String;
}

export interface ISecretaryProfile{
    id:Number;
    name:String;
    email:String;
    photo:String;
    startWorkTime:Date;
    endWorkTime:Date;
    fiscalNumber:String;
    citizenCard:String;
    phone:String;
    address:String;
    createdDate:Date;
    isActive:Boolean;
}

export interface IAction{
    id: Number;
    executionHour:Date;
    description:String;
    userId:Number;
    userName:String;
}