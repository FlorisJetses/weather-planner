export type Weather = {
    temperature: Temperature;
    weatherInfo: WeatherInfo[];
}

type Temperature = {
    temp: number;
    metric: "CELSIUS" | "FAHRENHEIT";
}

export type WeatherInfo = {
    minTemp: number | null;
    maxTemp: number | null;
    title: string;
    description: string;
    imageUrl: string;
}