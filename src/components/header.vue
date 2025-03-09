<script setup lang="ts">
import {ref, shallowRef} from 'vue'
import ThemeSwitch from "~/components/elements/ThemeSwitch.vue";

// https://mkody.github.io/vue3-simple-icons/
import {GitHubIcon, DiscordIcon, ReadTheDocsIcon} from '@mkody/vue3-simple-icons'

// Sidebar - hidden as the default
const drawer = ref(false);
const docsIconComponent = shallowRef(ReadTheDocsIcon);

// Navigation menu items
const menuItems = ref([
  /*{title: 'Docs', path: 'https://wiki.steamfork.org/', icon: docsIconComponent},*/
  {title: 'Docs', path: '/', icon: docsIconComponent},
])

// Helper function that returns the proper binding object:
const getButtonProps = (path: string) => {
  // Test if path starts with http(s)://
  if (/^https?:\/\//.test(path)) {
    return {href: path, target: '_blank'}
  } else {
    return {to: path}
  }
}
</script>

<template>
  <!--  TODO: Make header transparent -->
  <v-app-bar flat color="transparent" class="position-absolute">
    <v-app-bar-nav-icon class="d-sm-none" variant="text" @click.stop="drawer = !drawer"/>

    <v-toolbar-title class="icon transparent">
      <router-link to="/" tag="span" style="cursor: pointer">
        <span class="header-left">
          <img src="/assets/logo.png"
               alt="Steam Fork Site Logo"
               style="height:40px;"/>
        </span>
      </router-link>
    </v-toolbar-title>

    <v-spacer/>

    <v-toolbar-items>
      <v-btn class="d-none d-sm-flex"
             v-for="item in menuItems"
             :key="item.title"
             v-bind="getButtonProps(item.path)"
             :prepend-icon="item.icon" variant="text">
        {{ item.title }}
      </v-btn>
      <v-spacer class="hidden-xs-only"/>

      <v-btn variant="text" density="compact" class="">
        <GitHubIcon style="fill: white"/>
      </v-btn>
      <v-btn variant="text">
        <DiscordIcon/>
      </v-btn>


      <!--      <v-spacer/>
            <ThemeSwitch/>-->
    </v-toolbar-items>
  </v-app-bar>


  <v-navigation-drawer
      v-model="drawer"
      temporary
  >
    <v-list>

      <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title">
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
