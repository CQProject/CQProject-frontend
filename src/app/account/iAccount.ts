export interface Account {
    email:string;
    password:string;
    token:string;
    userID: number;
    roles: number[];
    classID:number;
    name:string;
    photo:string;
}