<script setup lang="ts">
import type { Event } from '~/data/types/Event';

const props = defineProps<{
    event: Event;
}>();


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

const formatDateRange = (startDate: string, endDate: string) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return start === end ? start : `${start} - ${end}`;
};

const thumbnailImage = computed(() => {
    return props.event.images[0].url;
});
</script>

<template>
    <NuxtLink :to="`/events/${event.id}`" class="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-gray-100">

        <!-- Image -->
        <div v-if="thumbnailImage" class="aspect-video overflow-hidden relative">
            <NuxtImg :src="thumbnailImage" :alt="event.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

            <!-- Gradient overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>

        </div>

        <!-- Content -->
        <div class="p-6">
            <h3
                class="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-3">
                {{ event.name }}
            </h3>

            <div class="mt-2 space-y-3 mb-5">
                <div class="text-sm text-gray-600 flex items-center gap-1">
                    <div>
                        <svg class="w-5 h-5 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    {{ event.location }}
                </div>

                <p class="text-sm text-gray-600 flex items-center gap-1">
                    <svg class="w-5 h-5 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>

                {{ formatDateRange(event.startDate, event.endDate) }}

                </p>
            </div>

            <!-- Categories -->
            <div v-if="event.categories.length > 0" class="mt-3 flex flex-wrap gap-1 justify-left">
                <span v-for="category in event.categories" :key="category"
                    class="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    {{ category }}
                </span>
            </div>

            <div class="mt-4 flex items-center text-primary group-hover:text-secondary transition-colors duration-200">
                <span class="text-sm font-medium">Mehr erfahren</span>
                <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    </NuxtLink>
</template>