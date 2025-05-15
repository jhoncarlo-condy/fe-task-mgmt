<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import Separator from '@/components/ui/separator/Separator.vue'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { computed, reactive, watch } from 'vue'
import { updateUser, useGetUser, updatePassword } from '@/server/User/User'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'vue3-toastify'
import { helpers, minLength, required, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useMutation } from '@tanstack/vue-query'

const { data: result } = useGetUser()

const detailFormData = reactive({
  firstName: '',
  lastName: '',
  email: '',
})

const detailRules = {
  firstName: {
    required: helpers.withMessage('First Name field is required', required),
  },
  lastName: { required: helpers.withMessage('Last Name field is required', required) },
}

const v$ = useVuelidate(detailRules, detailFormData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    detailMutation.mutate({
      firstName: detailFormData.firstName,
      lastName: detailFormData.lastName,
      email: detailFormData.email,
    })
  } else {
    toast.error('Check Invalid Fields', { autoClose: 3000 })
  }
}

const detailMutation = useMutation({
  mutationFn: updateUser,
  onSuccess: (data) => {
    if (!data.success) {
      toast.error(data.message)
      return
    }

    toast.success('User Updated Successfully!')
  },
})

const changePassFormData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
})

const changePassRules = computed(() => {
  return {
    oldPassword: {
      required: helpers.withMessage('Old Password field is required', required),
      minLength: helpers.withMessage(
        'Password field should be at least 8 characters long',
        minLength(8),
      ),
    },
    newPassword: {
      required: helpers.withMessage('New Password field is required', required),
      minLength: helpers.withMessage(
        'Password field should be at least 8 characters long',
        minLength(8),
      ),
    },
    confirmNewPassword: {
      required: helpers.withMessage('Confirm New Password field is required', required),
      minLength: helpers.withMessage(
        'Confirm Password field should be at least 8 characters long',
        minLength(8),
      ),
      sameAs: helpers.withMessage(
        'The Confirm Password must match with New Password field',
        sameAs(changePassFormData.newPassword),
      ),
    },
  }
})

const v1$ = useVuelidate(changePassRules, changePassFormData)

const changePassword = async () => {
  const result = await v1$.value.$validate()
  if (result) {
    changePassMutation.mutate({
      oldPassword: changePassFormData.oldPassword,
      password: changePassFormData.newPassword,
      passwordConfirmation: changePassFormData.confirmNewPassword,
    })
  } else {
    toast.error('Check Invalid Fields', { autoClose: 3000 })
  }
}

const changePassMutation = useMutation({
  mutationFn: updatePassword,
  onSuccess: (data) => {
    if (!data.success) {
      toast.error(data.message)
      return
    }

    toast.success('User Updated Successfully!')
  },
})

watch(result, (newResult) => {
  if (newResult) {
    detailFormData.firstName = newResult.data.first_name || ''
    detailFormData.lastName = newResult.data.last_name || ''
    detailFormData.email = newResult.data.email || ''
  }
})
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
  >
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="#">User</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>

  <div class="grid gap-4 m-10">
    <Card>
      <CardTitle class="p-5">Account Detail</CardTitle>
      <CardContent class="space-y-4">
        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="space-y-1">
            <Label for="firstName">First Name</Label>
            <Input v-model="detailFormData.firstName" id="firstName" type="text" />
            <span v-for="error in v$.firstName.$errors" :key="error.$uid" class="text-red-500">{{
              error.$message
            }}</span>
          </div>
          <div class="space-y-1">
            <Label for="lastName">Last Name</Label>
            <Input v-model="detailFormData.lastName" id="lastName" type="text" />
            <span v-for="error in v$.lastName.$errors" :key="error.$uid" class="text-red-500">{{
              error.$message
            }}</span>
          </div>
          <div class="space-y-1">
            <Label for="email">Email</Label>
            <Input v-model="detailFormData.email" id="email" type="email" disabled="true" />
          </div>
          <div class="space-y-4 place-self-end">
            <Button type="submit" class="hover:cursor-pointer">Update</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>

  <div class="grid gap-4 m-10">
    <Card>
      <CardTitle class="p-5">Change Password</CardTitle>
      <CardContent class="space-y-4">
        <form @submit.prevent="changePassword" class="space-y-4">
          <div class="space-y-1">
            <Label for="oldPassword">Old Password</Label>
            <Input v-model="changePassFormData.oldPassword" id="oldPassword" type="password" />
            <span
              v-for="error in v1$.oldPassword.$errors"
              :key="error.$uid"
              class="flex flex-col text-red-500"
              >{{ error.$message }}</span
            >
          </div>
          <div class="space-y-1">
            <Label for="newPassword">New Password</Label>
            <Input v-model="changePassFormData.newPassword" id="newPassword" type="password" />
            <span
              v-for="error in v1$.newPassword.$errors"
              :key="error.$uid"
              class="flex flex-col text-red-500"
              >{{ error.$message }}</span
            >
          </div>
          <div class="space-y-1">
            <Label for="confirmNewPassword">Confirm New Password</Label>
            <Input
              v-model="changePassFormData.confirmNewPassword"
              id="confirmNewPassword"
              type="password"
            />
            <span
              v-for="error in v1$.confirmNewPassword.$errors"
              :key="error.$uid"
              class="flex flex-col text-red-500"
              >{{ error.$message }}</span
            >
          </div>
          <div class="space-y-4 place-self-end">
            <Button type="submit" class="hover:cursor-pointer">Update</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
