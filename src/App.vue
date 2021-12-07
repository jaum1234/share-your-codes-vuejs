<template>
  <Nav v-show="isAuthPage()"/>
  <div class="container">
    <div class="main">
      <Sidebar v-show="isAuthPage()"/>
      <router-view />
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
    isAuthPage() {
      if (this.$route.name == 'Login' || this.$route.name == 'Register') {
        return false;
      } 
      return true;
    },
  },
  created() {
    this.isAuthPage();
  },
}
</script>

<style>

@import url('./assets/reset.css');

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');

*:not(#fwi) {
  box-sizing: border-box;
  text-decoration: none;
}

html, body {
  background: #051D3B;
  font-family: 'Inter', sans-serif;
  -webkit-appearance: none;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
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

@media screen and (max-width: 800px) {
  .container, .container--fluid, .container--small {
    width: 90%;
  }
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
