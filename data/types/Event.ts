import type { Category } from "./Category";
import type { Image } from "./Image";
import type { Organizer } from "./Organizer";
import type { Schedule } from "./Schedule";

export interface Event {
    id: string;
    name: string;
    slug: string;

    description: string;
    categories: Category[];
    location: string;
    
    startDate: string;
    endDate: string;

    images: Image[];

    organizer: Organizer;

    schedule: Schedule[];
}