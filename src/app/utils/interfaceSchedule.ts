export interface Schedule {
    ID: number;
    StartingTime: number;
    Duration: number;
    DayOfWeek: number;
    SubjectFK: number;
    TeacherFK: number;
    ClassFK: number;
    RoomFK: number;
}