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
          @input="emitData('search', $event)"
          placeholder="Search" />

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

            <router-link
              class="w-full"
              :to="`/phone/${phone.id}`">
              <ul class="px-10 flex justify-between">
                <li class="font-bold">{{ phone.phone }}</li>
                <li class="font-bold text-center w-24">
                  {{ phone.attempt }}
                </li>
              </ul>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-4 h-full">
      <div
        class="px-10 bg-gray-200 h-10 rounded-ss-lg rounded-se-lg w-full flex justify-between items-center">
        <p class="text-blue-900 font-bold">
          New call
          <span class="text-yellow-500">({{ currentPhone.phone }})</span>
        </p>
        <p class="text-blue-900 font-bold">
          {{ hours.toString().padStart(2, '0') }}:{{
            minutes.toString().padStart(2, '0')
          }}:{{ seconds.toString().padStart(2, '0') }}
        </p>
        <p>Clock</p>
      </div>

      <section class="bg-gray-100 rounded-ee-lg rounded-es-lg p-10 space-y-10">
        <div class="w-full space-y-5">
          <p class="text-blue-900 font-bold text-xl">information:</p>

          <div class="flex gap-10">
            <Input
              class="border-b w-1/2"
              @input="emitData('name', $event)"
              label=""
              placeholder="name" />

            <Input
              class="border-b w-1/2"
              label=""
              placeholder="llll" />
          </div>

          <div class="flex gap-10">
            <Input
              class="border-b w-1/2"
              label=""
              placeholder="aaaa" />

            <Input
              class="border-b w-1/2"
              label=""
              placeholder="project name" />
          </div>
        </div>

        <div class="w-full space-y-5">
          <p class="text-blue-900 font-bold text-xl">Questions:</p>

          <div class="flex w-full">
            <div class="w-full">
              <p class="text-blue-900 font-bold">
                الجنس؟
                <span class="text-red-500">*</span>
              </p>
              <select
                v-model="gender"
                class="w-11/12 p-3">
                <option
                  disabled
                  selected>
                  select an answer
                </option>
                <option value="female">انثى</option>
                <option value="male">ذكر</option>
              </select>
            </div>

            <div class="w-full">
              <p class="text-blue-900 font-bold">
                من أين حصلت على القسيمة؟
                <span class="text-red-500">*</span>
              </p>
              <select
                v-model="discount"
                class="w-11/12 p-3">
                <option
                  disabled
                  selected>
                  select an answer
                </option>
                <option value="female">انثى</option>
                <option value="male">ذكر</option>
              </select>
            </div>

            <div class="w-full">
              <p class="text-blue-900 font-bold">
                كم دفعتي قيمة القسيمة؟
                <span class="text-red-500">*</span>
              </p>
              <select
                v-model="payment"
                class="w-11/12 p-3">
                <option
                  disabled
                  selected>
                  select an answer
                </option>
                <option value="female">انثى</option>
                <option value="male">ذكر</option>
              </select>
            </div>
          </div>

          <div class="flex w-full">
            <div class="w-full">
              <p class="text-blue-900 font-bold">
                هل شرحت لكي الموزعة عن الخدمات التي تقدمها القسيمة؟
                <span class="text-red-500">*</span>
              </p>
              <select
                v-model="explained"
                class="w-11/12 p-3">
                <option
                  disabled
                  selected>
                  select an answer
                </option>
                <option value="female">انثى</option>
                <option value="male">ذكر</option>
              </select>
            </div>

            <div class="w-full">
              <p class="text-blue-900 font-bold">
                هل تم تقديم مرفق صحي معين للزيارة؟
                <span class="text-red-500">*</span>
              </p>
              <select
                v-model="attached"
                class="w-11/12 p-3">
                <option
                  disabled
                  selected>
                  select an answer
                </option>
                <option value="female">انثى</option>
                <option value="male">ذكر</option>
              </select>
            </div>

            <div class="w-full"></div>
          </div>
        </div>

        <div
          @click="sendIt"
          class="text-end">
          <button class="bg-blue-900 text-white px-5 py-3 rounded-lg">
            Save
          </button>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
  import Input from '../components/Input.vue';
  import { onMounted, onUnmounted, onUpdated, reactive, ref, watch } from 'vue';
  import axios from 'axios';
  import router from '../router/index.js';

  const currentPhone = ref({});
  const phone = ref({});
  const form = reactive({
    search: '',
    title: '',
    name: ''
  });

  const data = ref(null);
  let gender = defineModel('gender');
  let explained = defineModel('explained');
  let payment = defineModel('payment');
  let attached = defineModel('attached');
  let discount = defineModel('discount');

  const emitData = (data, value) => {
    form[data] = value;
  };

  const sendIt = () => {
    // if (!form.title || !form.name) {

    // }
    if (
      !gender.value ||
      !explained.value ||
      !payment.value ||
      !attached.value ||
      !discount.value
    ) {
      alert('please fill all fields');
      return;
    }

    axios
      .post('http://localhost:3000/api/v1/phones', {
        ...form,
        gender: gender.value,
        explained: explained.value,
        payment: payment.value,
        attached: attached.value,
        discount: discount.value
      })
      .then((res) => {
        alert(res.data.message);
      });
  };

  const getAllPhones = (id) => {
    axios.get('http://localhost:3000/api/v1/phones').then((res) => {
      if (res.data) {
        data.value = res.data.phones;
        currentPhone.value = res.data.phones.find((phone) => phone.id == id);
      }

      if (currentPhone.value) {
        currentPhone.value = res.data.phones.find((phone) => phone.id == id);
      }
    });
  };

  const getPhone = (id) => {
    axios.get(`http://localhost:3000/api/v1/phones/${id}`).then((res) => {
      if (res.data) {
        phone.value = res.data.phone;
      }
    });
  };
  onMounted(() => {
    const id = router.currentRoute.value.params.id;

    getAllPhones(id);
    getPhone(id);
  });

  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  const counter = ref(null);
  // const secondsCounter = setInterval(() => {
  //   if (seconds.value < 60) {
  //     seconds.value++;
  //   } else {
  //     seconds.value = 0;
  //   }
  // }, 1000);
  // const minutesCounter = setInterval(() => {
  //   if (minutes.value < 60) {
  //     minutes.value++;
  //   } else {
  //     minutes.value = 0;
  //   }
  // }, 60000);
  // const hoursCounter = setInterval(() => {
  //   if (hours.value < 24) {
  //     hours.value++;
  //   } else {
  //     hours.value = 0;
  //   }
  // }, 3600000);

  // onUnmounted(() => {
  //   clearInterval(secondsCounter);
  //   clearInterval(minutesCounter);
  //   clearInterval(hoursCounter);
  // });
</script>
