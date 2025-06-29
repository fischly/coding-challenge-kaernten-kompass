import type { Category } from './types/Category';
import type { Event } from './types/Event';
import type { Image } from './types/Image';
import type { Schedule } from './types/Schedule';

export default function parse(fetched: any): { events: Event[], meta: any } {
    try {
        const events = fetched['@graph'];

        const mapped = events.map((event: any): Event => {
            return {
                id: event['@id'],
                description: event['description'],
                name: event['name'],
                slug: event['dc:slug'],
                startDate: event['startDate'],
                endDate: event['endDate'],
                location: event['location'][0]?.name, // TODO: handle multiple locations
                organizer: {
                    name: event?.organizer?.[0]?.name,
                    address: event?.organizer?.[0]?.address?.streetAddress,
                    city: event?.organizer?.[0]?.address?.addressLocality,
                    zip: event?.organizer?.[0]?.address?.postalCode,
                    telephone: event?.organizer?.[0]?.address?.telephone,
                    email: event?.organizer?.[0]?.address?.email,
                    url: event?.organizer?.[0]?.address?.url,

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
                        byDay: schedule['byDay'],
                    };
                }),
                categories: event['dc:classification']
                    // Filter out only classification belonging to the "category" scheme
                    .filter((classification: any) => classification['skos:inScheme']['@id'] === 'f3e1f0b0-0474-4e95-8fa2-94b4dd5aabdf')
                    .map((classification: any): Category => {
                        return {
                            id: classification['@id'],
                            name: classification['skos:prefLabel'],
                        };
                    }),
            };
        });

        return { events: mapped, meta: fetched['meta'] };
    } catch (error) {
        console.error('Error parsing fetched data:', error);
        // TODO: handle error
        return { events: [], meta: {} };
    }
}