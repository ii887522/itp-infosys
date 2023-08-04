<template>
  <q-header elevated class="bg-dark row">
    <q-toolbar class="col q-px-none">
      <q-btn class="q-mr-md" label="MyITPHub" icon="img:/favicon.png" no-caps to="/" size="lg" unelevated />

      <q-tabs inline-label>
        <q-route-tab icon="info" label="Menu" to="/" />
        <q-route-tab icon="info" label="Menu" to="/" />
        <q-route-tab icon="info" label="Menu" to="/" />
        <q-route-tab icon="info" label="Menu" to="/" />
        <q-route-tab icon="info" label="Menu" to="/" />
      </q-tabs>
    </q-toolbar>

    <user-card class="col-auto" />
  </q-header>
</template>

<script setup lang="ts">
import UserCard from './UserCard.vue'
</script>
