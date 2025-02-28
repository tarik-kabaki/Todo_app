<script setup>
import Main_body from './components/Main_body.vue';
import Create_task from './components/Create_task.vue';
import Head_title from './components/Head_title.vue';
import Head_tabs from './components/head_tabs.vue';
</script>

<template>
    <div class="w-full h-screen flex items-center justify-center bg-linear-to-r/srgb from-[#101011] to-[#18181a]">
      <div class="w-[600px] max-w-[800px] h-[800px] max-h-[800px] border-[1px] border-[#363636] bg-[#1a1a1b] rounded-2xl">
        <Head_tabs />
        <Head_title/>  
        <div class="p-10">
        <Create_task />
        <Main_body />
        </div>
     </div>
    </div>
  </template>
  
  <style scoped>
  .cursor-pointer {
  cursor: pointer;
}
  </style>
  


