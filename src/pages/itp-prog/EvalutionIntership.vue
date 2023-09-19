<template>
  <div class="google-form">
    <div class="google-form-header">
      <h2>Evaluation Form</h2>
      <p>This is a simplified example.</p>
    </div>
    <div class="google-form-content">
      <!-- <form @submit.prevent="submitForm"> -->
        <q-form class="row q-col-gutter-md" @submit="evaluation">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" v-model="store.name" class="form-control" placeholder="Enter your name" :rules="[requiredRule]"/>
        </div>

        <div class="form-group">
          <label for="email">Your TAR UMT Email</label>
          <input type="text" id="email" v-model="store.email" class="form-control" placeholder="aws-wm20@student.tarc.edu.my" :rules= "[requiredRule, studentEmailRule]"/>
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
          <input type="text" id="supervisor" v-model="store.supervisor" class="form-control" placeholder="Miss Tan" :rules="[requiredRule]"/>
        </div>


        <div class="form-group">
          <label for="companyName">Company Name</label>
          <input type="text" id="companyName" v-model="store.companyName" class="form-control" placeholder="Huawei Sdn Bhd" :rules="[requiredRule]"/>
        </div>



        <div class="col-12 text-center">
            <q-btn type="submit" label="submit" color="positive" :loading="store.evaluationFormStudent"/>
        </div>
        <div class="col-12 text-center">
            <q-btn type="NextPage" label="NextPage" color="positive" no-caps to="/admin/itp-prog/EvalutionIntership2" />
          </div>
      </q-form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useMeta, useQuasar, type QInput } from 'quasar'
import { useRouter } from 'vue-router'
import { isTextEmpty } from 'src/common';
import { useStore } from 'stores/itp-prog-store'

useMeta({ title: 'Student Evaluation | MyITPHub' })

const store = useStore();
const { notify } = useQuasar();

// const name = ref('');
// const email = ref('');
// const faculty = ref('');
// const supervisor = ref('');
// const companyName = ref('');
// const satisfaction = ref('');
// const satisfaction2 = ref('');
// const satisfaction3 = ref('');
// const satisfaction4 = ref('');
// const satisfaction5 = ref('');
// const satisfaction6 = ref('');
// const satisfaction7 = ref('');
// const satisfaction8 = ref('');
// const satisfaction9 = ref('');
// const satisfaction10 = ref('');
// const satisfaction11 = ref('');
// const satisfaction12 = ref('');
// const satisfaction13 = ref('');
// const satisfaction14 = ref('');
// const comments = ref('');
const router = useRouter();

// validation rules
const requiredRule = (value: string) => !isTextEmpty(value) || 'This field is required';
const studentEmailRule = (value: string) => /.+@student\.tarc\.edu\.my$/.test(value) || 'Student email must end with "@student.tarc.edu.my"';
const personalEmailRule = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) || 'Invalid personal email format';
const nonStudentEmailRule = (value: string) => /^((?!\@student\.tarc\.edu\.my).)*$/.test(value) || 'Personal email must not end with "@student.tarc.edu.my"';

async function evaluation(){
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

// async function nextpage1() {
//   try {
//     await router.push('/admin/itp-prog/EvalutionIntership2');
//   } catch (error) {
//     console.error('Error navigating to the route:', error);
//   }
// }
// async function nextpage1() {
//       this.$router.push('/admin/itp-prog/EvalutionIntership2')
//     },


{/* export default {
  {/* data() {
    return {
      name: '',
      email: '',
      faculty: '',
      supervisor: '',
      companyName: '',
    }
  }, */}
  methods: {
    {/* submitForm() {
      // Handle form submission here
      console.log('Name:', this.name)
      console.log('TAR UMT Email:', this.email)
      console.log('Faculty:', this.faculty)
      console.log('Supervisor:', this.supervisor)
      console.log('Company Name:', this.companyName)
      console.log('Rating:', this.rating)
      console.log('Comments:', this.comments)
      // You can add further processing or send the data to a server.
    }, */}


    {/* submitEvaluation() {
      // You can access the selected values in this function
      console.log('Selected Evaluation Criteria:', this.evaluation)
      console.log('Satisfaction/Denial:', this.satisfaction)
      console.log('Comments:', this.comments) */}

      // Here, you can send the form data to your backend for processing or validation.
      // You can use axios or another HTTP library to make a POST request to your server.
      // Example:
      // axios.post('/submit-evaluation', {
      //   evaluation: this.evaluation,
      //   satisfaction: this.satisfaction,
      //   comments: this.comments
      // })
      // .then(response => {
      //   // Handle the response from the server
      // })
      // .catch(error => {
      //   // Handle errors
      // });
//     },
//   },
// } */}
      }
</script>

<style scoped>
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
