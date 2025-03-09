<script setup lang="ts">

</script>

<template>
  <div class="landing-page">
    <header class="hero-header">
      <h1>Unleash the Future with SteamFork</h1>
      <p class="tagline">Elevate your handheld gaming experience.</p>
    </header>
    <section class="hero-content">
      <p>
        Discover SteamFork – not just an operating system, but a dynamic platform that transforms your handheld console into a powerhouse of gaming and productivity. Designed with speed, innovation, and community in mind, SteamFork gives you the performance boost and cutting-edge features you need to play, create, and explore.
      </p>
      <p>
        Step into a new era of portable gaming where performance meets style. Join the SteamFork revolution and redefine what your console can do!
      </p>
    </section>
  </div>
</template>

<style scoped>
.landing-page {
  padding: 3rem 1rem;
  text-align: center;
  min-height: 100vh;
}

/* Apply a drop-shadow effect that outlines the text for enhanced readability */
.hero-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
}

.hero-header .tagline {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 2rem;
  text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
}

.hero-content {
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
}

.hero-content p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #fff;
  margin-bottom: 1.5rem;
  text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
}
</style>
