<template>
    <div class="relative overflow-hidden w-full">
      <div class="flex items-center justify-start transition-opacity duration-1200  ease-in-out">
        <img :src="currentImage.src" :alt="currentImage.alt" class="w-full rounded-lg object-cover">
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue';
  
  const images = ref([
    { src: 'https://shopzetu.com/cdn/shop/files/Top_Picks_Website_Banner_882c45ca-54ec-4382-9e01-a05a4e400e80.jpg?v=1714626017&width=1920', alt: 'Image 1' },
    { src: 'https://shopzetu.com/cdn/shop/files/Top_Picks_Website_Banner_882c45ca-54ec-4382-9e01-a05a4e400e80.jpg?v=1714626017&width=1920', alt: 'Image 2' },
    { src: 'https://shopzetu.com/cdn/shop/files/Vivo_Safari_Website_Banner_82f4c114-9392-4ede-a918-614293a7180d.jpg?v=1715944238&width=1920', alt: 'Image 3' },
    { src: 'https://shopzetu.com/cdn/shop/files/Athleisure_Website_Banner_5.jpg?v=1715688655&width=1920', alt: 'Image 3' },
    { src: 'https://shopzetu.com/cdn/shop/files/jpeg-optimizer_Lola_Web_banner-2.png?v=1708065466&width=1920', alt: 'Image 3' },
    { src: 'https://shopzetu.com/cdn/shop/files/Vivo_Safari_Website_Banner_82f4c114-9392-4ede-a918-614293a7180d.jpg?v=1715944238&width=1920', alt: 'Image 3' },
    { src: 'https://shopzetu.com/cdn/shop/files/Sweather_Weather_Website_Banner_copy.jpg?v=1716351932&width=1920', alt: 'Image 3' },
    { src: 'https://shopzetu.com/cdn/shop/files/Lizola_Website_Banner.jpg?v=1712894872&width=1920', alt: 'Image 3' },
    { src: 'https://shopzetu.com/cdn/shop/files/Kids_Fashion_Website_Banner.jpg?v=1713422650&width=1920', alt: 'Image 3' },

]);

  
 
let currentSlide = ref(0);
let slideInterval;

const startSlide = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % images.value.length;
  }, 4000); 
};

onMounted(startSlide);

const stopSlide = () => {
  clearInterval(slideInterval);
};

onUnmounted(stopSlide);

const currentImage = computed(() => images.value[currentSlide.value]);
</script>
  