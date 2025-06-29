<script setup lang="ts">
import type { Image } from '@/data/types/Image';

const props = defineProps<{
    images: Image[];
}>();

const isModalOpen = ref(false);
const currentImageIndex = ref(0);

const currentImage = computed(() => props.images[currentImageIndex.value]);

const openModal = (index: number) => {
    currentImageIndex.value = index;
    isModalOpen.value = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    isModalOpen.value = false;

    // Enable body scroll agian
    document.body.style.overflow = 'auto';
};

const nextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length;
};

const prevImage = () => {
    currentImageIndex.value = (currentImageIndex.value - 1 + props.images.length) % props.images.length;
};

// Handle keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
    if (!isModalOpen.value) return;
    
    switch (event.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
    }
};

// Add event listeners
onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
    // Ensure body scroll is restored
    document.body.style.overflow = 'auto';
});
</script>

<template>
    <div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Bildergalerie</h2>
        
        <!-- Thumbnail Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
                v-for="(image, index) in images" 
                :key="image.id"
                class="relative cursor-pointer group"
                @click="openModal(index)"
            >
                <div class="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img 
                        :src="image.thumbnailUrl" 
                        :alt="image.caption || `Bild ${index + 1}`"
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <!-- <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg"></div> -->
                
                <!-- Copyright notice on thumbnail if exists -->
                <div 
                    v-if="image.copyrightNotice" 
                    class="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    {{ image.copyrightNotice }}
                </div>
            </div>
        </div>

        <!-- Modal -->
        <Teleport to="body">
            <div 
                v-if="isModalOpen" 
                class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-90"
                @click="closeModal"
            >
                <!-- Modal Content -->
                <div class="relative max-w-7xl mx-4" @click.stop>
                    <!-- Close Button -->
                    <button 
                        @click="closeModal"
                        class="absolute top-4 right-4 z-10 w-10 h-10 bg-primary opacity-85 hover:opacity-100 cursor-pointer text-white rounded-full flex items-center justify-center transition-all duration-200"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <!-- Navigation Buttons -->
                    <button 
                        v-if="images.length > 1"
                        @click="prevImage"
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-15 w-12 h-12 bg-primary opacity-85 hover:opacity-100 text-white rounded-full flex items-center justify-center transition-all duration-200"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>

                    <button 
                        v-if="images.length > 1"
                        @click="nextImage"
                        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-primary opacity-85 hover:opacity-100 text-white rounded-full flex items-center justify-center transition-all duration-200"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    <!-- Main Image -->
                    <div class="flex flex-col items-center">
                        <div class="relative max-w-full max-h-[80vh]">
                            <!-- Note: a key is needed to force a re-render between navigations... took me a while -->
                            <NuxtImg 
                                :key="`modal-image-${currentImageIndex}`"
                                :src="currentImage.url" 
                                :alt="currentImage.caption || `Bild ${currentImageIndex + 1}`"
                                :custom="true"
                                class="max-w-full max-h-[80vh] object-contain rounded-lg"
                                v-slot="{ src, isLoaded, imgAttrs }"
                            >
                                <!-- Loading Placeholder -->
                                <div 
                                    v-if="!isLoaded" 
                                    class="flex items-center justify-center max-h-[80vh] min-h-[300px] min-w-[300px] max-w-[80vw] aspect-video bg-gray-800 rounded-lg"
                                >
                                    <div class="text-center text-white">
                                        <!-- Loading Spinner -->
                                        <div class="inline-block  rounded-full h-12 w-12 animate-spin border-t-1 border-white mb-4"></div>
                                        <p class="text-lg font-medium">Bild wird geladen...</p>
                                    </div>
                                </div>
                                
                                <!-- Actual Image when loaded -->
                                <img 
                                    v-if="isLoaded"
                                    v-bind="imgAttrs"
                                    :src="src"
                                    class="max-w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300"
                                />
                            </NuxtImg>
                        </div>
                        
                        <!-- Image Info -->
                        <div class="mt-4 text-white text-center max-w-2xl">
                            <!-- Image Counter -->
                            <div class="text-sm opacity-75 mb-2">
                                {{ currentImageIndex + 1 }} von {{ images.length }}
                            </div>
                            
                            <!-- Caption -->
                            <h3 v-if="currentImage.caption" class="text-lg font-medium mb-2">
                                {{ currentImage.caption }}
                            </h3>
                            
                            <!-- Description -->
                            <p v-if="currentImage.description" class="text-sm opacity-90 mb-2">
                                {{ currentImage.description }}
                            </p>
                            
                            <!-- Copyright -->
                            <p v-if="currentImage.copyrightNotice" class="text-xs opacity-75">
                                © {{ currentImage.copyrightNotice }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>