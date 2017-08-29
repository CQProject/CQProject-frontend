export interface Record {
    ID: Number;
    Hour: Date;
    Temperature: Number;
    Luminosity: Number;
    Energy: Number;
    Humidity: Number;
    SensorFK: Number;
}

export interface Resume {
    LuminosityAVG: Number;
    TemperatureAVG: Number;
    EnergyAVG: Number;
    HumidityAVG: Number;
}