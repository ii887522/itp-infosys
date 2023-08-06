<template>
  <q-page class="text-body1" padding>
    <div class="q-mb-md">
      <q-btn class="q-mr-sm" icon="arrow_back" to="/" size="xl" unelevated round dense />
      <span class="vertical-middle text-h4">{{ store.value.title }}</span>
    </div>

    <q-icon name="apartment" left size="sm" />
    <span class="vertical-middle">{{ store.value.company_name }}</span>
    <br />

    <q-chip
      v-for="category in store.value.categories"
      :key="category"
      class="q-ml-none q-mr-sm"
      :color="categoryColor[category]"
      text-color="white"
      icon="category"
      :label="category"
      :ripple="false"
    />
    <br />

    <template v-if="store.value.min_allowance != null">
      <span class="text-bold">
        RM {{ store.value.min_allowance }} {{ store.value.max_allowance != null ? '-' : '' }}
        {{ store.value.max_allowance }}
      </span>
      <br />
    </template>

    <div class="q-mb-xl">
      <q-icon class="q-mr-xs" name="location_on" size="sm" color="primary" />
      <span>{{ store.value.location }}</span>
    </div>

    <div class="text-h5">Learning Outcome</div>

    <ul class="q-mb-xl" style="padding-left: 18px">
      <li v-for="learningOutcome in store.value.learning_outcomes" :key="learningOutcome">{{ learningOutcome }}</li>
    </ul>

    <div class="text-h5 q-mb-md">Job Description</div>
    <div class="q-mb-xl" v-html="sanitizeHtml(store.value.description)"></div>
    <div class="text-h5 q-mb-md">About {{ store.value.company_name }}</div>
    <div class="q-mb-xl" v-html="sanitizeHtml(store.value.company_description)"></div>
    <div class="text-h5 q-mb-md">Company Photos</div>

    <q-carousel
      animated
      infinite
      swipeable
      :autoplay="10000"
      arrows
      navigation
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      height="512px"
      control-color="primary"
    >
      <q-carousel-slide :name="0">
        <q-img
          decoding="async"
          :draggable="false"
          fit="contain"
          no-native-menu
          alt="Company Photo"
          src="~assets/company-profile-presentation-tips.jpg"
          height="496px"
        />
      </q-carousel-slide>

      <q-carousel-slide :name="1">
        <q-img
          decoding="async"
          :draggable="false"
          fit="contain"
          no-native-menu
          alt="Company Photo"
          src="~assets/download.jpeg"
          height="496px"
        />
      </q-carousel-slide>

      <q-carousel-slide :name="2">
        <q-img
          decoding="async"
          :draggable="false"
          fit="contain"
          no-native-menu
          alt="Company Photo"
          src="~assets/istockphoto-1407354641-170667a.webp"
          height="496px"
        />
      </q-carousel-slide>

      <q-carousel-slide :name="3">
        <q-img
          decoding="async"
          :draggable="false"
          fit="contain"
          no-native-menu
          alt="Company Photo"
          src="~assets/Münster,_LVM,_Bürogebäude_--_2013_--_5149-51.jpg"
          height="496px"
        />
      </q-carousel-slide>

      <q-carousel-slide :name="4">
        <q-img
          decoding="async"
          :draggable="false"
          fit="contain"
          no-native-menu
          alt="Company Photo"
          src="~assets/photo-1570126618953-d437176e8c79.jpeg"
          height="496px"
        />
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInternshipDetailsStore } from 'stores/itp-post-store'
import { useMeta } from 'quasar'
import { categoryColor } from 'src/consts/itp-post'
import sanitizeHtml from 'sanitize-html'

const store = useInternshipDetailsStore()
useMeta({ title: `${store.value.title} | MyITPHub` })

const slide = ref(0)
</script>
