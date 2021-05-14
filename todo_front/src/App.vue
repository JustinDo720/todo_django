<template>
  <NavBar></NavBar>
  <router-view />
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar,
  },
};
</script>
<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
