export interface Schedule {
    ID: number;
    TimeFK: number;
    Duration: number;
    DayOfWeek: number;
    SubjectFK: number;
    TeacherFK: number;
    ClassFK: number;
    RoomFK: number;
}