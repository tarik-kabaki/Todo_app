<script setup>
import { defineEmits, ref } from 'vue';


const emit = defineEmits();
const activeTab = ref('tab0');

const tabs = [
  { name: 'tab0', label: 'All' },
  { name: 'tab1', label: 'Todo' },
  { name: 'tab2', label: 'In Progress' },
  { name: 'tab3', label: 'Done' }
];

const selectTab = (tabName,labelTab) => {
  activeTab.value = tabName;
  emit('update:activeTab', labelTab);
};
</script>

<template>
  <div class="border-b border-t border-[#272727] mb-5">
    <div class="w-full h-full flex justify-between text-gray-300">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'cursor-pointer p-5 font-semibold flex items-center gap-2 text-[14px] hover:text-blue-500 duration-300',
          activeTab === tab.name ? 'text-blue-500 duration-300' : ''
        ]"
        @click="selectTab(tab.name,tab.label)"
      >
        <div
          :class="[
            'w-[8px] h-[8px] rounded-full',
            tab.name === 'tab0' ? 'bg-gray-500 duration-500' :
            tab.name === 'tab1' ? 'bg-orange-500 duration-500' :
            tab.name === 'tab2' ? 'bg-yellow-500 duration-500' :
            tab.name === 'tab3' ? 'bg-green-500 duration-500' : ''
          ]"
        ></div>
        {{ tab.label }}
      </div>
    </div>
  </div>
</template>
