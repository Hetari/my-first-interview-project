<template>
  <main
    class="h-screen px-4 py-2 sm:px-6 sm:py-4 md:px-8 md:py-6 lg:px-12 lg:py-8">
    <Header />

    <section class="flex gap-4 mb-2">
      <Input
        v-for="i in inputsFields"
        :label="i.title"
        @input="emitData(i.emit, $event)"
        :placeholder="i.placeholder" />

      <DateComponent
        :placeholder="''"
        label="End Date"
        @input="emitData('date', $event)" />
    </section>

    <Badges />

    <section class="grid grid-cols-5 mt-5 gap-5">
      <div class="col-span-1 max-xl:col-span-2">
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

          <div class="space-y-4 w-full">
            <div
              v-for="phone in filteredData"
              :key="phone.id"
              class="flex justify-start items-center gap-2 w-full">
              <!-- TODO: do it batter -->
              <div
                class="w-[5px] h-[35px]"
                :class="{
                  'bg-red-500': phone.closed == true,
                  'bg-green-500': phone.done == true,
                  'bg-yellow-500': phone.busy == true,
                  'bg-gray-400': !phone.closed && !phone.busy && !phone.done
                }"></div>

              <ul class="w-full px-10 flex justify-between cursor-pointer">
                <li class="font-bold">{{ phone.phone }}</li>
                <li class="font-bold text-center w-24">
                  {{ phone.attempt }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4 max-xl:col-span-3 h-full">
        <div class="bg-gray-200 h-10 rounded-ss-lg rounded-se-lg">
          <!-- TODO: show the time here -->
          <div v-if="isPhoneSelected"></div>
        </div>

        <div
          class="bg-gray-100 h-[100%] rounded-ee-lg rounded-es-lg flex justify-center items-center">
          <div v-if="isPhoneSelected"></div>
          <p
            v-else
            class="text-xl text-gray-400">
            Waiting for new call...
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
  import Input from './components/Input.vue';
  import DateComponent from './components/DateComponent.vue';
  import Header from './components/Header.vue';
  import Badges from './components/Badges.vue';
  import { onMounted, reactive, ref, watch } from 'vue';
  import axios from 'axios';

  const data = ref(null);
  const filteredData = ref(null);
  const search = ref('');
  const isPhoneSelected = ref(false);
  const form = reactive({
    title: '',
    department: '',
    status: '',
    phone: ''
  });

  const emitData = (data, value) => {
    if (data == 'search') {
      search.value = value;
    } else {
      form[data] = value;
    }
  };

  const getAllPhones = () => {
    axios.get('http://localhost:3000/api/v1/phones').then((res) => {
      if (res.data) {
        data.value = res.data.phones;
        filteredData.value = res.data.phones.sort(
          (a, b) => b.attempt - a.attempt
        );
      }
    });
  };
  onMounted(() => {
    getAllPhones();
  });

  watch(search, (newVal) => {
    filteredData.value = data.value.filter((phone) => {
      return phone.phone.includes(newVal);
    });
  });

  const inputsFields = [
    {
      id: 0,
      title: 'Task name',
      placeholder: 'Brhoom',
      emit: 'title'
    },
    {
      id: 1,
      title: 'Department',
      placeholder: 'Department',
      emit: 'department'
    },
    {
      id: 2,
      title: 'Status',
      placeholder: 'Status',
      emit: 'status'
    },
    {
      id: 3,
      title: 'Phone',
      placeholder: 'Phone',
      emit: 'phone'
    }
  ];
</script>
