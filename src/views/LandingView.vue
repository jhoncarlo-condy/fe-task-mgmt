<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
          <Tabs default-value="account" class="w-full p-2">
            <TabsList class="grid w-full grid-cols-2">
              <TabsTrigger value="account" class="hover:cursor-pointer"> Login </TabsTrigger>
              <TabsTrigger value="register" class="hover:cursor-pointer"> Register </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardContent class="space-y-4">
                  <div class="space-y-1">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div class="space-y-1">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <div class="space-y-4 place-self-end">
                    <Button class="hover:cursor-pointer">Login</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="register">
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
                    <Button class="hover:cursor-pointer">Register</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<style></style>
