<script setup lang="ts">
import UserSidebar from '@/views/User/UserSidebar.vue'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import UserDashboardDetail from './UserDashboardDetail.vue'
</script>
<template>
  <SidebarProvider>
    <UserSidebar />
    <SidebarInset> <UserDashboardDetail /></SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
