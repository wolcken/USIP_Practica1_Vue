<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <span>|</span>
    <router-link to="/basic" class="nav-link">Basic</router-link>
    <span>|</span>
    <router-link to="/agenda" class="nav-link">Agenda</router-link>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.navbar .nav-link {
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.navbar .nav-link:hover {
  background-color: #555;
}

.navbar .nav-link.router-link-active {
  background-color: #fff;
  color: #333;
}

.navbar span {
  color: #fff;
}
</style>
