<template>
  <div class="">
    <p class="font-bold text-blue-900">{{ label }}</p>
    <input
      v-model="data"
      type="text"
      :placeholder="placeholder"
      class="bg-gray-100 rounded w-full p-2 text-blue-900 outline-none focus:outline-none" />
  </div>
</template>

<script setup>
  import { onBeforeUpdate, watch } from 'vue';

  let data = defineModel();
  const emit = defineEmits(['input']);
  watch(data, (newVal) => {
    emit('input', newVal);
  });

  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    }
  });

  data = props.value;
  onBeforeUpdate(() => {
    data = props.value;
  });
</script>
