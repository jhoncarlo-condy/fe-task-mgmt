<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import InteractiveGridPattern from '@/components/ui/interactive-grid-pattern/InteractiveGridPattern.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginView from '@/views/Guest/LoginView.vue'
import RegisterView from '@/views/Guest/RegisterView.vue'
</script>
<template>
  <div class="relative grid h-[1000px] w-full place-content-center overflow-hidden">
    <div class="z-10">
      <div class="flex flex-col gap-4">
        <h2
          class="whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
        >
          Task Manager
        </h2>
        <span
          class="whitespace-pre-wrap text-center text-sm font-medium tracking-tighter text-black dark:text-white"
          >manage your tasks with ease and get more done, every day.</span
        >
      </div>
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
    <InteractiveGridPattern
      :class="'[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]'"
      :width="20"
      :height="20"
      :squares="[80, 80]"
      squares-class-name="hover:fill-blue-500"
    />
  </div>
</template>

<style></style>
