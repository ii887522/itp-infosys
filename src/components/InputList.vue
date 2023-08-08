<template>
  <div v-for="index in modelValue.length" :key="index" v-bind="$attrs">
    <slot :index="index - 1" :onItemChange="onItemChange"></slot>
    <!-- <q-input
      name="learning_outcome"
      clearable
      v-model="learningOutcomes[index - 1]"
      outlined
      dense
      @update:model-value="value => onItemChange(index - 1, value as string | null)"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { isTextEmpty } from 'src/common'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ modelValue: string[] }>()
const emit = defineEmits<{ (event: 'update:modelValue', payload: string[]): void }>()

function onItemChange(index: number, value: string | null) {
  if (index === props.modelValue.length - 1 && !isTextEmpty(value)) {
    emit('update:modelValue', [...props.modelValue, ''])
  } else if (index === props.modelValue.length - 2 && isTextEmpty(value)) {
    for (let i = props.modelValue.length - 2; i >= 0 && isTextEmpty(props.modelValue[i]); --i)
      emit('update:modelValue', props.modelValue.slice(0, i + 1))
  }
}
</script>
