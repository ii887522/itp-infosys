<template>
  <q-header elevated class="relative-position">
    <div class="row bg-dark">
      <q-toolbar class="col q-px-none">
        <q-btn class="q-mr-md" label="MyITPHub" icon="img:/favicon.png" no-caps to="/" size="lg" unelevated />
        <itp-nav :items="nav" />
      </q-toolbar>

      <user-card v-if="showUserCard" class="col-auto" />
    </div>

    <transition name="slide">
      <internship-search v-show="showSearch" class="absolute full-width" style="z-index: -1" />
    </transition>
  </q-header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ItpNav from './ItpNav.vue'
import UserCard from './UserCard.vue'
import InternshipSearch from './itp-post/InternshipSearch.vue'
import { type RouteLocationNormalized, onBeforeRouteUpdate } from 'vue-router'
import { useLocalStorageStore } from 'stores/localstorage-store'
import { useRouter } from 'vue-router'

const router = useRouter()
const lsStore = useLocalStorageStore()

const nav = [
  {
    icon: 'search',
    label: 'Search',
    onClick: () => {
      showSearch.value = !showSearch.value
    },
    show: (to: RouteLocationNormalized) =>
      lsStore.getIsAuthenticated() === true &&
      lsStore.getAuthUserType() === 'stud' &&
      (to.fullPath === '/' ||
        to.fullPath === '/stud/itp-post/internships' ||
        to.fullPath === '/emp/itp-post/internships'),
  },
  {
    to: '/stud/itp-post/internship-app-queue',
    icon: 'list',
    label: 'My Application',
    show: () => store.getIsAuthenticated() === true && store.getAuthUserType() === 'stud',
  },
  {
    to: '/admin/itp-prog',
    icon: 'construction',
    label: 'Program',
  },
  {
    to: '/emp/itp-post/internship-app-queue',
    icon: 'list',
    label: 'Student Applications',
    show: () => store.getIsAuthenticated() === true && store.getAuthUserType() === 'emp',
  },
]

const showSearch = ref(false)
const showUserCard = ref(lsStore.getIsAuthenticated() === true)

watch(router.currentRoute, () => {
  showUserCard.value = lsStore.getIsAuthenticated() === true
})

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
