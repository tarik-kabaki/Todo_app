<script setup>
import { defineProps, defineEmits } from 'vue';
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

  updateData(HOST,props.cardId, {

    title: title.value,
    disc: desc.value,
    status: selectedStatus.value ? selectedStatus.value.name : undefined,
    praio: selectedPraio.value ? selectedPraio.value.name : undefined

  }).then((data)=>{

     title.value = null,
     desc.value = null,
     selectedStatus.value = null;
     selectedPraio.value = null; 
    emit('update:visible', false);
    emit('updatedData', data);

  }).catch((err)=>{
    console.log(err)
  });

  } else {
    if(title.value.length > 1 && desc.value.length > 1 && !selectedStatus.value.name && !selectedPraio.value.name){
    return console.log('invalid');
  } else {
    await axios.post(`${HOST}create/`,{

    title: title.value,
    disc: desc.value,
    status: selectedStatus.value.name,
    praio: selectedPraio.value.name

  }).then((data)=>{

    title.value = null,
    desc.value = null,
    selectedStatus.value = null;
    selectedPraio.value = null; 
    emit('update:visible', false);
    emit('createdData', data);

  }).catch((err)=>{
    console.log(err)
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
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-if="props.type[0] !== 'remove'" v-model:visible="props.visible" modal :header="props.type[0] === 'edit' ? 'Edit Your Task' : 'Create Your Task'" :style="{ width: '25rem' }">
             <input v-model="title" class="w-full h-[50px] border-b border-[#414141b0] focus:outline-none placeholder:text-gray-600 mb-3" placeholder="Your title"/>
             <input v-model="desc" class="w-full h-[50px] border-b border-[#414141b0] focus:outline-none placeholder:text-gray-600 mb-5" placeholder="Description"/>
             <div class="flex gap-3 items-center">
              <Select v-model="selectedStatus" :options="cities" optionLabel="name" placeholder="Status" class="w-full md:w-full h-10 mb-10" />
              <Select v-model="selectedPraio" :options="praio" optionLabel="name" placeholder="priority" class="w-full md:w-full h-10 mb-10" />
             </div>
            
            <button class="flex items-center justify-center hover:opacity-60 duration-300 cursor-pointer w-[40px] h-[40px]  absolute top-5 right-5 rounded-full bg-white" type="button" label="Cancel" severity="secondary" @click="emit('update:visible', false)">
                <i class="pi pi-times text-black" style="font-size: 1rem" ></i>
            </button>
            <button @click="createTask" class="w-full h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] font-semibold tracking-wide hover:opacity-60 cursor-pointer duration-300">{{ props.type[0] === 'edit' ?  "Edit Task" : "Create Task"}}</button>
         </Dialog>


         <Dialog v-if="props.type[0] === 'remove' " v-model:visible="props.visible" modal header="Are you sure ?" :style="{ width: '25rem' }">
            <button class="flex items-center justify-center hover:opacity-60 duration-300 cursor-pointer w-[40px] h-[40px]  absolute top-5 right-5 rounded-full bg-white" type="button" label="Cancel" severity="secondary" @click="emit('update:visible', false)">
                <i class="pi pi-times text-black" style="font-size: 1rem" ></i>
            </button>
            <h1 class="text-gray-400">this item will be permanently deleted !</h1>
            <div class="w-full justify-end flex items-center gap-3 mt-10">
             <button class="w-[100px] h-[40px]  text-white text-[16px] font-semibold tracking-wide hover:opacity-60 cursor-pointer duration-300" @click="emit('update:visible', false)">Cancel</button>
             <button @click="RemoveTask" class="w-[100px] h-[40px] rounded-md bg-slate-200 text-gray-800 text-[16px] font-semibold tracking-wide hover:opacity-60 cursor-pointer duration-300">Delete</button>    
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