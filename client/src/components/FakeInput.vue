<template>
  <div class="select-none">
    <p class="font-bold text-blue-900">{{ label }}</p>
    <div
      class="bg-gray-100 rounded w-full p-2 text-blue-900 outline-none focus:outline-none">
      {{ value }}
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: 'Hello'
    }
  });
</script>
