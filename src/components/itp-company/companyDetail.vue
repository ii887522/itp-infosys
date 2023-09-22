<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 700px; max-width: 80vw">
      <!--<q-img
        src="https://rejse-glæde.dk/wp-content/themes/klikko3_b_18_07_2023/dest/images/no-image.webp"
        alt="Error 404"
      />-->
      <q-card-section>
        <div class="row items-center">
          <div class="col text-h4 ellipses">{{ value.company_name }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div>
          <q-icon name="room" size="sm" />
          <a>{{ value.company_address }}</a>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">Description</div>
        <div class="text-caption text-grey" style="font-size: 15px">{{ value.company_desc }}</div>
      </q-card-section>

      <q-separator />
      <q-card-actions align="right">
        <!--<q-btn flat label="Detail" color="primary" v-close-popup />-->
        <q-btn flat label="Close" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { Company } from 'src/models/companyList'

defineProps<{ value: Company }>()

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, /*onDialogOK,*/ onDialogCancel } = useDialogPluginComponent()
</script>
