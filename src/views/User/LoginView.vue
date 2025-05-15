<script setup lang="ts">
import { reactive } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { toast } from 'vue3-toastify'
import { useMutation } from '@tanstack/vue-query'
import { loginUser } from '@/server/User/User.tsx'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const formData = reactive({
  email: '',
  password: '',
})

const rules = {
  email: {
    required: helpers.withMessage('Email field is required', required),
    email: helpers.withMessage('Email field is not a valid email address', email),
  },
  password: {
    required: helpers.withMessage('Password field is required', required),
    minLength: helpers.withMessage(
      'Password field should be at least 8 characters long',
      minLength(8),
    ),
  },
}

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    loginMutation.mutate({ email: formData.email, password: formData.password })
  } else {
    toast.error('Check Invalid Fields', { autoClose: 3000 })
  }
}

const loginMutation = useMutation({
  mutationFn: loginUser,
  onSuccess: (data) => {
    if (!data.success) {
      toast.error(data.message)
      return
    }

    if (data?.user_type) {
      toast.success('Login Successful')
      auth.login({
        token: data.access_token,
        user: {
          email: formData.email,
          user_type: data.user_type,
        },
      })
    }
  },
})
</script>

<template>
  <Card>
    <CardContent>
      <form @submit.prevent="submitForm" class="space-y-4">
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
        <div class="space-y-4 place-self-end">
          <Button type="submit" class="hover:cursor-pointer">Login</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>

<style scoped></style>
