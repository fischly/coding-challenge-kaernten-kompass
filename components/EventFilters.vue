<script setup lang="ts">
defineEmits(['eventsFilered']);

const searchText = ref('');
const selectedCategory = ref('');
</script>

<template>
    <div class="bg-white p-6 rounded-lg border-t-5 border-t-primary border border-gray-100 shadow-md mb-8">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Filter</h3>

        <div class="overflow-visible grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Volltextsuche
                </label>
                <input type="text" v-model="searchText" placeholder="Veranstaltung suchen..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Kategorie
                </label>
                <select v-model="selectedCategory"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">

                </select>
            </div>

            <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Datum
                </label>
                <div class="flex gap-2">
                    <button
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-left">

                    </button>
                    <button class="px-3 py-2 text-gray-500 hover:text-gray-700"
                        title="Datum-Filter löschen">
                        ✕
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>