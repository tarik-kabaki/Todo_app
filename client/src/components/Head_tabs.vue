<script setup>
</script>

<template>
   <div class="border-b border-slate-700">
    <div class="w-full h-full flex justify-center gap-10 text-gray-300">
    <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['cursor-pointer p-5 font-semibold flex items-center gap-2 text-[14px]', activeTab === tab.name ? 'text-blue-500 duration-300' : '']"
        @click="selectTab(tab.name)">
        <div :class="['w-[8px] h-[8px] rounded-full ', 
         tab.name === 'tab0' ? 'bg-gray-500 duration-500' :
         tab.name === 'tab1' ? 'bg-orange-500 duration-500' :
         tab.name === 'tab2' ? 'bg-yellow-500 duration-500' :
         tab.name === 'tab3' ? 'bg-green-500 duration-500' :
          '']"></div> 
        {{ tab.label }} 
      </div>  
  </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
      newTask: '',
      isVisible: false, 
      tasks: [],
      activeTab: "tab1", // Default active tab
      tabs: [
      { name: "tab0", label: "All" },
      { name: "tab1", label: "Todo" },
      { name: "tab2", label: "in Progress" },
      { name: "tab3", label: "Done" },
    ],
    };
  },
  methods: {
  selectTab(tabName) {
    this.activeTab = tabName;
  },
  },
};
</script>
