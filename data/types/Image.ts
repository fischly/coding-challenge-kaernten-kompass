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

