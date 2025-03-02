<script setup>
import { ref, computed } from 'vue';
import Popover from 'primevue/popover';
import Button from 'primevue/button';
import OpenModel from './model/OpenModel.vue';
import Head_tabs from './Head_tabs.vue';
import { getData_onetask } from '@/API/API';
import { HOST } from '@/env/env';

const emit = defineEmits();

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
});

const op = ref();
const visible = ref(false);
const type_ = ref(null);
const cardId_V = ref();
const popoverVisible = ref(null);
const selectedStatus = ref(null);  
const selectedPriority = ref(null); 
const tab = ref(null);

const filteredTasks = computed(() => {

  if (tab.value === 'All' || !tab.value) {
    return props.tasks;
  }
  return props.tasks.filter(task => task.status === tab.value);
});


const togglePopover = (index) => {
  if (popoverVisible.value === index) {
    popoverVisible.value = null;
  } else {
    popoverVisible.value = index;
  }
};

const handleSendOneCrad = async (data) => {
  try {
    await getData_onetask(HOST, data).then((data) => {
      console.log(data)
      emit('sendData', data);
      emit('toggle-side-details');
    });
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
};

const removedData_ = (data) => {
  emit('toParentData_remove', data);
};

const updatedData_ = (data) => {
  // console.log(import.meta.env.VUE_SERVER_HOST);
  emit('toParentData_update', data);
};

const handleSelectedTab = (tab_data) => {
  tab.value = tab_data
};
</script>


<template>
    <Head_tabs @update:activeTab="handleSelectedTab"/>
    <section class="w-full lg:h-[450px] md:h-[450px] h-[600px] overflow-y-auto flex flex-col gap-5 p-3">
    <OpenModel @updatedData="updatedData_" @removedData="removedData_" :cardId="cardId_V" :visible="visible" :type="[type_]" @update:visible="visible = $event" />
    <div v-if="filteredTasks.length < 1" class="w-full h-[450px] flex items-center justify-center">
      <h1 class="text-4xl text-gray-500 font-semibold">No Tasks</h1>
    </div>

    <div data-test="card__" v-for="(item, index) in filteredTasks" :key="index" class="w-full h-[150px] bg-[#20202091] border-[1px] border-[#414141b0] p-5 rounded-xl relative">
      <h1 
      @click="visible = true; type_ = 'praio__'; cardId_V = item.id"
      :class=" 
                item.praio === 'High' ? 'text-red-500' :
                item.praio === 'Medium' ? 'text-orange-400' :
                item.praio === 'Low' ? 'text-green-400' : ''" class="absolute top-3 right-3 font-semibold text-xs flex items-center gap-1 hover:opacity-60 duration-300 cursor-pointer">
        <i class="pi pi-sort-amount-up" style="font-size: 1rem"></i>
        {{ item.praio }}
      </h1>

      <div @click="visible = true; type_ = 'status__'; cardId_V = item.id" class="text-orange-400 font-semibold text-[13px] mb-1 absolute left-3 top-2 cursor-pointer hover:opacity-60 duration-300">
        <div class=" relative w-full h-full flex items-center gap-1">
             <i :class="['pi pi-align-right mt-[2px] pt-[0.5px]', 
                item.status === 'Todo' ? 'text-orange-500' :
                item.status === 'In Progress' ? 'text-yellow-500' :
                item.status === 'Done' ? 'text-green-500' : ''
              ]" style="font-size: 12px"></i>
              <div :class=" 
                item.status === 'Todo' ? 'text-orange-500' :
                item.status === 'In Progress' ? 'text-yellow-500' :
                item.status === 'Done' ? 'text-green-500' : ''"> {{ item.status }}</div>
            </div>
        </div>
           

      <div class="absolute bottom-3 right-3 flex items-center gap-2">
        <div class="card flex justify-center">
          <Button data-test="details_btn" @click="handleSendOneCrad(item.id)" type="button" icon="pi pi-expand" class="w-14 shadow-sm" size="small" rounded severity="secondary" />
        </div>

        <div class="card flex justify-center relative">
          <Button
            data-test="card__more_btn"
            type="button"
            icon="pi pi-ellipsis-h"
            class="w-14 shadow-sm"
            size="small"
            rounded
            severity="secondary"
            @click="togglePopover(index)"  
          />
          <div
            v-if="popoverVisible === index"
            class="bg-[#222222] border-[1px] border-[#414141b0] rounded-br-xs rounded-tl-4xl p-4 w-[110px] h-auto rounded-xl absolute top-[-95px] right-5 z-[999]"
          >
            <div class="flex flex-col gap-2 w-full text-[15px]">
              <button
                data-test="card_edit_btn"
                @click="visible = true; type_ = 'edit'; cardId_V = item.id; togglePopover(index)"
                class="cursor-pointer flex justify-start items-center gap-2 text-gray-300 hover:text-blue-400 duration-500"
              >
                <i class="pi pi-pen-to-square" style="font-size: 1rem"></i>
                <h1>Edit</h1>
              </button>
              <button
                data-test="card_remove_btn"
                @click="visible = true; type_ = 'remove'; cardId_V = item.id; togglePopover(index)"
                class="cursor-pointer flex justify-start items-center gap-2 text-gray-300 hover:text-red-400 duration-500"
              >
                <i class="pi pi-times" style="font-size: 1rem"></i>
                <h1>Remove</h1>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-4 mb-5 items-center w-full mt-3 relative p-3">
        <div class="max-w-[80%] overflow-hidden flex gap-5 relative ">
          <div>
            <h1 class="text-2xl text-gray-300 font-semibold"> {{ item.title }}</h1>
            <p class="text-[15px] text-gray-500"> {{ item.disc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
::-webkit-scrollbar{
  background: transparent;
  border-radius: 30px;
  scrollbar-width: thin;
}

::-webkit-scrollbar-thumb{
  background: #4d4d4db0;
  border-radius: 30px;
  width: 2px;
 
}

.shdw{
  z-index: 999;
    background: rgb(2,0,36);
    background: linear-gradient(to top , #101011 0%, rgba(51, 51, 51, 0) 100%);
}

</style>

