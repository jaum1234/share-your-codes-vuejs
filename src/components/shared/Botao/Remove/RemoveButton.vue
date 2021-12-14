<template>
    <div class="button__remove" @click="scale" :class="{'scale': pop}">
        <button class="button">
            x
        </button>
        <div class="label">
            {{ label ? label : '' }}
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'label'
    ],
    data() {
        return {
            pop: false
        }
    },
    methods: {
        scale() {
            this.pop = true;
            
            setTimeout(() => {
                this.pop = false;
            }, 500);
        }
    }
}
</script>

<style scoped>

.button__remove {
    align-items: center;
    display: flex;
}

.button {
    align-self: flex-start;
    margin-left: 2rem;
    cursor: pointer;
    background: red;
    border: transparent;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    transition: 0.5s ease-in-out all;
}

.button:hover {
    background: rgb(223, 0, 0);
}

.scale {
    animation: pop 0.5s linear 1;
}

.label {
    color: red;
    cursor: pointer;
    margin-left: 0.5rem;
}

@keyframes pop {
    50% {
        transform: scale(1.5)
    }
}
</style>