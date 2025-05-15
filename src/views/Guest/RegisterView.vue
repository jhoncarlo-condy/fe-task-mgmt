<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'
import { useMutation } from '@tanstack/vue-query'
import { registerUser } from '@/server/User/User'

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage('First Name field is required', required),
    },
    lastName: { required: helpers.withMessage('Last Name field is required', required) },
    email: { required: helpers.withMessage('Email field is required', required), email },
    password: {
      required: helpers.withMessage('Password field is required', required),
      minLength: helpers.withMessage(
        'Password field should be at least 8 characters long',
        minLength(8),
      ),
    },
    confirmPassword: {
      required: helpers.withMessage('Confirm Password field cannot be empty', required),
      minLength: helpers.withMessage(
        'Confirm Password field should be at least 8 characters long',
        minLength(8),
      ),
      sameAs: helpers.withMessage(
        'The Confirm Password must match with Password field',
        sameAs(formData.password),
      ),
    },
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    registerMutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      passwordConfirmation: formData.confirmPassword,
    })
  } else {
    toast.error('Check Invalid Fields', { autoClose: 3000 })
  }
}

const registerMutation = useMutation({
  mutationFn: registerUser,
  onSuccess: (data) => {
    if (!data.success) {
      toast.error(data.message)
      return
    }

    toast.success('User Registered Successfully!')
  },
})
</script>

<template>
  <Card>
    <CardContent class="space-y-4">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="space-y-1">
          <Label for="firstName">First Name</Label>
          <Input v-model="formData.firstName" id="firstName" type="firstName" />
          <span v-for="error in v$.firstName.$errors" :key="error.$uid" class="text-red-500">{{
            error.$message
          }}</span>
        </div>
        <div class="space-y-1">
          <Label for="lastName">Last Name</Label>
          <Input v-model="formData.lastName" id="lastName" type="lastName" />
          <span v-for="error in v$.lastName.$errors" :key="error.$uid" class="text-red-500">{{
            error.$message
          }}</span>
        </div>
        <div class="space-y-1">
          <Label for="email">Email</Label>
          <Input v-model="formData.email" id="email" type="email" />
          <span v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-500">{{
            error.$message
          }}</span>
        </div>
        <div class="space-y-1">
          <Label for="password">Password</Label>
          <Input v-model="formData.password" id="password" type="password" />
          <span v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-500">{{
            error.$message
          }}</span>
        </div>
        <div class="space-y-1">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input v-model="formData.confirmPassword" id="confirmPassword" type="password" />
          <span
            v-for="error in v$.confirmPassword.$errors"
            :key="error.$uid"
            class="flex flex-col text-red-500"
            >{{ error.$message }}</span
          >
        </div>
        <div class="space-y-4 place-self-end">
          <Button type="submit" class="hover:cursor-pointer">Register</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<style scoped></style>
