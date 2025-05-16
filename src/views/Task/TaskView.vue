<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import UserTask from '../User/UserTask.vue'
import UserSidebar from '../User/UserSidebar.vue'

const route = useRoute()
const showUserTask = computed(() => route.path.includes('/user'))
</script>

<template>
  <SidebarProvider>
    <UserSidebar />
    <SidebarInset>
      <UserTask v-if="showUserTask" />
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
