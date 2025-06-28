<script setup lang="ts">
import { events } from '@/data/events';
const EVENTS_PER_PAGE = 6;

const results = ref(events);
const totalResults = ref(events.length);
const numberOfPages = computed(() => Math.ceil(totalResults.value / EVENTS_PER_PAGE));
const currentPage = ref(1);
</script>

<template>
    <div class="mx-auto px-4 sm:px-6 lg:px-8 ">
        <!-- Filters -->
        <EventFilters></EventFilters>

        <!-- Results Count -->
        <div class="mb-6 flex justify-between items-center">
            <p class="text-gray-600">
                <!-- {filteredEvents.length} {filteredEvents.length === 1 ? 'Veranstaltung' : 'Veranstaltungen'} gefunden -->
                {{ results.length }} <span v-if="results.length === 1">Veranstaltung</span>
                <span v-else>Veranstaltungen</span> gefunden

                <span v-if="numberOfPages > 1">
                    (Seite {{ currentPage }} von {{ numberOfPages }})
                </span>
            </p>

            <!-- Page size info  -->
            <p v-if="results.length > EVENTS_PER_PAGE" class="text-sm text-gray-500">
                <!-- TODO: fix this -->
                {{ 1 }}-{{ Math.min(currentPage * EVENTS_PER_PAGE, results.length) }} von {{ results.length }}
            </p>
        </div>

        <!-- Events Grid -->
        <div v-if="results.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <EventCard v-for="event in results" :key="event.id" :event="event"></EventCard>
        </div>
        <div v-else class="text-center py-12 mb-8">
            <p class="text-gray-500 text-lg">Keine Veranstaltungen gefunden.</p>
            <p class="text-gray-400 mt-2">Versuchen Sie andere Filter oder erweitern Sie Ihre Suche.</p>
        </div>

    </div>


</template>