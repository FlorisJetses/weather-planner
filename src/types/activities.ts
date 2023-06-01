export type Activities = Activity[]

type Activity = {
    minTemp?: number;
    maxTeamp?: number;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}