<template>
  <div class="carousel-container">
    <transition
        mode="out-in"
        :enter-active-class="enterAnimation"
        :leave-active-class="leaveAnimation"
    >
      <img
          v-if="currentSlide"
          :key="currentSlide.id"
          :src="currentSlide.image"
          alt="Device Image"
          class="device-image"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch} from 'vue';

interface Slide {
  id: number;
  image: string;
}

const slides = ref<Slide[]>([
  {id: 1, image: "https://wiki.steamfork.org/_inc/images/devices/asus-rog-ally.png"},
  {id: 2, image: "https://wiki.steamfork.org/_inc/images/devices/ayaneo-2s.png"},
  {id: 3, image: "https://wiki.steamfork.org/_inc/images/devices/ayn-loki.png"},
  {id: 4, image: "https://wiki.steamfork.org/_inc/images/devices/ayaneo-flip-ds.png"}
]);

// Helper function to shuffle an array (Fisher–Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Create a reactive copy of slides in a randomized order.
const shuffledSlides = ref<Slide[]>(shuffleArray(slides.value));

// Use currentIndex to iterate through the shuffledSlides
const currentIndex = ref(0);
const currentSlide = computed(() => shuffledSlides.value[currentIndex.value]);

// Determine the current side based on slide id: even -> left, odd -> right.
const currentSide = computed(() => (currentSlide.value.id % 2 === 0 ? 'left' : 'right'));

// Store previous side for the leaving animation.
const lastSide = ref(currentSide.value);
watch(currentSlide, (newSlide, oldSlide) => {
  if (oldSlide) {
    lastSide.value = oldSlide.id % 2 === 0 ? 'left' : 'right';
  }
});

// Define a set of animation options.
const animationOptions = [
  {enter: 'animate__zoomInLeft', leave: 'animate__zoomOutRight'},
  {enter: 'animate__zoomInRight', leave: 'animate__zoomOutRight'},
];

function randomAnimation() {
  const idx = Math.floor(Math.random() * animationOptions.length);
  return animationOptions[idx];
}

const enterAnimation = ref('');
const leaveAnimation = ref('');
const setAnimations = () => {
  const anim = randomAnimation();
  // Apply the randomly selected animations.
  enterAnimation.value = `animate__animated ${anim.enter} animate__slower`;
  leaveAnimation.value = `animate__animated ${anim.leave} animate__slower`;
};

const nextSlide = () => {
  setAnimations();
  // If we're on the last slide of the current shuffle, reshuffle for a new cycle.
  if (currentIndex.value === shuffledSlides.value.length - 1) {
    shuffledSlides.value = shuffleArray(slides.value);
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
};

let intervalId: number | undefined;
onMounted(() => {
  setAnimations();
  intervalId = window.setInterval(nextSlide, 10000);
});
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

/* The container is now relatively positioned so it stays within its parent */
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  display: flex;
  align-items: self-start;
  justify-content: center;
}

.device-image {
  max-height: 70vh; /* 70% of viewport height */
  object-fit: contain;
  display: block;
}
</style>
