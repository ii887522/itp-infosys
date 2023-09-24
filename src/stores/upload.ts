import { ref } from 'vue'
import { api } from 'boot/axios'
import { defineStore } from 'pinia'
import { Upload } from 'src/models/uploadFile'
import { ResumeUpload } from 'src/models/uploadFile'
import { ReportUpload } from 'src/models/uploadFile'


export const useStore = defineStore('upload', () => {
    const applyingCompany = ref(false)

    async function reportUpload(value:ReportUpload) {
      applyingCompany.value = true
      const resp = await api.post(`/userUpload/reportUpload`, value)
      applyingCompany.value = false

      const payload4 = new FormData()
      Object.entries(resp.data.report_upload_url.fields).forEach(([key, value]) => {
        payload4.append(key, value as string | Blob)
      })
      payload4.append('file', value.report_file)

      // Upload the resume to S3 bucket
      await api.post(resp.data.report_upload_url.url, payload4)

    }

    async function resumeUpload(value:ResumeUpload) {
      applyingCompany.value = true
      const resp = await api.post(`/userUpload/resumeUpload`, value)
      applyingCompany.value = false

      const payload3 = new FormData()
      Object.entries(resp.data.resume_upload_url.fields).forEach(([key, value]) => {
        payload3.append(key, value as string | Blob)
      })
      payload3.append('file', value.resume_file)

      // Upload the resume to S3 bucket
      await api.post(resp.data.resume_upload_url.url, payload3)

    }

    async function companyApply(value: Upload) {
        applyingCompany.value = true
        const resp = await api.post(`/userUpload/company_apply`, value)
        applyingCompany.value = false

        const payload = new FormData()
        Object.entries(resp.data.acceptance_upload_url.fields).forEach(([key, value]) => {
        payload.append(key, value as string | Blob)
        })
        payload.append('file', value.company_acc_file)

        // Upload the resume to S3 bucket
        await api.post(resp.data.acceptance_upload_url.url, payload)

        const payload1 = new FormData()
        Object.entries(resp.data.parent_upload_url.fields).forEach(([key, value]) => {
        payload1.append(key, value as string | Blob)
        })
        payload1.append('file', value.parent_file)

        // Upload the resume to S3 bucket
        await api.post(resp.data.parent_upload_url.url, payload1)

        const payload2 = new FormData()
        Object.entries(resp.data.letter_upload_url.fields).forEach(([key, value]) => {
        payload2.append(key, value as string | Blob)
        })
        payload2.append('file', value.letter_file)

        // Upload the resume to S3 bucket
        await api.post(resp.data.letter_upload_url.url, payload2)

    }



    return {
        applyingCompany,
        companyApply,
        resumeUpload,
        reportUpload,
    }
})
