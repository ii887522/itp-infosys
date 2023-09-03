<template>
  <q-card style="background-color: rgba(0, 0, 0, 0.75)">
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="64px" color="primary" />
    </q-inner-loading>

    <q-card-section class="text-white text-center row items-center" style="height: 304px">
      <div v-show="!loading" class="col-12">You have already applied this internship from this company</div>

      <q-btn
        v-show="!loading"
        class="col-12"
        icon="visibility"
        label="View my application"
        color="info"
        to="/stud/itp-post/internship-app-queue"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ loading: boolean }>(), { loading: false })
</script>
