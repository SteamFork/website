<script setup lang="ts">
// No additional script logic needed for this static section.
// You can add reactive state or methods if you need to enhance the interactivity later.
import GamemodeUIVideo from "~/components/GamemodeUIVideo.vue";
</script>

<template>
  <div class="video-section">
<!--    <div class="video-overlay">
      <GamemodeUIVideo/>
    </div>-->
    <div class="video-description">
      <h2>Experience SteamFork in Action</h2>
      <p>
        Watch as every swipe and tap transforms your handheld console experience. SteamFork’s intuitive UI not only
        makes navigation a breeze but also delivers the power and flexibility you need to customize your gaming journey.
      </p>
      <p>
        Whether you're launching your favorite game, managing your media, or diving into new adventures, our platform
        puts innovation right at your fingertips. Feel the synergy of sleek design and cutting-edge technology, and
        discover why SteamFork is the essential upgrade for your handheld device.
      </p>
    </div>
  </div>
</template>

<style scoped>
.video-section {
  margin-top: 3rem;
  text-align: center;
  padding: 2rem 1rem;
}

.video-overlay {
  /* Style your video overlay element or component here */
  margin: 0 auto;
  max-width: 800px;
  /* You could include additional styling such as border, shadow, etc. */
}

.video-description {
  margin-top: 1.5rem;
  padding: 1rem;
}

/* Apply a text shadow effect to enhance readability on varied backgrounds */
.video-description h2,
.video-description p {
  color: #fff;
  text-shadow: -1px -1px 0 #000,
  1px -1px 0 #000,
  -1px 1px 0 #000,
  1px 1px 0 #000;
}

.video-description h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.video-description p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>
