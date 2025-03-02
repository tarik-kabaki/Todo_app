<script setup>
import Main_body from './components/Main_body.vue';
import Create_task from './components/Create_task.vue';
import Head_title from './components/Head_title.vue';
import Head_tabs from './components/Head_tabs.vue';
import SideDetails from './components/model/SideDetails.vue';
import { onMounted, ref } from 'vue';
import { getData } from './API/API';
import { HOST } from './env/env';

const isSideDetailsVisible = ref(false);
const data = ref([]); 

onMounted(async () => {
  try {
    const response = await getData(HOST);
    data.value.push(...response);  
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
});


const toggleSideDetails = () => {
  isSideDetailsVisible.value = !isSideDetailsVisible.value;
};

function handleCreatedData(dataItem) {
  data.value.push(dataItem); 
}

function handleRemovedData(id) {
  const index = data.value.findIndex(task => task.id === id);
  
  if (index !== -1) {
   return data.value.splice(index, 1); 
   }
}

function handleUpdateData(datas) {
  const index = data.value.findIndex(task => task.id === datas.id);
  
  if (index !== -1) {
   return data.value.splice(index, 1, datas); 
   }
}
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center bg-linear-to-r/srgb from-[#101011] to-[#18181a]">
    <div class="relative w-[600px] max-w-[800px] lg:h-[800px] md:h-[800px] h-full border-[1px] border-[#363636] bg-[#1a1a1b] lg:rounded-2xl md:rounded-2xl rounded-none overflow-hidden">
      <div class="shdw absolute w-full h-[50px] bottom-0 left-0"></div>
      <section :class="{
        'translate-x-[600px]': !isSideDetailsVisible,
        'translate-x-[0px]': isSideDetailsVisible
      }" class="w-[600px] max-w-[800px] h-[800px] max-h-[800px] absolute transition-transform duration-300">
        <SideDetails :cardId="selectedCard" @toggle-side-details="toggleSideDetails"/>
      </section>
      <section :class="{
        'translate-x-[0px]': !isSideDetailsVisible,
        'translate-x-[-600px]': isSideDetailsVisible
      }" class="absolute left-0 top-0 w-full h-full transition-transform duration-300">

          <Head_title/>
          <div class="p-10">
          <Create_task @toParentData="handleCreatedData"/>
          <Main_body @toParentData_update="handleUpdateData" @toParentData_remove="handleRemovedData" :tasks="data" @toggle-side-details="toggleSideDetails" @sendData="handleDataFromChild"/>
        </div>
      </section>
    </div>
  </div>
</template>

  <style scoped>
  .cursor-pointer {
  cursor: pointer;
}
  </style>

<script>
export default {
  data() {
    return {
      selectedCard: null
    };
  },
 
  methods: {
  
    handleDataFromChild (data) {
      this.selectedCard = data
    },
  },
};
</script>
  

<style>
.shdw{
  z-index: 999;
    background: rgb(2,0,36);
    background: linear-gradient(to top , #101011 0%, rgba(51, 51, 51, 0) 100%);
}
</style>
