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
import { reactive, ref, watchEffect } from 'vue'
import CreateTask from '../Task/CreateTask.vue'

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

const tableData = reactive<{ table: Task[]; hasMore: boolean }>({
  table: [],
  hasMore: false,
})

watchEffect(() => {
  if (result.value?.original) {
    tableData.table = result.value.original.data
    tableData.hasMore = result.value.original.next_page_url ? true : false
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
      <h1 class="text-xl font-semibold">Task Table</h1>
      <CreateTask />
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
          <TableCell>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                task.status === 'Pending'
                  ? 'bg-orange-100 text-orange-500'
                  : 'bg-green-100 text-green-500',
              ]"
            >
              {{ task.status }}
            </span>
          </TableCell>
          <TableCell>
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                task.priority === 'Low'
                  ? 'bg-blue-100 text-blue-500'
                  : task.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-500'
                    : task.priority === 'High'
                      ? 'bg-red-100 text-red-500'
                      : 'bg-gray-100 text-gray-500',
              ]"
            >
              {{ task.priority }}
            </span>
          </TableCell>

          <TableCell>
            <Button size="sm" variant="outline">Edit</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class="flex justify-end gap-2 mt-4">
      <Button variant="outline" size="sm" @click="currentPage--" :disabled="currentPage === 1">
        Previous
      </Button>
      <Button variant="outline" size="sm" @click="currentPage++" :disabled="!tableData.hasMore">
        Next
      </Button>
    </div>
  </section>
</template>
