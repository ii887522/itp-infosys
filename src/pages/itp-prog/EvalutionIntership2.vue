<template>
  <div class="google-form">
    <div class="google-form-header">
      <h1><b>Evaluation Form</b></h1>
    </div>
    <!-- Video Background -->
    <div class="video-background">
      <!-- <video ref="videoElement" autoplay muted loop poster="" id="video-bg"> -->
      <video width="1000" height="450" controls>
        <source src="/src/pages/itp-prog/video_job.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="video-overlay"></div>
    <div class="google-form-content">
      <q-form class="row q-col-gutter-md" @submit="evaluation" @submit.prevent="submitForm">
        <div>
          <label><b>1. </b>Desire and willingness to take on new assignments: </label> <br />
          <q-radio v-model="store.satisfaction" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>2. </b>Potential for further development: </label> <br />
          <q-radio v-model="store.satisfaction2" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction2" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction2" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction2" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction2" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>3. </b>Concern for needs of fellow employees: </label> <br />
          <q-radio v-model="store.satisfaction3" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction3" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction3" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction3" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction3" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>4. </b>Willingness to work through an assignment to completion: </label> <br />
          <q-radio v-model="store.satisfaction4" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction4" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction4" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction4" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction4" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>5. </b>Ability to communicate: </label> <br />
          <q-radio v-model="store.satisfaction5" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction5" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction5" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction5" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction5" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>6. </b>Ability to learn: </label> <br />
          <q-radio v-model="store.satisfaction6" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction6" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction6" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction6" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction6" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>7. </b>Quality to work: </label> <br />
          <q-radio v-model="store.satisfaction7" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction7" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction7" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction7" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction7" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>8. </b>Dependability: </label> <br />
          <q-radio v-model="store.satisfaction8" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction8" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction8" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction8" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction8" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>9. </b>Attitude (application to work): </label> <br />
          <q-radio v-model="store.satisfaction9" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction9" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction9" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction9" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction9" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>10. </b>Attendance : </label> <br />
          <q-radio v-model="store.satisfaction10" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction10" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction10" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction10" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction10" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>11. </b>Tardiness: </label> <br />
          <q-radio v-model="store.satisfaction11" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction11" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction11" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction11" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction11" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>12. </b>Judgment: </label> <br />
          <q-radio v-model="store.satisfaction12" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction12" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction12" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction12" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction12" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>13. </b>Imaginativeness and resourcefulness : </label> <br />
          <q-radio v-model="store.satisfaction13" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction13" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction13" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction13" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction13" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <label><b>14. </b>Cooperation - willingness to get along with others: </label> <br />
          <q-radio v-model="store.satisfaction14" val="Excellent" label="Excellent" />
          <q-radio v-model="store.satisfaction14" val="Very Good	" label="Very Good	" />
          <q-radio v-model="store.satisfaction14" val="Average" label="Average" />
          <q-radio v-model="store.satisfaction14" val="Marginal" label="Marginal" />
          <q-radio v-model="store.satisfaction14" val="Unsatisfactory" label="Unsatisfactory" />
        </div>
        <br />

        <div>
          <br><br><label for="comments" >Comments</label><br>
          <textarea
            id="comments"
            v-model="store.comments"
            class="form-control"
            rows="5"
            placeholder="Enter your comments"
          ><br><br></textarea>
        </div>

        <div class="col-12 text-center">
            <q-btn type="PreviousPage" label="PreviousPage" color="positive" no-caps to="/admin/itp-prog/EvalutionIntership1" />
          </div>
        <!-- <button @click="submit()" class="btn btn-primary">Submit &raquo; :loading="store.evaluationFormStudent"</button> -->
        <div class="col-12 text-center">
          <q-btn type="submit" label="submit" color="positive" :loading="store.evaluationFormStudent" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMeta, useQuasar, type QInput } from 'quasar'
import { useRouter } from 'vue-router'
import { isTextEmpty } from 'src/common'
import { useStore } from 'stores/itp-prog-store'

useMeta({ title: 'Student Evaluation | MyITPHub' })

const store = useStore()
const { notify } = useQuasar()

// const name = ref('')
// const email = ref('')
// const faculty = ref('')
// const supervisor = ref('')
// const companyName = ref('')
// const satisfaction = ref('')
// const satisfaction2 = ref('')
// const satisfaction3 = ref('')
// const satisfaction4 = ref('')
// const satisfaction5 = ref('')
// const satisfaction6 = ref('')
// const satisfaction7 = ref('')
// const satisfaction8 = ref('')
// const satisfaction9 = ref('')
// const satisfaction10 = ref('')
// const satisfaction11 = ref('')
// const satisfaction12 = ref('')
// const satisfaction13 = ref('')
// const satisfaction14 = ref('')
// const comments = ref('')
const router = useRouter()

