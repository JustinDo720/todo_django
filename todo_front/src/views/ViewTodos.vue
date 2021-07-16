<template>
  <div class="container todoSizing mt-5">
    <!-- For posting a todo -->
    <div class="card">
      <div class="card-content">
        <div class="content">
          <input class="input is-medium is-focused is-success" type="text"
                 placeholder="Add Todo Item" v-model="newTask" @keydown.enter="addTask()">
        </div>
      </div>
       <footer>
        <div class="buttons is-centered">
          <button class="button is-success is-medium"
                   @click="addTask()">
            Add Todo
           </button>
        </div>
      </footer>
    </div>
    <div class="card mt-5" v-for="(task, index) in tasks" :key="index">
      <header class="card-header">
          <p class="card-header-title">
          Task {{ index + 1}}
        </p>
      </header>
       <div class="card-content">
          <div class="content">
                {{ task.task }}
            <br>
            <time datetime="2016-1-1">{{ task.date_added }}</time>
          </div>
      </div>

      <footer>
        <div class="buttons is-centered">
           <button class="button is-warning is-light is-medium"
                   @click="updateTask(index,'edit')">
             Edit
           </button>
          <button class="button is-success is-light is-medium"
                   @click="updateTask(index,'completed')">
            Completed
           </button>
          <button class="button is-danger is-light is-medium"
                   @click="updateTask(index, 'delete')">
            Delete
          </button>
        </div>
      </footer>
    </div>
  </div>

  <!-- Modal for editing -->

  <div class="modal" :class="{'is-active': activate_modal}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Todo</p>
        <button class="delete" aria-label="close" @click="activate_modal = !activate_modal"></button>
      </header>
      <section class="modal-card-body">
        <textarea class="textarea is-primary is-medium"
                  rows="10"
                  v-model="task_object['task_info'].task"
                  >

        </textarea>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="updateTask(task_object['task_id'],'post_edit')">
          Save changes
        </button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      tasks: [],
      completed_tasks: [],
      root_api_url: "http://127.0.0.1:8000/all_todos/", // handles posting new tasks
      showTodosAPI : 'http://127.0.0.1:8000/todos/', // handles showing individual's tasks based on their user_id
      updateTodosAPI :'http://127.0.0.1:8000/specific_todo/', // handles our deletes, puts and getting specific tasks
      activate_modal: false,
      // We must set default values or there will be an error about null values
      task_object : {'task_id': null, 'task_info': ''},
      newTask: '',
    };
  },
  computed:{
    ...mapState(['accessToken', 'user_id'])
  },
  methods: {
    callAPI() {
      axios
        .get(this.showTodosAPI + this.user_id, {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
        .then((response) => {
          for (let task_id in response.data) {
            let task = response.data[task_id];
            if (task["task_completed"]) {
              this.completed_tasks.push(task);
            } else {
              this.tasks.push(task);
            }
          }
        }).catch(() =>{
          // If there is an error then that must mean the token is invalid so we need to get another token


      });
    },
    updateTask: function(task_id, status) {
      let targeted_task = this.tasks[task_id]
      let api_url = this.updateTodosAPI + targeted_task.id
      if(status === 'edit'){
          // We are going to give in the index for a recursive effect
          this.task_object = {'task_id':task_id, 'task_info': targeted_task}
          // If we set a false to true we could then see if it's false again which means the user closed the modal
          this.activate_modal = !this.activate_modal
      }else if(status === 'post_edit'){
            console.log(targeted_task)
            // its url, data, config
            axios.put(api_url, targeted_task, {headers: { Authorization: `Bearer ${this.accessToken}`}})
            // After we updated our task we need to close out our modal
            this.activate_modal = !this.activate_modal
      }else if(status === 'completed'){
            targeted_task.task_completed = true
            axios.put(api_url, targeted_task, {headers: { Authorization: `Bearer ${this.accessToken}`}})
            this.completed_tasks.unshift(targeted_task)
            this.tasks.splice(task_id, 1)
      }else if(status === 'delete'){
            axios.delete(api_url)
            this.tasks.splice(task_id, 1)
      }
    },
    async addTask(){
      //We want to post our new task to the api url which accepts the post request
      axios.post(this.root_api_url,
          {task:this.newTask, task_owner:this.user_id},
         {headers:{Authorization: `Bearer ${this.accessToken}`}}).then((response)=>{
           // Once we finish posting we need to refresh our items with the correct id so
           this.tasks.unshift(response.data)
           this.newTask = null
      })


    }
  },
  beforeCreate(){
    store.dispatch('reinitializeStore').then(()=>{
      this.callAPI()
    })
  }
};
</script>

<style scoped>
.todoSizing{
  max-width:30%;
}
</style>
