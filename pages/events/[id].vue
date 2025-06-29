<script setup lang="ts">
import { generateEventOccurrences } from '~/data/eventOccurrences';
import type { Event } from '~/data/types/Event';

const router = useRouter()
const route = useRoute();
const id = route.params.id;

const { data: prevData } = useNuxtData('events');

const { data: eventData, status, error } = useLazyFetch(`/api/event?id=${id}`, {
  key: `event-${id}`,
  server: false,
  default() {
    return prevData.value?.events.find((event: Event) => event.id === id);
  }
})

// Format date for display
const formatDate = (dateString: string) => {
  if (!dateString) return 'Unbekannt';

  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // If same day, show only one date
  if (start.toDateString() === end.toDateString()) {
    return formatDate(startDate);
  }

  // Different days
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const dates = computed(() => {
  if (!eventData.value) return [];

  const occurences = generateEventOccurrences(eventData.value);
  return occurences.map(occurrence => new Date(occurrence.date));
});

const goBackToOverview = () => {
  if (router.options.history.state.back) {
    router.back();
  } else {
    navigateTo('/#event-filters');
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="flex items-center space-x-4">
            <img src="/logo.svg" alt="Kärnten Kompass Logo" class="h-7 w-auto" />
            <span class="text-lg font-semibold text-gray-900">Kärnten Kompass</span>
          </NuxtLink>
          <button class="text-primary hover:text-primary/80 transition-colors duration-200 text-sm cursor-pointer"
            @click="goBackToOverview">
            ← Zurück zur Übersicht
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Featured Image (only on mobile in the main content) -->
          <div v-if="eventData?.images && eventData.images.length > 0"
            class="bg-white rounded-lg shadow-sm mb-6 block lg:hidden h-48 overflow-hidden">
            <img :src="eventData.images[0].url" :alt="eventData.images[0].caption || eventData.name"
              class="w-full h-full object-cover" />
          </div>

          <!-- Title -->
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {{ eventData?.name }}
          </h1>

          <!-- Key Information -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Date -->
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <h3 class="font-semibold text-gray-900">Datum</h3>
                  <p class="text-gray-600">{{ eventData ? formatDateRange(eventData.startDate, eventData.endDate) :
                    '-' }}</p>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <h3 class="font-semibold text-gray-900">Ort</h3>
                  <p class="text-gray-600">{{ eventData?.location }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Beschreibung</h2>
            <div class="prose prose-gray max-w-none" v-html="eventData?.description"></div>
          </div>
          <!-- Image Gallery -->
          <div v-if="eventData?.images && eventData.images.length > 0" class="bg-white rounded-lg shadow-sm p-6">
            <ImageGallery :images="eventData.images"></ImageGallery>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Featured Image (only on desktop in the side bar)-->
          <div v-if="eventData?.images && eventData.images.length > 0"
            class="bg-white rounded-lg shadow-sm mb-6 hidden lg:block">
            <div class="relative w-full h-48 rounded-lg overflow-hidden">
              <img :src="eventData.images[0].url" :alt="eventData.images[0].caption || eventData.name"
                class="w-full h-full object-cover" />
              <div v-if="eventData.images[0].copyrightNotice"
                class="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {{ eventData.images[0].copyrightNotice }}
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div v-if="eventData?.images.length" class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Kategorien</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="category in eventData?.categories" :key="category.id"
                class="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                {{ category.name }}
              </span>
            </div>
          </div>

          <!-- Organizer Information -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Veranstalter</h3>

            <div class="space-y-3">
              <div>
                <h4 class="font-medium text-gray-900">{{ eventData?.organizer.name }}</h4>
              </div>

              <div v-if="eventData?.organizer.address" class="flex items-start space-x-2">
                <svg class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <p class="text-gray-600 text-sm">{{ eventData?.organizer.address }}</p>
              </div>

              <div v-if="eventData?.organizer.telephone" class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                  </path>
                </svg>
                <p class="text-gray-600 text-sm">{{ eventData?.organizer.telephone }}</p>
              </div>

              <div v-if="eventData?.organizer.city || eventData?.organizer.zip" class="flex items-start space-x-2">
                <svg class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                  </path>
                </svg>
                <p class="text-gray-600 text-sm">
                  <span v-if="eventData?.organizer.zip">{{ eventData?.organizer.zip }}</span>
                  <span v-if="eventData?.organizer.zip && eventData?.organizer.city"> </span>
                  <span v-if="eventData?.organizer.city">{{ eventData?.organizer.city }}</span>
                </p>
              </div>

              <div v-if="eventData?.organizer.email" class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
                <a :href="`mailto:${eventData?.organizer.email}`"
                  class="text-gray-600 text-sm hover:text-primary transition-colors">
                  {{ eventData?.organizer.email }}
                </a>
              </div>

              <div v-if="eventData?.organizer.url" class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14">
                  </path>
                </svg>
                <a :href="eventData?.organizer.url" target="_blank" rel="noopener noreferrer"
                  class="text-gray-600 text-sm hover:text-primary transition-colors">
                  Website besuchen
                </a>
              </div>
            </div>
          </div>

          <!-- Termine -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Termine</h3>
            <div class="flex gap-3 overflow-x-auto pb-2">
              <div v-for="date in dates" :key="date.toISOString()"
                class="flex-shrink-0 bg-primary/3 border-2 border-primary/50 rounded-sm p-1.5  text-center">
                <div class="text-sm">
                  <p class="font-medium text-gray-900">
                    {{ date.toLocaleDateString('de-DE', { weekday: 'short' }) }} {{ date.getDate() }}
                  </p>
                  <p class="text-gray-600">
                    {{ date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' }) }}
                  </p>
                  <p class="text-gray-800 font-medium mt-1">
                    {{ new Date(eventData.startDate).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>