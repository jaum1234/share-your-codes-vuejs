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
import Cookies from 'js-cookie';

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

    if (Cookies.get('warning')) {
      this.$swal({
        title: Cookies.get('warning'),
        icon: 'warning'
      })
    }
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

input[type="text"], input[type="email"], input[type="password"]  {
    background: #2D415B;
    border-radius: 5px;
    border-width: 0;
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
}

textarea {
    background: #2D415B;
    border-radius: 5px;
    border-width: 0;
    color: white;
    height: 100px;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    resize: none;
}

input[type="color"] {
	-webkit-appearance: none;
    border-radius: 5px;
    outline: none;
    width: 100%;
    height: 55px;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    background: #051D3B;
	padding: 0.5rem;
    border-radius: 5px;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
    border-radius: 5px;
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
