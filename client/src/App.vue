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
              v-for="p in filteredData"
              :key="p.id"
              class="flex justify-start items-center gap-2 w-full">
              <div
                class="w-[5px] h-[35px]"
                :class="{
                  'bg-red-500': p.status == 'closed',
                  'bg-green-500': p.status == 'done',
                  'bg-yellow-500': p.status == 'busy',
                  'bg-gray-400': p.status == 'awaiting'
                }"></div>

              <ul
                @click="clickedPhone(p.id)"
                class="w-full px-10 flex justify-between cursor-pointer">
                <li class="font-bold">{{ p.phone }}</li>
                <li class="font-bold text-center w-24">
                  {{ p.attempt }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4 max-xl:col-span-3 h-full">
        <div class="bg-gray-200 h-10 rounded-ss-lg rounded-se-lg">
          <div
            class="flex justify-between items-center px-10 h-full"
            v-if="isPhoneSelected">
            <p class="text-blue-900 font-bold text-lg">
              New call (
              <span class="text-yellow-500">{{ phone.phone }}</span> )
            </p>

            <p>{{ formattedTimer }}</p>

            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                color="#000000"
                fill="none">
                <circle
                  cx="12"
                  cy="13"
                  r="9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round" />
                <path
                  d="M5 19L3 21M19 19L21 21"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M19 3.5697L19.5955 3.27195C20.4408 2.84932 20.7583 2.89769 21.4303 3.5697C22.1023 4.2417 22.1507 4.55924 21.728 5.4045L21.4303 6M5 3.5697L4.4045 3.27195C3.55924 2.84932 3.2417 2.89769 2.5697 3.5697C1.89769 4.2417 1.84932 4.55924 2.27195 5.4045L2.5697 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round" />
                <path
                  d="M12 9.5V13.5L14 15.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M12 3.5V2"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M10 2H14"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </p>
          </div>
        </div>

        <div
          class="bg-gray-100 h-[100%] rounded-ee-lg rounded-es-lg space-y-10 w-full p-10">
          <div
            v-if="isPhoneSelected"
            class="space-y-10">
            <div class="w-full space-y-5">
              <p class="text-blue-900 font-bold text-xl">information:</p>

              <div class="flex gap-10">
                <Input
                  :value="phone.name"
                  class="border-b w-1/2"
                  label=""
                  placeholder="name" />

                <Input
                  :value="phone.city"
                  class="border-b w-1/2"
                  label=""
                  placeholder="llll" />
              </div>

              <div class="flex gap-10">
                <Input
                  :value="phone.major"
                  class="border-b w-1/2"
                  label=""
                  placeholder="aaaa" />

                <Input
                  :value="phone.facebook"
                  class="border-b w-1/2"
                  label=""
                  placeholder="project name" />
              </div>
            </div>

            <div class="w-full space-y-5">
              <p class="text-blue-900 font-bold text-xl">Questions:</p>

              <div class="flex w-full gap-5">
                <div class="w-full">
                  <p class="text-blue-900 font-bold">
                    الجنس؟
                    <span class="text-red-500">*</span>
                  </p>
                  <Multiselect
                    class="w-11/12 p-1"
                    mode="single"
                    placeholder="Search and select your answer"
                    :searchable="true"
                    :close-on-select="false"
                    v-model="gender"
                    :options="genderOptions" />
                </div>

                <div class="w-full">
                  <p class="text-blue-900 font-bold">
                    من أين حصلت على القسيمة؟
                    <span class="text-red-500">*</span>
                  </p>
                  <Multiselect
                    class="w-11/12 p-1"
                    mode="tags"
                    placeholder="Search and select your answer"
                    :searchable="true"
                    :close-on-select="false"
                    v-model="discount"
                    :options="discountOptions" />
                </div>

                <div class="w-full">
                  <p class="text-blue-900 font-bold">
                    كم دفعتي قيمة القسيمة؟
                    <span class="text-red-500">*</span>
                  </p>
                  <Input
                    @input="price = $event"
                    class="w-11/12"
                    label=""
                    placeholder="value" />
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
                    <option value="male">ذكر</option>
                    <option value="female">انثى</option>
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

            <div class="w-full flex max-lg:flex-col gap-5">
              <div class="w-2/3 max-lg:w-full">
                <p class="text-blue-900 font-bold text-xl">Notes:</p>
                <textarea
                  class="w-full h-40 p-3 border rounded outline-none focus:outline-none bg-gray-200"
                  placeholder="notes"
                  name="notes"
                  id=""></textarea>
              </div>

              <div class="w-1/3 max-lg:w-full">
                <p class="text-blue-900 font-bold text-xl">Status:</p>

                <Multiselect
                  class="p-1"
                  mode="single"
                  placeholder="Search and
                select your answer"
                  :searchable="true"
                  :close-on-select="false"
                  v-model="status"
                  :options="statusOptions" />
              </div>
            </div>

            <div
              @click="sendIt"
              class="text-end">
              <button class="bg-blue-900 text-white px-5 py-3 rounded-lg">
                Save
              </button>
            </div>
          </div>
          <p
            v-else
            class="text-xl text-gray-400 flex justify-center items-center h-full">
            Waiting for new call...
          </p>
        </div>
      </div>
    </section>
  </main>
  {{ gender }} {{ discount }} {{ price }} {{ explained }} {{ attached }}
</template>

<script setup>
  import Input from './components/Input.vue';
  import DateComponent from './components/DateComponent.vue';
  import Header from './components/Header.vue';
  import Badges from './components/Badges.vue';

  import Multiselect from '@vueform/multiselect';

  import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
  import axios from 'axios';

  const data = ref(null);
  const phone = ref(null);
  const filteredData = ref(null);
  const search = ref('');
  const isPhoneSelected = ref(false);

  const hour = ref(0);
  const minute = ref(0);
  const second = ref(0);

  // multiselect
  const genderOptions = [
    {
      label: 'ذكر',
      value: 'male'
    },
    {
      label: 'انثى',
      value: 'female'
    },
    {
      label: 'مجهول',
      value: 'other'
    }
  ];
  const discountOptions = [
    {
      label: 'من صديق',
      value: 'friend'
    },
    {
      label: 'من عائلة',
      value: 'family'
    },
    {
      label: 'من النت',
      value: 'online'
    }
  ];
  const statusOptions = [
    {
      label: 'Awaiting',
      value: 'awaiting'
    },
    {
      label: 'Busy/Not Answered',
      value: 'busy'
    },
    {
      label: 'Closed',
      value: 'closed'
    },
    {
      label: 'Recalled incoming',
      value: 'done'
    }
  ];
  const gender = defineModel('gender');
  const discount = defineModel('discount');
  const status = defineModel('status');
  const price = defineModel('price');
  const explained = defineModel('explained');
  const attached = defineModel('attached');

  const emitData = (data, value) => {
    if (data == 'search') {
      search.value = value;
    }
  };

  const clickedPhone = (id) => {
    isPhoneSelected.value = true;
    getPhone(id);
  };

  const getAllPhones = () => {
    axios.get('http://localhost:3000/api/v1/phones').then((res) => {
      if (res.data) {
        data.value = res.data.phones.filter(
          (phone) => !['done', 'closed'].includes(phone.status)
        );
        filteredData.value = data.value.sort((a, b) => a.attempt - b.attempt);
      }
    });
  };
  const getPhone = (id) => {
    axios
      .get(`http://localhost:3000/api/v1/phones/${id}`)
      .then((res) => {
        if (res.data) {
          phone.value = res.data.phone;
          status.value = res.data.phone.status;
        }
      })
      .then(() => {
        stopTimer();
        startTimer();
      });
  };

  const attemptIncrement = (id) => {
    axios
      .put(`http://localhost:3000/api/v1/phones/${id}`, {
        status: status.value
      })
      .then((res) => {
        if (res.data) {
          getAllPhones();
        }
      });
  };

  const sendIt = () => {
    if (
      !gender.value ||
      !discount.value ||
      !status.value ||
      !price.value ||
      !explained.value ||
      !attached.value
    ) {
      alert('Please fill all fields');
      return;
    }

    if (isNaN(parseFloat(price.value)) && !isFinite(price.value)) {
      alert('Price must be a number');
      return;
    }

    attemptIncrement(phone.value.id);
  };

  let timer;
  const startTimer = () => {
    timer = setInterval(() => {
      second.value++;
      if (second.value == 60) {
        second.value = 0;
        minute.value++;
      }
      if (minute.value == 60) {
        minute.value = 0;
        hour.value++;
      }
    }, 1000);
  };

  const stopTimer = () => {
    hour.value = 0;
    minute.value = 0;
    second.value = 0;

    if (timer) {
      clearInterval(timer);
    }
  };

  const padNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formattedTimer = computed(() => {
    return `${padNumber(hour.value)}:${padNumber(minute.value)}:${padNumber(
      second.value
    )}`;
  });

  onMounted(() => {
    getAllPhones();
  });

  onUnmounted(() => {
    stopTimer();
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

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
  .multiselect-option.is-selected,
  .multiselect-tag {
    background-color: rgb(13, 71, 161);
  }

  .multiselect-option.is-selected.is-pointed {
    background-color: rgb(9, 57, 129);
  }

  .multiselect-search,
  .multiselect-tags-search,
  .multiselect-dropdown,
  .multiselect {
    background-color: rgb(229 231 235);
  }
</style>
