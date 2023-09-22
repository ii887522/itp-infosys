<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="width: 100%">
      <q-card>
        <q-tabs
          v-model="tab"
          inline-label
          class="bg-indigo text-white shadow-2"
          active-color="indigo"
          active-bg-color="white"
          indicator-color="indigo"
        >
          <q-tab name="companyList" icon="toc" label="Company List" style="width: 100%" />
          <q-tab name="request" icon="hourglass_empty" label="Request" style="width: 100%" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="companyList">
            <div class="q-pa-md">
              <q-table
                flat
                title="Company List"
                :columns="columns"
                :rows="companyArray"
                row-key="company_name"
                binary-state-sort
              >
                <template v-slot:header-cell="props">
                  <q-th :props="props">
                    <div style="text-align: left">
                      <q-icon v-if="props.col.icon" class="q-mr-sm" :name="props.col.icon" size="xs" />
                      <span class="vertical-middle">{{ props.col.label }}</span>
                    </div>
                  </q-th>
                </template>

                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn
                      class="q-mr-md"
                      color="info"
                      style="
                        min-width: 80px;
                        max-width: 120px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      dense
                      label="Details"
                      outline
                      @click="openCompanyDetails(props.row)"
                    />
                    <q-btn
                      color="negative"
                      style="
                        min-width: 80px;
                        max-width: 120px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      dense
                      label="Delete"
                      outline
                      @click="openDeleteDialog(props.row.company_name)"
                    />
                  </q-td>
                </template>
              </q-table>
            </div>
          </q-tab-panel>

          <q-tab-panel name="request">
            <div class="q-pa-md">
              <q-table
                flat
                title="Request List"
                :rows="companyArray"
                :columns="datacol"
                row-key="company-name"
                binary-state-sort
              >
                <template #header-cell="props">
                  <q-th :props="props">
                    <div sortable="true" align="left">
                      <q-icon v-if="props.col.icon" class="q-mr-sm" :name="props.col.icon" size="xs" />
                      <span class="vertical-middle">{{ props.col.label }}</span>
                    </div></q-th
                  >
                </template>

                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn
                      class="q-mr-md"
                      color="positive"
                      style="
                        min-width: 80px;
                        max-width: 120px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      dense
                      label="Approve"
                      outline
                      @click="approve = true"
                    /><!---->
                    <q-btn
                      color="dark"
                      style="
                        min-width: 80px;
                        max-width: 120px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      dense
                      label="Reject"
                      outline
                      @click="reject = true"
                    />
                    <q-dialog v-model="approve" persistent>
                      <q-card style="width: 700px; max-width: 80vw">
                        <q-card-section>
                          <div class="text-h6">Approve</div>
                        </q-card-section>
                        <q-card-section>
                          <span class="q-ml-sm">Confirm approve?</span>
                        </q-card-section>
                        <q-card-actions align="right">
                          <q-btn flat label="Cancel" color="primary" v-close-popup />
                          <q-btn flat label="Approve" color="positive" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                    <q-dialog v-model="reject" persistent>
                      <q-card style="width: 700px; max-width: 80vw">
                        <q-card-section>
                          <div class="text-h6">Reject</div>
                        </q-card-section>
                        <q-card-section>
                          <span class="q-ml-sm">Are you sure want to reject?</span>
                        </q-card-section>
                        <q-card-actions align="right">
                          <q-btn flat label="Cancel" color="primary" v-close-popup />
                          <q-btn flat label="Reject" color="negative" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </q-td>
                </template>
              </q-table>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<!--<script>-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import sanitizeHtml from 'sanitize-html'
import { useStore } from 'src/stores/manageCompany'
import { Company } from 'src/models/companyList'
//import { store } from 'quasar/wrappers'
import { api } from 'src/boot/axios'
import companyDetail from 'components/itp-company/companyDetail.vue'

const companyArray = ref([])

const tab = ref('companyList')
const approve = ref(false) //Second table
const reject = ref(false)
const store = useStore()
const { dialog } = useQuasar()
fetchCompanyList()

const columns = computed(() => [
  {
    name: 'company_name',
    label: 'Company',
    field: 'company_name',
    icon: 'home',
    style: 'width: 20%; word-wrap: break word; white-space: normal; text-align: left;',
    sortable: true,
  },
  {
    name: 'company_address',
    label: 'Address',
    field: 'company_address',
    icon: 'home',
    style: 'width: 35%; word-wrap: break word; white-space: normal; text-align: left;',
    sortable: true,
  },
  {
    name: 'company_website',
    label: 'Website',
    field: 'company_website',
    icon: 'open_in_new',
    style: 'width: 25%; word-wrap: break word; white-space: normal; text-align: left;',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    icon: 'settings',
    style: 'width: 20%; text-align: left;',
  },
])

const datacol = [
  {
    name: 'company-name',
    label: 'Company',
    field: 'company_name',
    icon: 'apartment',
    style: 'width: 80%; word-wrap: break word; white-space: normal; text-align: left;',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    icon: 'settings',
    style: 'width: 20%; word-wrap: break word; white-space: normal; text-align: left;',
  },
]

async function fetchCompanyList() {
  try {
    const resp = await api.get('/itp-company/get-companylist')
    console.log('API Response: ', resp)
    companyArray.value = resp.data
  } catch (error) {
    console.error('Not able to view company.', error)
  }
}
function openCompanyDetails(row: Company) {
  dialog({ component: companyDetail, componentProps: { value: row } })
}

function openDeleteDialog(company_name: string) {
  dialog({
    title: `<span class="text-negative">Delete Company: ${sanitizeHtml(company_name)}</span>`,
    message: '<span>Confirm delete? </span>',
    ok: { label: 'Delete', flat: true },
    cancel: { label: 'Cancel', flat: true },
    html: true,
  }).onOk(async () => {
    await store.deleteCompany(company_name)
  })
}
</script>
