<template>
  <!-- TODO: fix the style -->
  <div class="w-fit">
    <p class="font-bold text-blue-900">{{ label }}</p>
    <input
      v-model="data"
      type="date"
      :placeholder="new Date().toISOString().split('T')[0]"
      class="bg-gray-100 rounded w-full p-2 text-blue-900 outline-none focus:outline-none" />
  </div>
</template>

<script setup>
  import { watch } from 'vue';

  let data = defineModel();
  const emit = defineEmits(['input']);
  watch(data, (newVal) => {
    emit('input', newVal);
  });

  defineProps({
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  });
</script>
