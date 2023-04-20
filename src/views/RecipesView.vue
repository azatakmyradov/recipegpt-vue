<script setup>
import {onMounted, ref, watch} from 'vue';
import Loader from '@/components/Loader.vue';
import axios from 'axios';

let storage = new Set(JSON.parse(localStorage.getItem('products')));
let products = ref(storage || new Set([]));
let recipe_list = ref([]);
let recipe = ref('');

let isLoading = ref(true);

watch(recipe, (newValue) => {
    recipe.value = newValue.replaceAll('\n', '<br>').replaceAll('<br><br>', '<br>').replaceAll('!', '');
})

onMounted(() => {
    getRecipeList();
})

function getRecipeList() {
    isLoading.value = true;

    axios({
        method: 'POST',
        url: '/recipe/list',
        data: {
            products: Array.from(products.value).join(', ')
        }
    }).then(response => {
        isLoading.value = false;
        let message = response.data.message.choices[0].text.split('$');
        message.shift();
        recipe_list.value = message;
    }).catch(() => {
        isLoading.value = false;
    });
}

function getRecipe(e) {
    isLoading.value = true;
    let recipe_name = e.target.innerText;

    axios({
        method: 'POST',
        url: '/recipe/make',
        data: {
            products: Array.from(products.value).join(', '),
            recipe: recipe_name,
        }
    }).then(response => {
        isLoading.value = false;
        recipe.value = response.data.message.choices[0].text;
    }).catch(() => {
        isLoading.value = false;
    });
}
</script>

<template>
    <section v-if="! isLoading">
        <p v-html="recipe" v-if="recipe" class="bg-liver px-6 py-8 text-white"></p>

        <h2 class="text-center my-2 text-lg">What do you want to cook?</h2>

        <ul class="w-full bg-primary text-white divide-y">
            <li v-for="(recipe, key) in recipe_list" :key="key" class="flex justify-between items-center"><a href="#" class="block w-full p-2" @click.prevent="getRecipe">{{ recipe }}</a></li>
        </ul>
    </section>

    <div class="flex items-center justify-center" v-if="isLoading">
        <Loader width="50" height="50" />
    </div>

    <RouterLink
        to="/"
        class="block text-center bg-liver text-white text-xl py-2 px-2 rounded w-full"
    >Home Page</RouterLink>
</template>
