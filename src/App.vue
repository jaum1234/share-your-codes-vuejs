<template>
  <Nav/>
  <div class="container">
    <div class="main">
      <Sidebar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from './components/shared/Navbar/Navbar.vue';
import Sidebar from './components/shared/Sidebar/Sidebar.vue';

export default {
  components: {
    Nav,
    Sidebar
  }
}
</script>

<style>

@import url('./assets/reset.css');

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');

html, body {
  background: #051D3B;
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

.main {
  display: flex;
}

#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

</style>
