<template>
  <q-layout view="hHh LpR fFf">
    <itp-header />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import ItpHeader from 'components/ItpHeader.vue'
</script>
