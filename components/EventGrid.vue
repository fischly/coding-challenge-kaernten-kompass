<script lang="ts" setup>
import type { Event } from '@/data/types/Event';
const nuxtApp = useNuxtApp();

// Events per page to fetch and display
const EVENTS_PER_PAGE = 27;

// The page the user currently is on
const currentPage = useState('currentPage', () => 1);

// Props serving as event filters
const props = defineProps<{
    filterSearchText: string;
    filterSelectedCategory: string;
    filterDateRange: any; // { start?: string, end?: string } | null;
}>();

// Computed properties to build the query string for the API
const queryString = computed(() => {
    let query = `/api/events?page=${currentPage.value}&pageSize=${EVENTS_PER_PAGE}`;
    if (props.filterSearchText) query += `&searchText=${props.filterSearchText}`;
    if (props.filterSelectedCategory) query += `&category=${props.filterSelectedCategory}`;
    if (props.filterDateRange?.start) query += `&startDate=${props.filterDateRange.start}`;
    if (props.filterDateRange?.end) query += `&endDate=${props.filterDateRange.end}`;
    return query;
});


// Fetch events from the API
const { data, status, error, refresh, clear } = await useFetch<{ events: Event[], meta: any }>(() => queryString.value, {
    key: 'events',
    server: false,
    lazy: true,
    method: 'GET',
    getCachedData: (key) => {
        console.log('GET CACHED DATA', key);
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    }
});

// Computed properties to display the events, total results, and total pages
const events = computed(() => data.value?.events ?? []);
const totalResults = computed(() => data.value?.meta?.total ?? 0);
const totalPages = computed(() => data.value?.meta?.pages ?? 0);


// Generate page numbers for pagination
const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages.value <= maxVisiblePages) {
        // Show all pages if total is less than max visible
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
        }
    } else {
        // Show first page, current page range, and last page
        if (currentPage.value <= 3) {
            for (let i = 1; i <= 4; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages.value);
        } else if (currentPage.value >= totalPages.value - 2) {
            pages.push(1);
            pages.push('...');
            for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        }
    }

    return pages;
};

const pageNumbers = computed(() => getPageNumbers());

const goToPage = (page: number) => {
    clear(); // Clear the current request, if any
    currentPage.value = page;
    refreshNuxtData(`events`); // Refresh the data (i.e., trigger a re-fetch)
};
</script>

<template>
    <div v-if="status === 'pending'">
        <EventGridSkeletton></EventGridSkeletton>
    </div>
    <div v-else>
        <!-- Results Count -->
        <div class="mb-6 flex justify-end items-center">
            <!-- Page size info  -->
            <p v-if="totalResults > EVENTS_PER_PAGE" class="text-sm text-gray-500">
                {{ (currentPage - 1) * EVENTS_PER_PAGE + 1 }}-{{ Math.min(currentPage * EVENTS_PER_PAGE, totalResults) }} von {{ totalResults }}
            </p>
        </div>

        <!-- Events Grid -->
        <div v-if="events.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
        </div>
        <div v-else class="text-center py-12 mb-8">
            <p class="text-gray-500 text-lg">Keine Veranstaltungen gefunden.</p>
            <p class="text-gray-400 mt-2">Versuchen Sie andere Filter oder erweitern Sie Ihre Suche.</p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 py-8">
            <!-- Previous Button -->
            <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)"
                class="px-3 py-2 rounded-md text-sm font-medium" :class="{
                    'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === 1,
                    'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300': currentPage !== 1
                }">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <!-- Page Numbers -->
            <div v-for="page in pageNumbers" :key="page">
                <span v-if="page === '...'" className="px-1 py-2 text-gray-500">...</span>
                <!-- onClick={() => goToPage(page as number)} -->
                <button v-else @click="goToPage(page)" class="px-3 py-2 rounded-md text-sm font-medium" :class="{
                    'bg-primary text-white': currentPage === page,
                    'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300': currentPage !== page
                }">
                    {{ page }}
                </button>
            </div>

            <!-- Next Button -->
            <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)"
                class="px-3 py-2 rounded-md text-sm font-medium" :class="{
                    'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === totalPages,
                    'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300': currentPage !== totalPages
                }">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    </div>
</template>