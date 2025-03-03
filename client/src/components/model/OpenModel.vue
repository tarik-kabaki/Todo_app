<script setup>
import { defineProps, defineEmits, watch, computed } from 'vue';
import Dialog from 'primevue/dialog';
import { ref } from "vue"
import Select from 'primevue/select';
import axios from 'axios';
import { removeData, updateData } from '@/API/API';
import { HOST } from '@/env/env';


const selectedStatus = ref(null);
const selectedPraio = ref(null);
const title = ref(null);
const desc = ref(null);
const isError = ref(null);
const isEnabled = ref(false);
const isSelected_status = ref(null);
const isSelected_status_V = ref(null);
const isSelected_praio = ref(null);
const isSelected_praio_V = ref(null);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: true
  },
  cardId: {
    type: Number,
  }
});


const cities = ref([
    { name: 'Todo' },
    { name: 'In Progress' },
    { name: 'Done' },
]);

const praio = ref([
    { name: 'High' },
    { name: 'Medium' },
    { name: 'Low' },
]);


const emit = defineEmits(['update:visible']);

const createTask = async () => {
  if(props.type[0] === 'edit') {
    isEnabled.value = true;
  updateData(HOST,props.cardId, {
    title: title.value,
    disc: desc.value,
    status: selectedStatus.value ? selectedStatus.value.name : undefined,
    praio: selectedPraio.value ? selectedPraio.value.name : undefined

  }).then((data)=>{
    isError.value = null;
     title.value = null,
     desc.value = null,
     selectedStatus.value = null;
     selectedPraio.value = null; 
    emit('update:visible', false);
    emit('updatedData', data);
    isEnabled.value = false;

  }).catch((err)=>{
    isError.value = "This task is already exist";
    isEnabled.value = false;
  });

  } else {
    if(title.value.length > 1 && desc.value.length > 1 && !selectedStatus.value.name && !selectedPraio.value.name){
    return console.log('invalid');
  } else {
    isEnabled.value = true;
    await axios.post(`${HOST}create/`,{
    title: title.value,
    disc: desc.value,
    status: selectedStatus.value.name,
    praio: selectedPraio.value.name

  }).then((data)=>{
    isEnabled.value = false;
    isError.value = null;
    title.value = null,
    desc.value = null,
    selectedStatus.value = null;
    selectedPraio.value = null; 
    emit('update:visible', false);
    emit('createdData', data);

  }).catch((err)=>{
    isError.value = "This task is already exist";
    isEnabled.value = false;
  });
   }
  }
};

const RemoveTask = async () => {
  await removeData(HOST, props.cardId).then((data)=>{
    emit('update:visible', false);
    emit('removedData', data);
  })
};

const handleExit = () => {
    isError.value = null;
    title.value = null,
    desc.value = null,
    selectedStatus.value = null;
    selectedPraio.value = null; 
}

const select_status = (status_i, data_v) => {
  isSelected_status.value = status_i;
  isSelected_status_V.value = data_v;
};

const select_praio = (praio_i, data_v) => {
  isSelected_praio.value = praio_i;
  isSelected_praio_V.value = data_v;
};

const handeStatus_save = () => {

if(props.type[0] === 'status__'){
  isEnabled.value = true;
  updateData(HOST,props.cardId, {
    status: isSelected_status_V.value,
  }).then((data)=>{
    isSelected_status.value = null
    isSelected_status_V.value = null
    isError.value = null;
    emit('update:visible', false);
    emit('updatedData', data);
    isEnabled.value = false;

  }).catch((err)=>{
    isError.value = "This task is already exist";
    isEnabled.value = false;
  });
} else {
  isEnabled.value = true;
  updateData(HOST,props.cardId, {
    praio: isSelected_praio_V.value,
  }).then((data)=>{
    isSelected_praio.value = null
    isSelected_praio_V.value = null
    isError.value = null;
    emit('update:visible', false);
    emit('updatedData', data);
    isEnabled.value = false;
  }).catch((err)=>{
    isError.value = "This task is already exist";
    isEnabled.value = false;
  });
 }
}

</script>

