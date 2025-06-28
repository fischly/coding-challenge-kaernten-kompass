<script setup lang="ts">
const images = [
    "/images/carousel/kogel.jpeg",
    "/images/carousel/nudeln.jpg",
    "/images/carousel/kirchtag.jpeg",
    "/images/carousel/ski-fahren.jpg",
    // "/images/carousel/4.jpg",
];
</script>

<template>
    <div class="flex overflow-hidden drop-shadow-xl rounded-2xl mx-6 relative" aria-hidden>
        <div v-for="n in 2" :key="n" class="flex basis-full grow-0 shrink-0 animate-scrolling relative">
            <div v-for="image in images" :key="image" class="w-full h-[200px] bg-cover bg-center relative"
                :style="{ backgroundImage: `url(${image})` }">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 via-30% to-transparent">

</div>
            <div class="absolute top-0 right-0 w-full h-full">
                <img src="/images/compass.svg" alt="Compass Overlay" class="w-full invert drop-shadow-lg/100">
            </div>
        </div>

        <!-- <div class="absolute w-full flex"> -->
        <div
            class="absolute inset-6 text-4xl md:text-5xl lg:text-6xl text-white text-shadow-[0_0_35px_rgb(0_0_0_/_1)] font-caveat flex flex-col justify-end">
            <p>360° Wohlfühlen</p>
            <p class="ml-40">in Kärnten</p>
        </div>


        <!-- <div class="w-full text-6xl mr-12 text-white text-shadow-[0_0_35px_rgb(0_0_0_/_1)] font-caveat text-right">
                <span class="text-white">Kärnten</span>^
            </div> -->
    </div>
    <!-- </div> -->
    <!-- <div>
        <NuxtImg src="/images/carousel/1.jpg" alt="Event 1"></NuxtImg>
    </div> -->
</template>