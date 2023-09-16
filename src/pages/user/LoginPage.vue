<template>
    <q-page padding>
        <q-layout view="lHh Lpr lFf">
            <q-page-container>
                <div class="q-pa-xl flex flex-center shadow-8">
                    <q-card>
                        <p class="login-header text-h4 q-pt-md">Main Login Page</p>
                        <q-card-section>
                            <div class="q-gutter-md" style="text-align:center;">
                                <q-btn color="primary" label="Login as Student" class="q-mb-md" @click="studentLogin"/>
                                <q-btn color="primary" label="Login as Employee" class="q-mb-md" @click="employeeLogin"/>
                                <br/>
                                <q-btn color="primary" label="Login as Supervisor" class="q-mb-md" @click="supervisorLogin"/>
                                <q-btn color="primary" label="Login as Admin" class="q-mb-md" @click="adminLogin"/>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </q-page-container>
        </q-layout>
    </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function studentLogin() {
  router.push('/stud/login')
}

function employeeLogin() {
    router.push('/emp/login');
}

function supervisorLogin() {
    router.push('/sup/login');
}

function adminLogin() {
    router.push('/admin/login');
}
</script>

<style scoped>
.login-header {
  font-weight: bold;
  text-align: center;
  color: green;
}

.q-btn {
  min-width: 200px;
  font-size: 18px;
}
</style>
