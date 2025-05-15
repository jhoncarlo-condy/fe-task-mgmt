<script setup lang="ts">
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import UserDashboardDetail from './UserDashboardDetail.vue'
import UserSidebar from './UserSidebar.vue'
</script>
<template>
  <SidebarProvider>
    <UserSidebar />
    <SidebarInset> <UserDashboardDetail /></SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
