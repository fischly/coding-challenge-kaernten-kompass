<script setup lang="ts">
import type { Category } from '@/data/types/Category';

// Reactive states for ACTIVE filters (stored between client navigation)
const filterSearchText = useState<string>('filterSearchText', () => '');
const filterDateRange = useState<{ start?: string, end?: string } | null>('filterDateRange', () => null);
const filterSelectedCategory = useState<string>('filterSelectedCategory', () => '');

// Reactive state for the current page
const currentPage = useState('currentPage', () => 1);

// Reactive states for the UI (non-navigation persistent)
const searchText = ref(filterSearchText.value);
const selectedCategory = ref(filterSelectedCategory.value);
const dateRange = ref(filterDateRange.value);
const realDateRange = ref();

const onupdatepicker = (newVal: { start?: Date, end?: Date }) => {
    if (!dateRange.value) { dateRange.value = {}; }

    if (newVal.start) {
        dateRange.value.start = newVal.start.toISOString().split('T')[0];
    }
    if (newVal.end) {
        dateRange.value.end = newVal.end.toISOString().split('T')[0];
    }
};


// Fetch categories to display in the category select
const { data: categories } = await useFetch<Category[]>('/api/categories', {
    method: 'GET',
    transform: (data) => {
        return data.sort((a: Category, b: Category) => a.name.localeCompare(b.name));
    }
});

// Format the date range for display on date picker selection
const formattedDateRange = computed(() => {
    if (!dateRange.value || !dateRange.value.start || !dateRange.value.end) return 'Datum wählen...';

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return `${formatDate(dateRange.value.start)} - ${formatDate(dateRange.value.end)}`;
});

// Emits the filter values as event and resets the page to 1
const applyFilters = () => {
    // Reset page to 1
    currentPage.value = 1;

    filterSearchText.value = searchText.value;
    filterDateRange.value = dateRange.value;
    filterSelectedCategory.value = selectedCategory.value;

    // Force a refresh of cached event data
    refreshNuxtData('events');
};

// Highlight today
const calendarAttributes = [{
    dot: true,
    dates: new Date()
}];
</script>

<template>
    <div id="event-filters"
        class="bg-white p-6 rounded-lg border-t-5 border-t-primary border border-gray-100 shadow-md mb-8">
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
                    <option value="">Alle Kategorien</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                    </option>
                </select>
            </div>

            <!-- Date Picker -->
            <div class="relative col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Datum
                </label>
                <div class="flex gap-2">
                    <div class="flex-1">
                        <VDatePicker v-model.range="realDateRange" mode="date" @update:model-value="onupdatepicker"
                            :attributes="calendarAttributes">
                            <template #default="{ togglePopover, popover }">
                                <button
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-left"
                                    :class="{ 'ring-2 ring-primary border-transparent': popover }"
                                    @click="togglePopover">
                                    {{ formattedDateRange }}
                                </button>
                            </template>
                        </VDatePicker>
                    </div>
                    <button v-if="dateRange" @click="dateRange = null"
                        class="px-3 py-2 text-gray-500 hover:text-gray-700" title="Datum-Filter löschen">
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