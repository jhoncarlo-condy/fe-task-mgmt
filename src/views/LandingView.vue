<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginView from '@/views/User/LoginView.vue'
import RegisterView from '@/views/User/RegisterView.vue'
</script>
<template>
  <div class="z-10">
    <p
      class="whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
    >
      Task Manager
    </p>
    <div class="flex flex-row items-center text-center justify-center p-10 gap-5">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="default" class="hover:cursor-pointer"> Start </Button>
        </DialogTrigger>
        <DialogContent class="w-full">
          <Tabs default-value="login" class="w-full p-2">
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="login" class="hover:cursor-pointer"> Login </TabsTrigger>
              <TabsTrigger value="register" class="hover:cursor-pointer"> Register </TabsTrigger>
            </TabsList>
            <TabsContent value="login"> <LoginView /> </TabsContent>
            <TabsContent value="register"><RegisterView /></TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<style></style>
