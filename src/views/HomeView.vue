<script setup>
    import {ref} from 'vue';

    let storage = new Set(JSON.parse(localStorage.getItem('products')));
    let products = ref(storage || new Set([]));
    let product_name = ref('');

    function save() {
        localStorage.setItem('products', JSON.stringify(Array.from(products.value)));
    }

    function addProduct() {
        if (product_name.value === '') return;

        products.value.add(product_name.value);
        save();
        product_name.value = '';
    }

    function removeProduct(product) {
        products.value.delete(product);
        save();
    }
</script>

<template>
    <div class="space-y-2">
        <ul class="w-full bg-primary text-white divide-y" v-if="products.size">
            <li class="p-2 flex justify-between items-center" v-for="(product, key) in products" :key="key">
                {{ key + 1 + '. ' + product.toUpperCase() }}
                <a href="#" @click.prevent="removeProduct(product)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="white" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                </a>
            </li>
        </ul>

        <form action="" class="w-full flex space-x-2" @submit.prevent="addProduct">
            <input type="text" placeholder="Enter product name" class="p-2 flex-1 rounded" v-model="product_name">
            <button type="submit" class="bg-beaver text-white text-xl p-2 rounded">Add</button>
        </form>
    </div>

    <RouterLink
        to="/recipes"
        class="block text-center bg-liver text-white text-xl py-2 px-2 rounded w-full"
    >Make Recipe</RouterLink>
</template>
