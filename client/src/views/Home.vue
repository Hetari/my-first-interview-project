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
            v-for="(phone, index) in data"
            :key="phone.id"
            class="flex justify-start items-center gap-2">
            <div
              class="w-[5px] h-[35px]"
              :class="{
                'bg-red-500': phone.closed == true,
                'bg-green-500': phone.done == true,
                'bg-yellow-500': phone.busy == true,
                'bg-gray-400': !phone.closed && !phone.busy && !phone.done
              }"></div>

            <router-link :to="`/phone/${phone.phone}`">
              <ul class="px-10 flex justify-between w-full">
                <li class="font-bold">{{ phone.phone }}</li>
                <li class="font-bold">{{ phoneAttempt['attempt'] }}</li>
              </ul>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-4 h-full">
      <div class="bg-gray-200 h-10 rounded-ss-lg rounded-se-lg"></div>

      <div
        class="bg-gray-100 h-[100%] rounded-ee-lg rounded-es-lg flex justify-center items-center">
        <p class="text-xl text-gray-400">Waiting for new call...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
  import Input from '../components/Input.vue';
  import { onMounted, reactive, ref } from 'vue';
  import axios from 'axios';
  import { phoneAttempt } from '../store.js';

  const form = reactive({
    search: ''
  });

  const data = ref(null);

  const emitData = (data, value) => {
    form[data] = value;
  };

  onMounted(() => {
    axios.get('http://localhost:3000/api/v1/phones').then((res) => {
      if (res.data) {
        data.value = res.data.phones;

        data.value.forEach((phone) => {
          phoneAttempt.id = phone.phone;
          phoneAttempt.attempt = 0;
        });
      }
    });
  });
</script>
