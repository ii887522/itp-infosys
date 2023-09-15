<template>
  <q-page class="bg-wallpaper text-body1" padding>
    <div class="row">
      <div class="col-8">
        <div class="q-mb-md">
          <q-btn class="q-mr-sm" icon="arrow_back" size="xl" unelevated round dense @click="router.back()" />
          <span class="vertical-middle text-h4">{{ detailsStore.value.title }}</span>
        </div>

        <q-icon name="apartment" left size="sm" />
        <a class="vertical-middle" href="#company-description">{{ detailsStore.value.company_name }}</a>
        <br />

        <q-chip
          v-for="category in detailsStore.value.categories"
          :key="category"
          class="q-ml-none q-mr-sm"
          :color="categoryColor[category]"
          text-color="white"
          icon="category"
          :label="category"
          :ripple="false"
        />
        <br />

        <template v-if="detailsStore.value.min_allowance != null">
          <span class="text-bold">
            RM {{ detailsStore.value.min_allowance }} {{ detailsStore.value.max_allowance != null ? '-' : '' }}
            {{ detailsStore.value.max_allowance }}
          </span>
          <br />
        </template>

        <div class="q-mb-xl">
          <q-icon class="q-mr-xs" name="location_on" size="sm" color="primary" />
          <span>{{ detailsStore.value.location }}</span>
        </div>

        <div class="text-h5">Learning Outcome</div>

        <ul class="q-mb-xl" style="padding-left: 18px">
          <li v-for="learningOutcome in detailsStore.value.learning_outcomes" :key="learningOutcome">
            {{ learningOutcome }}
          </li>
        </ul>
      </div>

      <div class="col-4 relative-position">
        <internship-app-form
          class="absolute full-width"
          :company-name="detailsStore.value.company_name"
          :internship-title="detailsStore.value.title"
          :student-id="localStorage.getItem('username') ?? ''"
        />

        <internship-already-applied
          v-show="
            store.loadingApplications ||
            store.applications.findIndex(
              value =>
                value.title === detailsStore.value.title && value.company_name === detailsStore.value.company_name
            ) !== -1
          "
          class="absolute full-width"
          :loading="store.loadingApplications"
        />
      </div>
    </div>

    <div class="text-h5 q-mb-md">Job Description</div>
    <div class="q-mb-xl" v-html="sanitizeHtml(detailsStore.value.description)"></div>
    <div id="company-description" class="text-h5 q-mb-md">About {{ detailsStore.value.company_name }}</div>
    <div class="q-mb-xl" v-html="sanitizeHtml(detailsStore.value.company_description ?? '')"></div>
    <div class="text-h5 q-mb-md">Company Photos</div>

    <q-carousel
      class="q-mb-xl bg-transparent"
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
      <q-carousel-slide
        v-for="(photoUrl, index) in store.companyPhotoUrl[detailsStore.value.company_name]"
        :key="photoUrl"
        :name="index"
      >
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
          <span>{{ detailsStore.value.company_size }} persons</span>
        </div>
      </div>

      <div class="col">
        <div class="text-grey-7">
          <q-icon class="q-mr-sm" name="location_on" />
          <span class="text-caption">Company Address</span>
        </div>

        <div class="q-mb-md">
          <a :href="`https://www.google.com/maps/dir/?api=1&destination=${detailsStore.value.address}`" target="_blank">
            {{ detailsStore.value.address }}
          </a>
        </div>
      </div>

      <div class="col">
        <div class="text-grey-7">
          <q-icon class="q-mr-sm" name="link" />
          <span class="text-caption">Company Website</span>
        </div>

        <div class="q-mb-md">
          <a :href="detailsStore.value.company_url" target="_blank">{{ detailsStore.value.company_url }}</a>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useInternshipDetailsStudStore } from 'stores/itp-post-store'
import { useMeta, useQuasar } from 'quasar'
import { categoryColor } from 'src/consts/itp-post'
import sanitizeHtml from 'sanitize-html'
import InternshipAppForm from 'components/itp-post/InternshipAppForm.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'stores/itp-post-store'
import InternshipAlreadyApplied from 'src/components/itp-post/InternshipAlreadyApplied.vue'

const { localStorage } = useQuasar()
const router = useRouter()
const detailsStore = useInternshipDetailsStudStore()
const store = useStore()

useMeta({ title: `${detailsStore.value.title} | MyITPHub` })

const slide = ref(0)
let timer: NodeJS.Timeout

  // Init
;(async () => {
  // Running the below 2 statements at the same time can cause the Flask server to crash, so await is needed
  await store.listApplications(localStorage.getItem('username') ?? '')
  store.listCompanyPhotos(detailsStore.value.company_name)
})()

onMounted(() => {
  timer = setInterval(() => {
    store.listCompanyPhotos(detailsStore.value.company_name)
  }, 3_540_000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
