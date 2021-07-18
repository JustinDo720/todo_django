<template>
  <div class="container mt-5">
    <section class="hero is-link">
      <div class="hero-body ">
        <p class="title">
          Welcome to ToDo-List!
        </p>
        <p class="subtitle">
          You could add, edit, or remove Todo items.
        </p>
        <div class="box">
          This website allows everyone to post their todo items and edit them. It's a very simple way to store your
          many tasks and make sure they're fulfilled. Please sign up or login to view your todo work space. Thank you
          for visiting the website :)
        </div>
      </div>
    </section>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="columns mt-5">
          <div class="tile is-parent column is-offset-1 is-three-fifths" v-if="loggedIn">
          <article class="tile is-child notification is-success">
          <div class="content">
            <p class="title">Tall tile</p>
            <p class="subtitle">With even more content</p>
          <div class="content">
            <!-- Content -->

          </div>
          </div>
          </article>
        </div>
        <div class="tile is-parent column"
             :class="{'is-three-fifths': loggedIn,
                      'is-offset-1': loggedIn,
                      'is-full':!loggedIn,
                      'is-offset-3':!loggedIn,}">
          <article class="tile is-child notification is-success">
          <div class="content">
            <p class="title">Your Current Todo-Items</p>
            <p class="subtitle" v-if="loggedIn">
              Please click <a>
                    <router-link :to="{ name: 'ViewTodo' }"
                      >here</router-link
                    >
                </a> to edit and remove your todo items
            </p>
            <p class="subtitle" v-else>
              Please login <a>
                      <router-link :to="{name:'Login'}">here</router-link>
                    </a> to view your todo items.
            </p>

          <div class="content">
          <!-- Content -->
          </div>
          </div>
          </article>
        </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters} from 'vuex'

export default {
  name: "Home",
  computed:{
    ...mapGetters(['loggedIn'])
  },
  data(){
    return{

    }
  },
};
</script>

<style scoped>
</style>
