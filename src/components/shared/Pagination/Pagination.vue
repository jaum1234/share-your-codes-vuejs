<template>
  <div class="pagination">
    <button 
        @click="pageChanged(index + 1)" 
        v-for="(page, index) in pages" 
        :key="page"
        :class="{current: offset === index + 1}">
        {{ page }}
    </button>
  </div>
</template>


<script>
export default {
    props: [
        'total',
        'limit',
        'offset'
    ],
    computed: {
        pages() {
            var pages = Math.ceil(this.total/this.limit);

            if (pages <= 1) {
                return 1;
            }
            return pages;
        }
    },
    methods: {
        pageChanged(offset) {
            
            return this.$emit('page-changed', offset);
        }
    }
};
</script>

<style scoped>
button {
    background: #112D5A;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    border-width: 0;
    font-size: 1.2rem;
    padding: 0.3rem 0.7rem;
    margin: 0 0.2rem;
    transition: background 0.5s ease-in-out;
}

.pagination {
    margin-bottom: 2rem;
}

.current {
    background: #5081FB;
}
</style>