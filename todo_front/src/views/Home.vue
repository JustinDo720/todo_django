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
          <div class="content quickAdd">
            <p class="title">Quick Add Todo</p>
            <input class="input is-info is-medium is-rounded" type="text" placeholder="Add Your Task Here">
            <div class="buttons is-centered">
              <button class="button is-info is-outlined mt-5 is-rounded">Add Todo</button>
            </div>

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
            <div class="box" v-for="(todo, index) in tasks" :key="index">
              {{ todo.task }}
            </div>
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
import { mapGetters, mapState} from 'vuex'
import store from "../store";

export default {
  name: "Home",
  computed:{
    ...mapGetters(['loggedIn']),
    ...mapState(['tasks', 'user_id', 'accessToken', ])
  },
  data(){
    return{
      showTodosAPI : 'http://127.0.0.1:8000/todos/',
    }
  },
  created(){
    // This task can only be performed if the user is authenticated so
    // We always need to reinitialize the store to obtain our old data
    store.dispatch('reinitializeStore').then(()=>{
      store.dispatch('callAPI',{
        showTodosAPI: this.showTodosAPI,
        user_id: this.user_id,
        accessToken: this.accessToken
      })
    })

  }
};
</script>

<style scoped>
.quickAdd{
  max-height:500px;
}
</style>
