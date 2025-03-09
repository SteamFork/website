<script setup lang="ts">
import {useCustomTheme} from '~/composables/useCustomTheme'

const {isDark, toggle} = useCustomTheme()
const toggleTheme = () => {
  console.log(isDark)
  toggle()
}
</script>

<template>
  <v-btn variant="text" @click="toggleTheme" :icon="!isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"/>
</template>

<style scoped>

</style>
