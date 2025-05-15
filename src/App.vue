<script setup lang="ts">
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import LandingView from '@/views/LandingView.vue'
</script>

<template>
  <div class="relative grid h-[1000px] w-full place-content-center overflow-hidden">
    <LandingView />
    <InteractiveGridPattern
      :class="'[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]'"
      :width="20"
      :height="20"
      :squares="[80, 80]"
      squares-class-name="hover:fill-blue-500"
    />
  </div>
</template>

<style scoped></style>
