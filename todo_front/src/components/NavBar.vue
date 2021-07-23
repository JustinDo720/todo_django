<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="showMobileMenu = !showMobileMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      v-bind:class="{ 'is-active': showMobileMenu }"
    >
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link :to="{ name: 'Home' }" class="navbar-item"
            >Home</router-link
          >
        </a>

        <a class="navbar-item">
          <router-link :to="{ name: 'ViewTodo' }" class="navbar-item"
            >View Todos</router-link
          >
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="!isLoggedIn">
            <a class="button is-primary">
              <router-link :to="{ name: 'Register' }"> Sign Up </router-link>
            </a>
            <a class="button is-light">
              <router-link :to="{ name: 'Login' }"> Login </router-link>
            </a>
          </div>
           <div class="buttons" v-else>
            <strong>Welcome {{ userName }}!</strong>
            <a class="button is-light">
              <router-link :to="{ name: 'Logout' }"> Logout </router-link>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>

export default {
  data() {
    return {
      // We are going to use this to make our guy clickable
      showMobileMenu: false,
    };
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.loggedIn
    },
    userName(){
      return this.$store.state.username
    }
  }

};
</script>
