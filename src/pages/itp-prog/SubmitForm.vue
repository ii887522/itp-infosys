<template>
  <div class="google-form-header">
    <h2>Monthly Report</h2>
    <p>Please Upload the report in pdf.</p>
  </div>
  <div class="google-form-content">
    <q-form class="row q-col-gutter-md" @submit="report">
      <div class="form-group">
        <label for="name">Your Name</label>
        <input type="text" id="name" v-model="store.name" class="form-control" placeholder="Enter your name" />
      </div>

      <div class="form-group">
        <label for="email">Your TAR UMT Email</label>
        <input
          type="text"
          id="email"
          v-model="store.email"
          class="form-control"
          placeholder="aws-wm20@student.tarc.edu.my"
        />
      </div>

      <div class="form-group">
        <label for="faculty">Faculty</label>
        <select id="faculty" v-model="store.faculty" class="form-control">
          <option value="" disabled>Select Faculty</option>
          <option value="FOCS">FOCS</option>
          <option value="FSSH">FSSH</option>
          <option value="FAFB">FAFB</option>
          <option value="FCCI">FCCI</option>
          <option value="FOBC">FOBC</option>
        </select>
      </div>

      <div class="form-group">
        <label for="supervisor">Your Representation Supervisor</label>
        <input type="text" id="supervisor" v-model="store.supervisor" class="form-control" placeholder="Miss Tan" />
      </div>

      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          v-model="store.companyName"
          class="form-control"
          placeholder="Huawei Sdn Bhd"
        />
      </div>

      <div class="file-upload-form">
        <q-page-container>
          <q-card class="q-pa-md" style="max-width: 400px">
            <q-card-section>
              <h2 class="text-h6">File Upload Form</h2>
              <q-input v-model="selectedFile" outlined label="Select a file" type="file" accept="application/pdf" />
            </q-card-section>
          </q-card>
          <!-- <div class="q-mt-md">
            <q-card class="q-pa-md" v-if="fileUploaded">
              <q-card-section>
                <h2 class="text-h6">Uploaded File</h2>
                <p>File Name: {{ uploadedFileName }}</p>
                <p>File Size: {{ uploadedFileSize }}</p>
              </q-card-section>
            </q-card>
          </div> -->
        </q-page-container>
      </div>

      <div class="col-12 text-center">
        <q-btn type="submit" label="submit" color="positive" :loading="store.reportStudent" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMeta, type QInput } from 'quasar'
import { useStore } from 'stores/itp-prog-store'
import { useLocalStorageStore } from 'stores/localstorage-store'

useMeta({ title: 'Student Evaluation | MyITPHub' })

// Pinia stores
const store = useStore()
const lsStore = useLocalStorageStore()

const selectedFile = ref<FileList | null>(null)

async function report() {
  //add the student evaluation to database
  await store.evaluationStudent2({
    student_id: lsStore.getUsername()?.toString() ?? '',
    name: store.name,
    email: store.email,
    faculty: store.faculty,
    supervisor: store.supervisor,
    companyName: store.companyName,
    file: selectedFile.value ? selectedFile.value[0] : null,
  })
}
// export default {
//   data() {
//     return {
//       selectedFile: null,
//       fileUploaded: false,
//       uploadedFileName: '',
//       uploadedFileSize: '',
//       name: '',
//       email: '',
//       faculty: '',
//       supervisor: '',
//       companyName: '',
//     };
//   },
//   methods: {
//     handleFileChange() {
//       // Update the selected file information when a new file is chosen
//       if (this.selectedFile) {
//         this.uploadedFileName = this.selectedFile.name;
//         this.uploadedFileSize = `${(this.selectedFile.size / 1024).toFixed(2)} KB`;
//       }
//     },
//     uploadFile() {
//       // Simulate file upload process (you can replace this with your actual file upload code)
//       if (this.selectedFile) {
//         // Here, you can send the selected file to your server for processing.
//         // You can use axios or another HTTP library for this.

//         // For demonstration purposes, we'll just log the file details.
//         console.log('File Name:', this.uploadedFileName);
//         console.log('File Size:', this.uploadedFileSize);

//         // Set the fileUploaded flag to true to show the uploaded file details
//         this.fileUploaded = true;

//         // Clear the selected file for the next upload
//         this.selectedFile = null;
//       }
//     },
//   },
// };
</script>

<style scoped>
.file-upload-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.google-form {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}

.google-form-header {
  text-align: center;
}

.google-form-content {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  background-color: #4285f4;
  color: #fff;
}

.btn-primary:hover {
  background-color: #357ae8;
}

/* Add custom styling for the form and card as needed */
</style>
