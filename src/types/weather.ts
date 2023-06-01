export type Weather = {
    temperature: Temperature;
    weatherInfo: WeatherInfo[];
}

type Temperature = {
    temp: number;
    metric: string;
}

type WeatherInfo = {
    minTemp?: number;
    maxTeamp?: number;
    title: string;
    description: string;
    imageUrl: string;
}