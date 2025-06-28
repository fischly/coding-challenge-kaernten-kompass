import type { Event } from './types/Event';
import type { Image } from './types/Image';
import type { Schedule } from './types/Schedule';

export default function parse(fetched: any): { events: Event[], meta: any, links: any } {
    console.log('parsing...');

    try {
        const events = fetched['@graph'];
        
        const mapped = events.map((event: any): Event => {
            return {
                id: event['@id'],
                categories: ['Kunst'],
                description: event['description'],
                name: event['name'],
                slug: event['dc:slug'],
                startDate: event['startDate'],
                endDate: event['endDate'],
                location: event['location'][0]?.name, // TODO: handle multiple locations
                organizer: {
                    name: event?.organizer?.[0]?.name,
                },
                images: event['image']?.map((image: any): Image => {
                    return {
                        id: image['@id'],
                        name: image['name'],
                        thumbnailUrl: image['thumbnailUrl'],
                        url: image['dc:webUrl'],
                        width: image['width']?.value,
                        height: image['height']?.value,
                        copyrightNotice: image['copyrightNotice'],
                    };
                }),
                schedule: event['eventSchedule'].map((schedule: any): Schedule => {
                    return {
                        startDate: schedule['startDate'],
                        endDate: schedule['endDate'],
                        startTime: schedule['startTime'],
                        endTime: schedule['endTime'],
                        duration: schedule['duration'],
                        repeatFrequency: schedule['repeatFrequency'],
                    };
                }),
            };
        });
        
        return { events: mapped, meta: fetched['meta'], links: fetched['links'] };
    } catch (error) {
        console.error('Error parsing fetched data:', error);
        // TODO: handle error
        return { events: [], meta: {}, links: {} };
    } 
}