<template>
  <div class="card flex justify-center">

        <Dialog data-test="card__title" v-if="props.type[0] !== 'remove' && props.type[0] !== 'status__' && props.type[0] !== 'praio__'" v-model:visible="props.visible" modal :header="props.type[0] === 'edit' ? 'Edit Your Task' : 'Create Your Task'" :style="{ width: '25rem' }">
             <input data-test="input_" v-model="title" class="w-full h-[50px] border-b border-[#414141b0] focus:outline-none placeholder:text-gray-600 mb-3" placeholder="Your title"/>
             <input data-test="input__" v-model="desc" class="w-full h-[50px] border-b border-[#414141b0] focus:outline-none placeholder:text-gray-600 mb-5" placeholder="Description"/>
             <div class="flex gap-3 items-center">
              <Select id="wa3" data-test="select_" v-model="selectedStatus" :options="cities" optionLabel="name" placeholder="Status" class="w-full md:w-full h-10 mb-10" />
              <Select data-test="select__" v-model="selectedPraio" :options="praio" optionLabel="name" placeholder="priority" class="w-full md:w-full h-10 mb-10" />
             </div>
            
            <button data-test="close-btn" class="flex items-center justify-center hover:opacity-60 duration-300 cursor-pointer w-[40px] h-[40px]  absolute top-5 right-5 rounded-full bg-white" type="button" label="Cancel" severity="secondary" @click="emit('update:visible', false); handleExit()">
                <i class="pi pi-times text-black" style="font-size: 1rem" ></i>
            </button>
            <button v-if="isEnabled === false" id="create-btn" @click="createTask" class="w-full h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] font-semibold tracking-wide hover:opacity-60 cursor-pointer duration-300">{{ props.type[0] === 'edit' ?  "Edit Task" : "Create Task"}}</button>
            <button v-if="isEnabled === true" id="create-btn" @click="createTask" class="w-full h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] font-semibold tracking-wide hover:opacity-60 cursor-pointer duration-300 flex items-center justify-center">
              <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            </button>
            <div class="mt-2 flex justify-center text-[14px] text-red-500">{{ isError }}</div>
          </Dialog>


         <Dialog data-test="remove-model" v-if="props.type[0] === 'remove' " v-model:visible="props.visible" modal header="Are you sure ?" :style="{ width: '25rem' }">
            <button data-test="top_cancel" class="flex items-center justify-center hover:opacity-60 duration-300 cursor-pointer w-[40px] h-[40px]  absolute top-5 right-5 rounded-full bg-white" type="button" label="Cancel" severity="secondary" @click="emit('update:visible', false)">
                <i class="pi pi-times text-black" style="font-size: 1rem" ></i>
            </button>
            <h1 class="text-gray-400">this item will be permanently deleted !</h1>
            <div class="w-full justify-end flex items-center gap-3 mt-10">
             <button data-test="remove-cancel"  class="w-[100px] h-[40px]  text-white text-[16px] font-semibold tracking-wide hover:opacity-60 cursor-pointer duration-300" @click="emit('update:visible', false)">Cancel</button>
             <button data-test="remove-delete" @click="RemoveTask" class="w-[100px] h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] font-semibold tracking-wide hover:opacity-60 cursor-pointer duration-300">Delete</button>    
            </div>
         
         </Dialog>

         <Dialog data-test="remove-model" v-if="props.type[0] === 'status__' " v-model:visible="props.visible" modal header="Update your status" :style="{ width: '25rem' }">
           <button data-test="close-btn" class="flex items-center justify-center hover:opacity-60 duration-300 cursor-pointer w-[40px] h-[40px]  absolute top-5 right-5 rounded-full bg-white" type="button" label="Cancel" severity="secondary" @click="emit('update:visible', false); handleExit(), isSelected_status = null">
                <i class="pi pi-times text-black" style="font-size: 1rem" ></i>
            </button>  
          <div class="w-full flex flex-col gap-2 mt-5">
            <div @click="select_status(i, stats.name)" :class="[isSelected_status === i ? 'bg-white text-black' : '']" v-for="(stats, i) in cities" class="w-full h-[50px] bg-[#1d1d1d] border-[1px] border-[#2e2e2e] flex items-center p-5 rounded-lg font-semibold cursor-pointer hover:bg-gray-200 hover:text-gray-900 duration-300">
              {{ stats.name }}
            </div>
           </div>
          <div class="w-full justify-end flex items-center gap-3 mt-5">
             <button v-if="isEnabled === false" @click="handeStatus_save" class="w-full h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] not-first:tracking-wide hover:opacity-60 cursor-pointer duration-300 font-semibold">Save status</button>    
             <button v-if="isEnabled === true" @click="handeStatus_save" class="flex items-center justify-center w-full h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] not-first:tracking-wide hover:opacity-60 cursor-pointer duration-300 font-semibold">
              <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
             </button> 
            </div>
         </Dialog>

         <Dialog data-test="remove-model" v-if="props.type[0] === 'praio__'" v-model:visible="props.visible" modal header="Update your priority" :style="{ width: '25rem' }">
           <button data-test="close-btn" class="flex items-center justify-center hover:opacity-60 duration-300 cursor-pointer w-[40px] h-[40px]  absolute top-5 right-5 rounded-full bg-white" type="button" label="Cancel" severity="secondary" @click="emit('update:visible', false); handleExit(), isSelected_praio = null">
                <i class="pi pi-times text-black" style="font-size: 1rem" ></i>
            </button>  
          <div class="w-full flex flex-col gap-2 mt-5">
            <div @click="select_praio(i, pra.name)" :class="[isSelected_praio === i ? 'bg-white text-black' : '']" v-for="(pra, i) in praio" class="w-full h-[50px] bg-[#1d1d1d] border-[1px] border-[#2e2e2e] flex items-center p-5 rounded-lg font-semibold cursor-pointer hover:bg-gray-200 hover:text-gray-900 duration-300">
              {{ pra.name }}
            </div>
           </div>
          <div class="w-full justify-end flex items-center gap-3 mt-5">
             <button v-if="isEnabled === false" @click="handeStatus_save" class="w-full h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] not-first:tracking-wide hover:opacity-60 cursor-pointer duration-300 font-semibold">Save priority</button>    
             <button v-if="isEnabled === true" @click="handeStatus_save" class="flex items-center justify-center w-full h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] not-first:tracking-wide hover:opacity-60 cursor-pointer duration-300 font-semibold">
              <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            </button>    
            </div>
         </Dialog>

  </div>
</template>

<script>
export default {
    data() {
      return {
        isVisible: false, 
      };
    },
    methods:{
    }
}

</script>