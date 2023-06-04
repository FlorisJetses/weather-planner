export type Activities = {
    activities: Activity[]
}

export type Activity = {
    minTemp: number | null;
    maxTemp: number | null;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}