import { Category } from "@/data/types/Category";

export default defineEventHandler(async (event) => {
    // Load environment variables
    const config = useRuntimeConfig();
    const { carinthiaApiToken, carinthiaApiCategoriesUrl } = config;

    // Fetch categories from Carinthia API
    const query = { token: carinthiaApiToken };

    const response: any = await $fetch(carinthiaApiCategoriesUrl, {
        method: 'POST',
        body: JSON.stringify(query),
    }).catch((error) => {
        console.error('Error fetching categories:', error);
        return [];
    });

    try {
        return response['@graph'].map((cat: any): Category => {
            return {
                id: cat['@id'],
                name: cat['skos:prefLabel'],
            };
        });
    } catch (error) {
        console.error('Error parsing categories:', error);
        return [];
    }
});