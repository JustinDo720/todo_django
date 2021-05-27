<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>

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

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <router-link to="/" class="navbar-item">Home</router-link>
            <a class="navbar-item">
              <router-link to="/">Home</router-link>
            </a>
            <a class="navbar-item">
              <router-link to="/">Home</router-link>
            </a>
            <hr class="navbar-divider" />
            <router-link to="/">Home</router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              <router-link :to="{ name: 'Login' }"> Login </router-link>
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
};
</script>
