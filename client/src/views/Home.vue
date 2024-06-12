<template>
  <section class="grid grid-cols-5 mt-5 gap-5">
    <div class="col-span-1">
      <div
        class="bg-gray-200 h-10 rounded-ss-lg rounded-se-lg px-10 flex justify-between items-center">
        <p class="text-blue-900 font-bold text-lg">Phones</p>
        <p class="text-blue-900 font-bold text-lg text">Attempts (0)</p>
      </div>

      <div class="bg-gray-100 pb-5 rounded-ee-lg rounded-es-lg">
        <Input
          class="w-full py-3 ps-5"
          label=""
          placeholder="Search"
          @input="emitData('search', $event)" />

        <div class="space-y-4">
          <div
            v-for="i in 3"
            class="flex justify-start items-center gap-2">
            <div class="w-[5px] h-[35px] bg-green-600"></div>

            <ul class="px-10 flex justify-between w-full">
              <li class="font-bold">123456</li>
              <li class="font-bold">0</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-4 h-full">
      <div class="bg-gray-200 h-10 rounded-ss-lg rounded-se-lg"></div>

      <div
        class="bg-gray-100 h-[220%] rounded-ee-lg rounded-es-lg flex justify-center items-center">
        <p class="text-xl text-gray-400">Waiting for new call...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Input from '../components/Input.vue';
  import { reactive } from 'vue';

  const form = reactive({
    search: ''
  });

  const emitData = (data, value) => {
    form[data] = value;
  };
</script>
