<script setup lang="ts">

const emit = defineEmits<{
    eventsFiltered: [searchText: string, selectedCategory: string, dateRange: { start?: Date, end?: Date } | null]
}>()

const searchText = ref('');
const selectedCategory = ref('');
const dateRange = ref();

const formattedDateRange = computed(() => {
    if (!dateRange.value || !dateRange.value.start || !dateRange.value.end) return 'Datum wählen...';

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return `${formatDate(dateRange.value.start)} - ${formatDate(dateRange.value.end)}`;
});

const applyFilters = () => {
    const dateFilter = dateRange.value && dateRange.value.start ? dateRange.value : null;
    emit('eventsFiltered', searchText.value, selectedCategory.value, dateFilter);
};
</script>

<template>
    <div class="bg-white p-6 rounded-lg border-t-5 border-t-primary border border-gray-100 shadow-md mb-8">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Filter</h3>

        <div class="overflow-visible grid grid-cols-1 md:grid-cols-7 gap-4">
            <!-- Search Input -->
            <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Volltextsuche
                </label>
                <input type="text" v-model="searchText" placeholder="Veranstaltung suchen..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>

            <!-- Category Select -->
            <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Kategorie
                </label>
                <select v-model="selectedCategory"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">

                </select>
            </div>

            <!-- Date Picker -->
            <div class="relative col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Datum
                </label>
                <div class="flex gap-2">
                    <div class="flex-1">
                        <VDatePicker v-model.range="dateRange" mode="date">
                            <template #default="{ togglePopover, popover }">
                                <button class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-left"
                                    :class="{ 'ring-2 ring-primary border-transparent': popover }"        
                                    @click="togglePopover">
                                    {{ formattedDateRange }}
                                </button>
                            </template>
                        </VDatePicker>
                    </div>
                    <button v-if="dateRange" @click="dateRange = null" class="px-3 py-2 text-gray-500 hover:text-gray-700"
                        title="Datum-Filter löschen">
                        ✕
                    </button>
                </div>
            </div>

            <div class="flex items-end">
                <button type="submit" @click="applyFilters"
                    class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-primary/80">
                    Anwenden
                </button>
            </div>
        </div>
    </div>
</template>