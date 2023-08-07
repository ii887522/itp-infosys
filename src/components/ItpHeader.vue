<template>
  <q-header elevated class="relative-position">
    <div class="row bg-dark">
      <q-toolbar class="col q-px-none">
        <q-btn class="q-mr-md" label="MyITPHub" icon="img:/favicon.png" no-caps to="/" size="lg" unelevated />
        <itp-nav :items="nav" />
      </q-toolbar>

      <user-card class="col-auto" />
    </div>

    <transition name="slide">
      <internship-search v-show="showSearch" class="absolute full-width" style="z-index: -1" />
    </transition>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ItpNav from './ItpNav.vue'
import UserCard from './UserCard.vue'
import InternshipSearch from './itp-post/InternshipSearch.vue'
import { type RouteLocationNormalized, onBeforeRouteUpdate } from 'vue-router'

const nav = [
  {
    icon: 'search',
    label: 'Search',
    onClick: () => {
      showSearch.value = !showSearch.value
    },
    show: (to: RouteLocationNormalized) => to.fullPath === '/',
  },
  { to: '/', icon: 'info', label: 'Menu' },
  { to: '/', icon: 'info', label: 'Menu' },
  { to: '/', icon: 'info', label: 'Menu' },
]

const showSearch = ref(false)

onBeforeRouteUpdate(() => {
  showSearch.value = false
})
</script>

<style scoped lang="scss">
.slide {
  &-enter-active,
  &-leave-active {
    transition: transform 0.1s linear;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(-86px);
  }
}
</style>