async function evaluation() {
  //add the student evaluation to database
  await store.evaluationStudent({
    name: store.name,
    email: store.email,
    faculty: store.faculty,
    supervisor: store.supervisor,
    companyName: store.companyName,
    satisfaction: store.satisfaction,
    satisfaction2: store.satisfaction2,
    satisfaction3: store.satisfaction3,
    satisfaction4: store.satisfaction4,
    satisfaction5: store.satisfaction5,
    satisfaction6: store.satisfaction6,
    satisfaction7: store.satisfaction7,
    satisfaction8: store.satisfaction8,
    satisfaction9: store.satisfaction9,
    satisfaction10: store.satisfaction10,
    satisfaction11: store.satisfaction11,
    satisfaction12: store.satisfaction12,
    satisfaction13: store.satisfaction13,
    satisfaction14: store.satisfaction14,
    comments: store.comments,
  })
}
// export default {
//   name: 'eval-intership2',
//   data() {
//     return {
//       name: '',
//       rating: '',
//       evaluation: null,
//       satisfaction: null,
//       satisfaction2: null,
//       satisfaction3: null,
//       satisfaction4: null,
//       satisfaction5: null,
//       satisfaction6: null,
//       satisfaction7: null,
//       satisfaction8: null,
//       satisfaction9: null,
//       satisfaction10: null,
//       satisfaction11: null,
//       satisfaction12: null,
//       satisfaction13: null,
//       satisfaction14: null,
//       comments: '',
//       evaluationOptions: [
//         'Criteria 1',
//         'Criteria 2',
//         'Criteria 3',
//         // Add more evaluation criteria here
//       ],
//     }
//   },

//   methods: {
//     submitForm() {
//       // Handle form submission here
//       console.log('Name:', this.name)
//       console.log('TAR UMT Email:', this.email)
//       console.log('Faculty:', this.faculty)
//       console.log('Supervisor:', this.supervisor)
//       console.log('Company Name:', this.companyName)
//       console.log('Question 1:', this.satisfaction)
//       console.log('Question 2:', this.satisfaction2)
//       console.log('Question 3:', this.satisfaction3)
//       console.log('Question 4:', this.satisfaction4)
//       console.log('Question 5:', this.satisfaction5)
//       console.log('Question 6:', this.satisfaction6)
//       console.log('Question 7:', this.satisfaction7)
//       console.log('Question 8:', this.satisfaction8)
//       console.log('Question 9:', this.satisfaction9)
//       console.log('Question 10:', this.satisfaction10)
//       console.log('Question 11:', this.satisfaction11)
//       console.log('Question 12:', this.satisfaction12)
//       console.log('Question 13:', this.satisfaction13)
//       console.log('Question 14:', this.satisfaction14)
//       console.log('Comment:', this.comments)
//       // You can add further processing or send the data to a server.
//     },

//     previouspage1() {
//       this.$router.push('/admin/itp-prog/EvalutionIntership1')
//     },
//     submitEvaluation() {
//       // You can access the selected values in this function
//       console.log('Selected Evaluation Criteria:', this.evaluation)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction2)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction3)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction4)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction5)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction6)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction7)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction8)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction9)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction10)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction11)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction12)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction13)
//       console.log('Excellent/Very Good/Average/Marginal/Unsatisfactory:', this.satisfaction14)
//       console.log('Comments:', this.comments)

//       // Here, you can send the form data to your backend for processing or validation.
//       // You can use axios or another HTTP library to make a POST request to your server.
//       // Example:
//       // axios.post('/submit-evaluation', {
//       //   evaluation: this.evaluation,
//       //   satisfaction: this.satisfaction,
//       //   comments: this.comments
//       // })
//       // .then(response => {
//       //   // Handle the response from the server
//       // })
//       // .catch(error => {
//       //   // Handle errors
//       // });
//     },
//   },
// }
</script>

<style scoped>
.video-background {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh; /* Adjust as needed */
}

#video-bg {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  width: 100px;
  height: 100px;
  z-index: -1; /* Place the video behind other content */
}

.content {
  /* Style your content on top of the video background */
  position: relative;
  z-index: 1; /* Ensure content is above the video */
  color: #fff; /* Text color, adjust as needed */
  padding: 20px;
  text-align: center;
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
</style>
