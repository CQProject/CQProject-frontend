export interface Record {
    ID: number;
    Hour: Date;
    Temperature: number;
    Luminosity: number;
    Energy: number;
    Humidity: number;
    SensorFK: number;
}

export interface Resume {
    LuminosityAVG: number;
    TemperatureAVG: number;
    EnergyAVG: number;
    HumidityAVG: number;
}