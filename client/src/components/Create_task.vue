<script setup>
import { ref } from "vue"
import OpenModel from './model/openModel.vue';

const visible = ref(false);
</script>

<template>
   <button label="Show" @click="visible = true" class='gap-3 mb-5 hover:bg-[#1a1a1ab0] duration-300 cursor-pointer font-semibold w-full h-[50px] bg-[#131313d2] border-[1px] border-[#272727] rounded-md flex justify-start items-center p-5 text-gray-600'>
            <i class="pi pi-align-left" style="font-size: 1rem"></i>
            <h1>Add a task...</h1> 
        </button>
        <OpenModel :visible="visible" :type="['create']" @update:visible="visible = $event" />
</template>

<script>
export default {
    data() {
      return {
        isVisible: false, 
      };
    },

    methods:{
        openModal() {
      this.isVisible = true; 
    },
    closeModal() {
      this.isVisible = false;
    },
    }
}

</script>