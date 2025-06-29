import parse from "@/data/parse";
import { Category } from "@/data/types/Category";

export default defineEventHandler(async (event) => {
    // Load environment variables
    const config = useRuntimeConfig();
    const { carinthiaApiToken, carinthiaApiUrl } = config;

    // Get query parameters
    const queryParams = getQuery<{
        id: string;
    }>(event);

    const query: any = {
        token: carinthiaApiToken,
        fields: '*,location.*,image.*,eventSchedule.*,organizer.*,dc:classification.skos:inScheme,dc:classification.skos:prefLabel',
        filter: {},
        // page: { number: queryParams.page || 1, size: 6 },
    };


    const response = await $fetch(`${carinthiaApiUrl}/${queryParams.id}`, {
        method: 'POST',
        body: JSON.stringify(query),
    });

    const parsedData = parse(response);

    if (parsedData.events.length >= 1) {
        return parsedData.events[0];
    }

    return null;
});


