<script setup lang="ts">
// import { events } from '@/data/events';
import parse from '@/data/parse';

const filterSearchText = ref('');
const filterSelectedCategory = ref('');

</script>

<template>
    <div class="mx-auto px-4 sm:px-6 lg:px-8 ">
        <!-- 
        <pre>{{ status }}</pre>
        <pre>{{ error }}</pre> -->


        <!-- Filters -->
        <EventFilters @eventsFiltered="(searchText: string, selectedCategory: string) => {
            filterSearchText = searchText;
            filterSelectedCategory = selectedCategory;

            refreshNuxtData('events');
        }"></EventFilters>

        <ClientOnly>
            <EventGrid :filterSearchText="filterSearchText" :filterSelectedCategory="filterSelectedCategory"></EventGrid>


            <template #fallback>
                <EventGridSkeletton></EventGridSkeletton>
            </template>
        </ClientOnly>



    </div>
</template>