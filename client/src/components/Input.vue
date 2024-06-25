<template>
  <div class="inline-block w-full absolute bottom-0 left-0">
    <p
      v-if="label.length > 0"
      class="font-bold text-blue-900">
      {{ label }}
    </p>
    <input
      v-model="data"
      type="text"
      :placeholder="placeholder"
      class="bg-gray-100 rounded p-2 text-blue-900 outline-none focus:outline-none"
      :class="$attrs.class" />
  </div>
</template>

<script setup>
  import { onBeforeUpdate, watch } from 'vue';

  let data = defineModel();
  const emit = defineEmits(['search']);
  watch(data, () => {
    emit('search', data.value);
  });

  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    }
  });
</script>
