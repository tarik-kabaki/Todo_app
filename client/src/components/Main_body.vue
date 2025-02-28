<script setup>
import Popover from 'primevue/popover';
import Button from 'primevue/button';
import { ref } from 'vue';
import OpenModel from './model/openModel.vue';

const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

const visible = ref(false);
const type_ = ref(null);
console.log(type_)
</script>

<template>
    <section class="w-full h-[400px] overflow-y-auto flex flex-col gap-5">
        <OpenModel :visible="visible" :type="[type_]" @update:visible="visible = $event" />
        <div class="w-full h-auto max-h-[400px] bg-[#20202091] border-[1px] border-[#414141b0] p-5 rounded-xl relative hover:opacity-70 duration-300 cursor-pointer"> 
            <h1 class="absolute bottom-3 right-3 font-semibold text-xs flex items-center gap-1 text-red-500">
                <i class="pi pi-sort-amount-up" style="font-size: 1rem"></i>
                High
            </h1>
            <div class="flex gap-4 mb-5 justify-between items-center w-full mt-3">
                <div class="max-w-[80%] overflow-hidden flex gap-5"> 
                    <div>
                        <h1 class="text-xl text-gray-300 font-semibold mb-1">testing title</h1>
                        <h1 class="text-orange-400 font-semibold text-[14px] flex items-center mb-1 gap-[6px]">
                            <i class="pi pi-spinner mt-[2px] text-[24px]" style="font-size: 14px"></i>
                            <div>Todo</div>
                        </h1>
                        <p class="text-[15px] text-gray-500">testing desc</p>
                    </div>
                </div>

                <div>
                    <div class="card flex justify-center">
                        <Button type="button" @click="toggle" icon="pi pi-ellipsis-h" class="w-14 shadow-sm" size="small" rounded severity="secondary" />
                        <Popover ref="op">
                            <div class="flex flex-col gap-2 w-full text-[15px]">
                                <button @click="visible = true ; type_ = 'edit' "class="cursor-pointer flex justify-start items-center gap-2 text-gray-300 hover:text-blue-400 duration-500">
                                    <i class="pi pi-pen-to-square" style="font-size: 1rem"></i>
                                    <h1>Edit</h1>
                                </button>
                                <button @click="visible = true ; type_ = 'remove' " class="cursor-pointer flex justify-start items-center gap-2 text-gray-300 hover:text-red-400 duration-500">
                                    <i class="pi pi-times" style="font-size: 1rem"></i>
                                    <h1>Remove</h1>
                                </button>
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
