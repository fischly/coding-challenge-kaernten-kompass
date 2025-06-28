<script lang="ts" setup>

</script>

<template>
    <!-- Results Count -->
    <div class="mb-6 flex justify-between items-center">
        <p class="text-gray-600"><span class="animate-pulse">Lade Veranstaltungen...</span></p>
        <!-- <p class="text-sm text-gray-500">Bitte warten.</p> -->
    </div>

    <!-- Events Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard> -->
        <div v-for="n in 3" :key="n"
            class="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-gray-100">
            <div class="aspect-video overflow-hidden relative">
                <div class="w-full h-full bg-gray-200 animate-pulse"></div>
            </div>
            <div class="p-6">
                <div class="h-4 w-3/4 bg-gray-200 animate-pulse mb-3"></div>
                <div class="h-4 w-1/2 bg-gray-200 animate-pulse mb-3"></div>
            </div>
        </div>
    </div>
</template>