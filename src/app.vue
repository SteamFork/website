<script setup lang="ts">
import {useCustomTheme} from '~/composables/useCustomTheme'

const {isDark} = useCustomTheme()
</script>

<template>
  <VApp :theme="isDark ? 'dark' : 'light'">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </VApp>
</template>