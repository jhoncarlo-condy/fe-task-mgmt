<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function registerAction() {
  alert('test')
}
</script>

<template>
  <Card>
    <CardContent class="space-y-4">
      <div class="space-y-1">
        <Label for="firstName">First Name</Label>
        <Input id="firstName" type="text" />
      </div>
      <div class="space-y-1">
        <Label for="lastName">Last Name</Label>
        <Input id="lastName" type="text" />
      </div>
      <div class="space-y-1">
        <Label for="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div class="space-y-1">
        <Label for="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <div class="space-y-1">
        <Label for="confirm_password">Confirm Password</Label>
        <Input id="confirm_password" type="confirm_password" />
      </div>
      <div class="space-y-4 place-self-end">
        <Button @click="registerAction" class="hover:cursor-pointer">Register</Button>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
