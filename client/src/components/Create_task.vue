<script setup>
import { ref } from "vue";
import OpenModel from './model/OpenModel.vue';

const visible = ref(false);

const emit = defineEmits();

// Method to handle the creation of data
const createdData_ = (data) => {
  emit('toParentData', data.data);  // Emitting data to parent
};
</script>

<template>
  <button data-test="create-task-component" label="Show" @click="visible = true" class='gap-3 hover:bg-[#1a1a1ab0] duration-300 cursor-pointer font-semibold w-full h-[50px] mb-5 bg-[#131313d2] border-[1px] border-[#272727] rounded-md flex justify-start items-center p-5 text-gray-600'>
    <i class="pi pi-align-left" style="font-size: 1rem"></i>
    <h1>Add a task...</h1>
  </button>
  <OpenModel @createdData="createdData_" :visible="visible" :type="['create']" @update:visible="visible = $event" />
</template>
