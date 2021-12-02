<template>
  <Nav @projects-search="getSearchQuery" v-show="isAuth()"/>
  <div class="container">
    <div class="main">
      <Sidebar v-show="isAuth()"/>
      <router-view :searchQuery="searchQuery"/>
    </div>
  </div>
</template>

<script>
import Nav from './components/shared/Navbar/Navbar.vue';
import Sidebar from './components/shared/Sidebar/Sidebar.vue';

export default {
  components: {
    Nav,
    Sidebar,
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    isAuth() {
      if (this.$route.name == 'Login') {
        return false;
      } 
      return true;
    },
    getSearchQuery(query) {
      return this.searchQuery = query;
    }
  },
  created() {
    this.isAuth();
  },
}
</script>

<style>

@import url('./assets/reset.css');

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');

*:not(#fwi) {
  box-sizing: border-box;
}

html, body {
  background: #051D3B;
  font-family: 'Inter', sans-serif;
  -webkit-appearance: none;
}

.container--fluid{
  width: 100%;
  margin: 0 auto;
}

.container {
  width: 75%;
  margin: 0 auto;
}

.container--small {
  width: 50%;
  margin: 0 auto;
}

.main {
  display: flex;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

</style>
