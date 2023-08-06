<template>
  <q-layout view="hHh LpR fFf">
    <itp-header />

    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :key="route.path">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ItpHeader from 'components/ItpHeader.vue'
</script>
