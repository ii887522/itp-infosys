<template>
  <q-page class="text-body1" padding>
    <div class="row">
      <div class="col-8">
        <div class="q-mb-md">
          <q-btn class="q-mr-sm" icon="arrow_back" to="/" size="xl" unelevated round dense />
          <span class="vertical-middle text-h4">{{ store.value.title }}</span>
        </div>

        <q-icon name="apartment" left size="sm" />
        <a class="vertical-middle" href="#company-description">{{ store.value.company_name }}</a>
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
      </div>

      <div class="col-4">
        <internship-app-form />
      </div>
    </div>

    <div class="text-h5 q-mb-md">Job Description</div>
    <div class="q-mb-xl" v-html="sanitizeHtml(store.value.description)"></div>
    <div id="company-description" class="text-h5 q-mb-md">About {{ store.value.company_name }}</div>
    <div class="q-mb-xl" v-html="sanitizeHtml(store.value.company_description)"></div>
    <div class="text-h5 q-mb-md">Company Photos</div>

    <q-carousel
      class="q-mb-xl"
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
      <q-carousel-slide v-for="(photoUrl, index) in photoUrls" :key="photoUrl" :name="index">
        <q-img
          decoding="async"
          :draggable="false"
          fit="contain"
          no-native-menu
          alt="Company Photo"
          :src="photoUrl"
          height="496px"
        />
      </q-carousel-slide>
    </q-carousel>

    <div class="text-h5 q-mb-md">Additional Info</div>

    <div class="row q-col-gutter-lg">
      <div class="col-auto">
        <div class="text-grey-7">
          <q-icon class="q-mr-sm" name="margin" />
          <span class="text-caption">Company Size</span>
        </div>

        <div class="q-mb-md">
          <span>{{ store.value.company_size }} persons</span>
        </div>
      </div>

      <div class="col">
        <div class="text-grey-7">
          <q-icon class="q-mr-sm" name="location_on" />
          <span class="text-caption">Company Address</span>
        </div>

        <div class="q-mb-md">
          <a :href="`https://www.google.com/maps/dir/?api=1&destination=${store.value.address}`" target="_blank">
            {{ store.value.address }}
          </a>
        </div>
      </div>

      <div class="col">
        <div class="text-grey-7">
          <q-icon class="q-mr-sm" name="link" />
          <span class="text-caption">Company Website</span>
        </div>

        <div class="q-mb-md">
          <a :href="store.value.company_url" target="_blank">{{ store.value.company_url }}</a>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInternshipDetailsStore } from 'stores/itp-post-store'
import { useMeta } from 'quasar'
import { categoryColor } from 'src/consts/itp-post'
import sanitizeHtml from 'sanitize-html'
import InternshipAppForm from 'components/itp-post/InternshipAppForm.vue'

const store = useInternshipDetailsStore()
useMeta({ title: `${store.value.title} | MyITPHub` })

const slide = ref(0)

const photoUrls = [
  new URL('../../assets/company-profile-presentation-tips.jpg', import.meta.url).href,
  new URL('../../assets/download.jpeg', import.meta.url).href,
  new URL('../../assets/istockphoto-1407354641-170667a.webp', import.meta.url).href,
  new URL('../../assets/Münster,_LVM,_Bürogebäude_--_2013_--_5149-51.jpg', import.meta.url).href,
  new URL('../../assets/photo-1570126618953-d437176e8c79.jpeg', import.meta.url).href,
]
</script>
