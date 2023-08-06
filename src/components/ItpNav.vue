<template>
  <q-list class="row">
    <q-item
      v-for="(item, index) in items"
      :key="index"
      class="col-auto row items-center text-secondary"
      :to="item.to"
      clickable
      v-ripple
      @click="item.onClick?.call(item)"
    >
      <q-icon :name="item.icon" left size="sm" />
      <span class="text-body1">{{ item.label }}</span>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ items?: { to?: string; icon: string; label: string; onClick?: () => void }[] }>(), {
  items: () => [],
})
</script>
