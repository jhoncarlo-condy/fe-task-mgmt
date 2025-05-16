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
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useGetTasks } from '@/server/Task/Task'
import { reactive, ref, watch, watchEffect } from 'vue'

interface Task {
  id: number
  title: string
  description: string
  status: string
  priority: string
  order: number
}

const currentPage = ref(1)
const { data: result } = useGetTasks(currentPage)

const tableData = reactive<{ table: Task[] }>({
  table: [],
})

// ✅ correct reactive sync
watchEffect(() => {
  if (result.value?.original) {
    tableData.table = result.value.original.data
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
            <BreadcrumbPage>Tasks</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>

  <section class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">User Table</h1>
      <Button class="ml-auto">Create Task</Button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(task, index) in tableData.table" :key="task.id">
          <TableCell class="font-medium">{{ (currentPage - 1) * 10 + index + 1 }}</TableCell>
          <TableCell>{{ task.title }}</TableCell>
          <TableCell>{{ task.description }}</TableCell>
          <TableCell>{{ task.status }}</TableCell>
          <TableCell>{{ task.priority }}</TableCell>
          <TableCell>
            <Button size="sm" variant="outline">Edit</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>
</template>
