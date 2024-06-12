<template>
  <main
    class="h-screen px-4 py-2 sm:px-6 sm:py-4 md:px-8 md:py-6 lg:px-12 lg:py-8">
    <header class="w-full flex justify-start items-center gap-4 mb-10">
      <svg
        class="cursor-pointer bg-gray-200 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="32"
        height="32"
        color="#000000"
        fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="1.5" />
        <path
          d="M13.5 16C13.5 16 10.5 13.054 10.5 12C10.5 10.9459 13.5 8 13.5 8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <h1 class="text-3xl text-blue-900">
        Welcome to <span class="text-yellow-500"> Sondosjadoo Meto </span>
        | Outgoing Task Details
      </h1>
    </header>

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

    <section class="flex justify-start items-center gap-5">
      <div class="flex justify-start items-center gap-2">
        <div class="size-3 rounded-full bg-gray-500"></div>
        <p class="text-gray-500">Awaiting</p>
      </div>

      <div class="flex justify-start items-center gap-2">
        <div class="size-3 rounded-full bg-yellow-500"></div>
        <p class="text-gray-500">Busy/Not Answered</p>
      </div>

      <div class="flex justify-start items-center gap-2">
        <div class="size-3 rounded-full bg-red-500"></div>
        <p class="text-gray-500">Closed</p>
      </div>

      <div class="flex justify-start items-center gap-2">
        <div class="size-3 rounded-full bg-green-500"></div>
        <p class="text-gray-500">Recalled incoming</p>
      </div>
    </section>
    <RouterView />
  </main>
</template>

<script setup>
  import Input from './components/Input.vue';
  import DateComponent from './components/DateComponent.vue';

  import { reactive } from 'vue';

  const form = reactive({
    title: '',
    department: '',
    status: '',
    phone: ''
  });

  const emitData = (data, value) => {
    form[data] = value;
  };

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
