<script setup lang="ts">
const filterSearchText = useState<string>('filterSearchText', () => '');
const filterDateRange = useState<{ start?: Date, end?: Date } | null>('filterDateRange', () => null);
const filterSelectedCategory = useState<string>('filterSelectedCategory', () => '');

const setEventFilters = (searchText: string, selectedCategory: string, dateRange: { start?: Date, end?: Date } | null) => {
    // Update reactive filter states
    filterSearchText.value = searchText;
    filterSelectedCategory.value = selectedCategory;
    filterDateRange.value = dateRange;

    // force a refresh of cached data
    refreshNuxtData('events');
}
</script>

<template>
    <div class="mx-auto px-4 sm:px-6 lg:px-8 ">
        <EventFilters @eventsFiltered="setEventFilters"></EventFilters>

        <!-- Client-side only to avoid long page loads while waiting for the API to respond -->
        <ClientOnly>
            <EventGrid :filterSearchText="filterSearchText" :filterSelectedCategory="filterSelectedCategory" :filterDateRange="filterDateRange">
            </EventGrid>

            <template #fallback>
                <EventGridSkeletton></EventGridSkeletton>
            </template>
        </ClientOnly>
    </div>
</template>