export interface Image {
    id: string;
    name: string;
    caption?: string;
    description?: string;

    thumbnailUrl: string;
    url: string;
    
    width: number;
    height: number;

    copyrightNotice: string;
}

export interface Organizer {
    name: string;
    address?: string;
    telephone?: string;
}


export interface Event {
    id: string;
    name: string;
    slug: string;

    description: string;
    categories: string[];
    location: string;
    
    startDate: string;
    endDate: string;

    images: Image[];

    organizer: Organizer;
}