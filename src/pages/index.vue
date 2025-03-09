<script setup lang="ts">
import background from '../assets/steam-gamemode-ui-2.jpg';
import backgroundVideo from '../assets/steam-gamemode-ui-2.mp4';
import astroLogo from '../assets/logo.png';

import Bubbles from '../components/Bubbles.vue'
import LandingIntro from '../components/LandingIntro.vue'
import DeviceMontage from '../components/DeviceMontage.vue'
import GamemodeUIVideo from '../components/GamemodeUIVideo.vue'

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="position-absolute hero-bubbles-container">
    <Bubbles/>
  </div>
  <v-container class="position-relative hero-content-container">
    <v-row no-gutters>
      <v-col cols="6">
        <LandingIntro/>
      </v-col>
      <v-col cols="6">
        <DeviceMontage/>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="gamemode-ui-video">
    <section>
      <GamemodeUIVideo/>
    </section>
  </v-container>
</template>

<style scoped>
.hero-bubbles-container {
  top: 0;
}

.hero-content-container {
  top: 100px;
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  z-index: 10;
}

.gamemode-ui-video {
  margin: 0;
  padding: 0;
}

.background-container {
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 800px;
  z-index: 0;
}

.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background: /* Top fade */ linear-gradient(to bottom, transparent 20%, rgba(0, 0, 0, 0.6) 50%, rgb(var(--v-theme-background)) 100%),
    /* Left fade */ linear-gradient(to right, rgb(var(--v-theme-background)) 5%, transparent 10%, transparent 100%, rgb(var(--v-theme-background)) 100%),
    /* Left fade */ linear-gradient(to right, rgb(var(--v-theme-background)) 5%, transparent 10%, transparent 100%, rgb(var(--v-theme-background)) 100%),
    /* Right fade */ linear-gradient(to left, rgb(var(--v-theme-background)) 5%, transparent 10%, transparent 100%, rgb(var(--v-theme-background)) 100%);
  mix-blend-mode: darken;
  z-index: 1;
}

/*.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background: linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 0.8) 20%, rgb(var(--v-theme-background)) 100%);
  mix-blend-mode: darken; !* Ensures darker areas blend naturally with the image *!
  z-index: 1; !* Place it above the background image *!
}*/

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(1px);
}


/* Gradient overlay: fades from transparent to white at 50% */
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
  pointer-events: none;
}

/* Existing styles */
#container {
  height: 100%;
}

main {
  height: 100%;
  display: flex;
  justify-content: center;
}

#hero {
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
}

h1 {
  font-size: 22px;
  margin-top: 0.25em;
}

#links {
  display: flex;
  gap: 16px;
}

#links a {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: #111827;
  text-decoration: none;
  transition: color 0.2s;
}

#links a:hover {
  color: rgb(78, 80, 86);
}

#links a svg {
  height: 1em;
  margin-left: 8px;
}

#links a.button {
  color: white;
  background: linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12),
  inset 0 -2px 0 rgba(0, 0, 0, 0.24);
  border-radius: 10px;
}

#links a.button:hover {
  color: rgb(230, 230, 230);
  box-shadow: none;
}

pre {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
  font-weight: normal;
  background: linear-gradient(14deg, #d83333 0%, #f041ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

h2 {
  margin: 0 0 1em;
  font-weight: normal;
  color: #111827;
  font-size: 20px;
}

p {
  color: #4b5563;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.006em;
  margin: 0;
}

code {
  display: inline-block;
  background: linear-gradient(66.77deg, #f3cddd 0%, #f5cee7 100%) padding-box,
  linear-gradient(155deg, #d83333 0%, #f041ff 18%, #f5cee7 45%) border-box;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 6px 8px;
}

.box {
  padding: 16px;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  border: 1px solid white;
}

#news {
  position: absolute;
  bottom: 16px;
  right: 16px;
  max-width: 300px;
  text-decoration: none;
  transition: background 0.2s;
  backdrop-filter: blur(50px);
}

#news:hover {
  background: rgba(255, 255, 255, 0.55);
}

@media screen and (max-height: 368px) {
  #news {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  #container {
    display: flex;
    flex-direction: column;
  }

  #hero {
    display: block;
    padding-top: 10%;
  }

  #links {
    flex-wrap: wrap;
  }

  #links a.button {
    padding: 14px 18px;
  }

  #news {
    right: 16px;
    left: 16px;
    bottom: 2.5rem;
    max-width: 100%;
  }

  h1 {
    line-height: 1.5;
  }
}
</style>