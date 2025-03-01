<script setup>
import { getData_onetask } from '@/API/API';
import Button from 'primevue/button';
const emit = defineEmits();

const toggleSideDetailsFromChild = () => {
  emit('toggle-side-details');
};
</script>

<template>
    <div class="w-full h-full bg-[#1a1a1b] p-5 relative">
        <Button @click="toggleSideDetailsFromChild" type="button" icon="pi pi-chevron-left" class="w-14 shadow-sm absolute top-5 left-5" size="large" rounded severity="secondary" />
            <section class="p-10">
                <h1 class="text-[15px] font-semibold text-gray-500">Title :</h1>
                <div class="flex gap-4 mb-5 items-center w-full mt-3 relative">
                <div class="w-full h-[400px] overflow-hidden flex flex-col gap-5"> 
                        <h1 class="text-5xl text-gray-300 font-semibold mb-10 break-words">{{ cardId?.title }}</h1>
                        <h1 class="text-[15px] font-semibold text-gray-500 mb-3">Description :</h1>
                        <p class="text-xl text-gray-200 break-words">{{ cardId?.disc }}</p>
                </div>
            </div>
            </section>

            <section class="p-10">
                <h1 class="text-[15px] font-semibold text-gray-500 mb-5">Details :</h1>

                <div class="flex flex-col gap-1">
                    <section class="flex items-center gap-2">
                        <h1 class="text-[15px] font-semibold text-gray-500">Created Date :</h1> 
                     <h1 class=" text-gray-400 font-semibold text-[14px] flex items-center mb-1 gap-[6px]">
                    <div>{{ formattedDate }}</div>
                    </h1>
                    </section>
                     <section class="flex items-center gap-2">
                        <h1 class="text-[15px] font-semibold text-gray-500">Status :</h1> 
                        <h1 :class=" 
                cardId?.status === 'Todo' ? 'text-orange-500' :
                cardId?.status === 'In Progress' ? 'text-yellow-400' :
                cardId?.status === 'Done' ? 'text-green-400' : ''"  class="font-semibold text-[14px] flex items-center mb-1 gap-[6px]">
                    <i class="pi pi-spinner mt-[2px] text-[24px]" style="font-size: 14px"></i>
                    <div>{{ cardId?.status }}</div>
                    </h1>
                    </section>
                    <section class="flex items-center gap-2">
                        <h1 class="text-[15px] font-semibold text-gray-500">Priority :</h1> 
                    <h1 :class=" 
                cardId?.praio === 'High' ? 'text-red-500' :
                cardId?.praio === 'Medium' ? 'text-orange-400' :
                cardId?.praio === 'Low' ? 'text-green-400' : ''"  class="font-semibold text-[14px] flex items-center gap-1">
                    <i class="pi pi-sort-amount-up" style="font-size: 1rem"></i>
                    {{ cardId?.praio }}
                    </h1>
                    </section>
                </div>
            </section>
  </div>
</template>

<script>
export default {
  props: {
    cardId: {
      type: Number,
    },
  },
  computed: {
    formattedDate() {
      const date = new Date(this.cardId?.created_at);
      const day = String(date.getDate()).padStart(2, '0'); 
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(2); 
      
      return `${day}/${month}/${year}`;
    },
  },
};
</script>