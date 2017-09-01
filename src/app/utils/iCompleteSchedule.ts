export interface CompleteSchedule {
    ID: number;
    StartingTime: number;
    Duration: number;
    DayOfWeek: number;
    SubjectFK: number;
    Subject: string
    TeacherFK: number;
    Teacher: string;
    ClassFK: number;
    ClassName:string;
    RoomFK: number;
    Room: string;
}