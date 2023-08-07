<template>
  <q-list class="row">
    <q-item
      v-for="(item, index) in items"
      :key="index"
      v-show="shows[index]"
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
import { onBeforeRouteUpdate, type RouteLocationNormalized, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const props = withDefaults(
  defineProps<{
    items?: {
      to?: string
      icon: string
      label: string
      onClick?: () => void
      show?: (to: RouteLocationNormalized) => boolean
    }[]
  }>(),
  {
    items: () => [],
  }
)

const shows = ref<boolean[]>([])

onBeforeRouteUpdate(calcItemsVisibility)
calcItemsVisibility(router.currentRoute.value)

function calcItemsVisibility(to: RouteLocationNormalized) {
  shows.value = props.items.map(item => item.show?.call(item, to) ?? true)
}
</script>
