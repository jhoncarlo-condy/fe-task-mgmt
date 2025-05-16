<script setup lang="ts">
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { helpers, maxLength, required } from '@vuelidate/validators'
import { Textarea } from '@/components/ui/textarea'
import useVuelidate from '@vuelidate/core'
import { toast } from 'vue3-toastify'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createTask } from '@/server/Task/Task'

const queryClient = useQueryClient()
const isDialogOpen = ref(false)

const formData = reactive({
  title: '',
  description: '',
  status: 'Pending',
  priority: '',
})

const rules = {
  title: {
    required: helpers.withMessage('Title field is required', required),
    maxLength: helpers.withMessage('Title field should 50 characters at max', maxLength(50)),
  },
  description: {
    required: helpers.withMessage('Description field is required', required),
    maxLength: helpers.withMessage(
      'Description field should 255 characters at max',
      maxLength(255),
    ),
  },
  priority: {
    required: helpers.withMessage('Priority field is required', required),
  },
}

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    createTaskMutation.mutate({ ...formData })
  } else {
    toast.error('Check Invalid Fields', { autoClose: 3000 })
  }
}

const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.status = 'Pending'
  formData.priority = ''
  v$.value.$reset()
}

const createTaskMutation = useMutation({
  mutationFn: createTask,
  onSuccess: (data) => {
    if (!data.success) {
      toast.error(data.message)
      return
    }

    toast.success('Task Created Successfully')

    queryClient.invalidateQueries({ queryKey: ['getTasks'] })
    resetForm()
    isDialogOpen.value = false
  },
})
</script>
<template>
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button variant="default" class="hover:cursor-pointer">Create Task</Button>
    </DialogTrigger>
    <DialogContent class="w-full max-w-md">
      <form @submit.prevent="submitForm" class="space-y-4 mt-5">
        <div class="space-y-1">
          <Label for="title">Title</Label>
          <Input v-model="formData.title" id="title" type="text" />
          <span v-for="error in v$.title.$errors" :key="error.$uid" class="text-red-500">{{
            error.$message
          }}</span>
        </div>

        <div class="space-y-1">
          <Label for="description">Description</Label>
          <Textarea
            v-model="formData.description"
            id="description"
            placeholder="Type your message here."
          />
          <span v-for="error in v$.description.$errors" :key="error.$uid" class="text-red-500">{{
            error.$message
          }}</span>
        </div>

        <div class="space-y-1">
          <Label for="status">Status</Label>
          <Input v-model="formData.status" id="status" type="text" disabled />
        </div>

        <div class="space-y-1">
          <Label for="priority">Priority</Label>
          <select
            v-model="formData.priority"
            id="priority"
            class="w-full border rounded-lg px-3 py-2"
          >
            <option value="" disabled>Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span v-for="error in v$.priority.$errors" :key="error.$uid" class="text-red-500">{{
            error.$message
          }}</span>
        </div>

        <div class="flex justify-end">
          <Button type="submit" class="hover:cursor-pointer">Submit</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
