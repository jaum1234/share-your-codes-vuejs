<template>
    <div class="sidebar">
        <h2 class="sidebar__titulo">MENU</h2>
        <ul v-for="item in items" :key="item.id" class="sidebar__lista">
            <router-link :to="item.url">
                <li class="sidebar__item">
                    <div class="sidebar__icon" >
                        <font-awesome-icon id="fwi" :icon="['fas', item.icon]" class="icon" :class="{active: isActive(item.url)}"/>
                    </div>
                    <div class="sidebar__label">{{ item.label }}</div>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {id: 1, icon: 'code', label: 'Editor de Código', url: '/editordecodigo', active: false},
                {id: 2, icon: 'users', label: 'Comunidade', url: '/comunidade', active: false}
            ]
        }
    },
    methods: {
        isActive(menuItemurl) {
            if (menuItemurl === this.$route.path) {
                return true;
            } 
        }
    },
    mounted() {
        this.isActive();
    }
}
</script>

<style scoped>
.sidebar {
    font-weight: lighter;
    text-align: start;
    width: calc(100% - 80%);
}

@media screen and (max-width: 1280px) {
    .sidebar {
        display: none;
    }
}

.sidebar__titulo {
    font-weight: lighter;
    letter-spacing: 0.35rem;
    margin-bottom: 1rem;
}

.sidebar__item {
    align-items: center;
    color: white;
    display: flex;
    margin-bottom: 1rem;
}

.sidebar__icon {
    margin-right: 0.8rem;
}

.icon {
    background: #112D5A;
    border-radius: 15px;
    padding: 0.8rem;
    transition: background 0.5s ease-in-out;
}

.active {
    background: #5081FB;
}
</style>