<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 512px">
      <q-card-section>
        <div class="text-h5 q-mb-md">Application for {{ value.title }}</div>

        <div class="row">
          <div class="col-6">
            <div class="text-grey-7">
              <q-icon class="q-mr-sm" name="apartment" />
              <span class="text-caption">Company</span>
            </div>

            <div>{{ value.company_name }}</div>
          </div>

          <div class="col-6">
            <div class="text-grey-7 text-caption">Status</div>

            <div>
              <q-icon :name="statusIcon[value.status ?? '']" left size="xs" :color="statusColor[value.status ?? '']" />
              <span :class="`text-${statusColor[value.status ?? '']}`">{{ value.status?.toUpperCase() }}</span>
            </div>
          </div>

          <div class="col-6 q-mt-md">
            <div class="text-grey-7">
              <q-icon class="q-mr-sm" name="description" />
              <span class="text-caption">Note to employer</span>
            </div>

            <div>{{ value.note_to_employer }}</div>
          </div>

          <div class="col-6 q-mt-md">
            <div class="text-grey-7">
              <q-icon class="q-mr-sm" name="description" />
              <span class="text-caption">Resume / CV</span>
            </div>

            <div>
              <a :href="value.resume_url" target="_blank">
                <q-icon name="open_in_new" left size="xs" />
                <span>Open PDF file</span>
              </a>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="Close" icon="close" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { type OutgoingApplication } from 'src/models/itp-post'
import { statusColor, statusIcon } from 'src/consts'

defineProps<{ value: OutgoingApplication }>()

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, /*onDialogOK,*/ onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
// function onOKClick() {
// on OK, it is REQUIRED to
// call onDialogOK (with optional payload)
// onDialogOK()
// or with payload: onDialogOK({ ... })
// ...and it will also hide the dialog automatically
// }
</script>
