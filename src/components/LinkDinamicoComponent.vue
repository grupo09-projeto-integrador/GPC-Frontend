<template>
    <div class="link-path d-flex align-items-center mt-2">
        <button class="button-usersList" :class="{ active: activeButton === 'list' }"
            @click="navigateTo(routeList, 'list')">
            Listar
        </button>
        <button class="button-usersList" :class="{ active: activeButton === 'register' }"
            @click="navigateTo(routeRegister, 'register')">
            Cadastrar Novo
        </button>
    </div>
</template>
  
<script lang="ts">import { RouteLocationRaw } from 'vue-router';

export default {
    name: "LinkDinamicoComponent",
    props: {
        routeList: {
            type: String,
            required: true
        },
        routeRegister: {
            type: String,
            required: true
        },
        defaultActive: {
            type: String,
            default: "list"
        }
    },
    data() {
        return {
            activeButton: this.defaultActive
        };
    },
    methods: {
        navigateTo(route: RouteLocationRaw, buttonId: string) {
            this.activeButton = buttonId; // Set the active button
            this.$router.push(route);
        }
    }
};
</script>
  
<style scoped>
.button-usersList {
    user-select: none;
    cursor: pointer;
    width: 220px;
    height: 35px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    background-color: #aaa69e;
    color: #ffffff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin-right: 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    outline: none;
}

.button-usersList:hover {
    background-color: #f3c436;
    transform: scale(1.05);
}

.button-usersList:active {
    transform: scale(0.98);
}

.active {
    background-color: #f3c436 !important;
    outline: none;
}
</style>
  