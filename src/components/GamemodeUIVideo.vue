<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import gameModeImage from '../assets/steam-gamemode-ui-2.jpg';

// Reference for the container element to calculate its position
const containerRef = ref<HTMLElement | null>(null);

// Reactive values for the zoom scale and whether to show the video
const scale = ref(0.8); // initial scale (80%)
const showVideo = ref(false);
const videoSrc = ref<string>('');

// Configuration: minimum and maximum scales, and the threshold to swap to video
const minScale = 0.8;
const maxScale = 1.0;
const threshold = 0.99;

// A simple throttle function to avoid excessive scroll event handling
function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let lastCall = 0;
  return ((...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}

// This function calculates the progress based on the container's position in the viewport.
// It then interpolates the scale value between minScale and maxScale and determines whether to show the video.
const handleScroll = () => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  // Calculate progress: when the container's top is at the bottom of the viewport, progress is 0;
  // when the container's top reaches the top of the viewport, progress is 1.
  let progress = (window.innerHeight - rect.top) / window.innerHeight;
  progress = Math.min(Math.max(progress, 0), 1);
  scale.value = minScale + (maxScale - minScale) * progress;
  // Swap to video if the scale reaches or exceeds the threshold.
  showVideo.value = scale.value >= threshold;
};

const throttledHandleScroll = throttle(handleScroll, 20);

onMounted(async () => {
  window.addEventListener('scroll', throttledHandleScroll);
  // Set initial values based on the current scroll position.
  handleScroll();
  // Dynamically import the video asset after the initial page load.
  const videoModule = await import('../assets/steam-gamemode-ui-2.mp4');
  videoSrc.value = videoModule.default || videoModule;
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttledHandleScroll);
});
</script>

<template>
  <div ref="containerRef" class="video-container">
    <!-- Show the image when the scale is below the threshold -->
    <img
        v-if="!showVideo"
        :src="gameModeImage"
        alt="Zooming Visual"
        class="zoom-image"
        :style="{ transform: `scale(${scale})` }"
    />
    <!-- Show the video once the scale reaches the threshold -->
    <video
        v-else
        class="video-player"
        :src="videoSrc"
        autoplay
        muted
        loop
    ></video>
  </div>
</template>

<style scoped>
.video-container {
  width: 100%;
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  overflow: hidden;
}

.zoom-image {
  width: 100%;
  max-width: 100%;
  /* Smoothly transition the transform property as the user scrolls */
  transition: transform 0.2s ease-out;
}

.video-player {
  width: 100%;
  height: auto;
}
</style>
