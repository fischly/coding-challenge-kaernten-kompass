import parse from "@/data/parse";
import { Category } from "@/data/types/Category";

export default defineEventHandler(async (event) => {
    // Load environment variables
    const config = useRuntimeConfig();
    const { carinthiaApiToken, carinthiaApiUrl } = config;

    // Get query parameters
    const queryParams = getQuery<{
        searchText?: string;
        startDate?: string;
        endDate?: string;
        category?: string;

        page?: number;
        pageSize?: number;
    }>(event);

    const query: any = {
        token: carinthiaApiToken,
        fields: '*,location.*,image.*,eventSchedule.*,dc:classification.skos:inScheme,dc:classification.skos:prefLabel',
        filter: {},
        page: { number: queryParams.page || 1, size: queryParams.pageSize || 24 },
    };

    // Add query parameters to API query
    if (queryParams.searchText) {
        query['filter']['q'] = queryParams.searchText;
    }

    // Date filter
    const dateFilter: { min?: string, max?: string } = {};
    if (queryParams.startDate) {
        dateFilter.min = queryParams.startDate;
    }
    if (queryParams.endDate) {
        dateFilter.max = queryParams.endDate;
    }
    if (dateFilter.min || dateFilter.max) {
        query['filter']['attribute'] = {
            eventSchedule: { in: dateFilter }
        };
    }

    // Category filter
    if (queryParams.category) {
        query['filter']['classifications'] = {
            in: {
                withSubtree: [
                    queryParams.category
                ]
            }
        };
    }



    const response = await $fetch(`${carinthiaApiUrl}`, {
        method: 'POST',
        body: JSON.stringify(query),
    });

    return parse(response);
});


