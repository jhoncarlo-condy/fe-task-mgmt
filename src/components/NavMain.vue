<script setup lang="ts">
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ChevronRight, type LucideIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()

function handleClick(url?: string) {
  if (url) router.push(url)
}
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem
        v-for="item in items"
        :key="item.title"
        :class="{ 'bg-muted': item.isActive }"
      >
        <SidebarMenuButton :tooltip="item.title" as="button" @click="handleClick(item.url)">
          <component :is="item.icon" v-if="item.icon" />
          <span>{{ item.title }}</span>
          <ChevronRight v-if="item.items?.length" class="ml-auto text-muted-foreground" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
