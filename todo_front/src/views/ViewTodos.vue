<template>
  <div class="container todoSizing mt-5">
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

      <footer >
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
import axios from 'axios'

export default{
  data() {
    return {
      tasks : [],
      completed_tasks : [],
      showTodosAPI : 'http://127.0.0.1:8000/todos/',
      updateTodosAPI :'http://127.0.0.1:8000/specific_todo/',
      activate_modal: false,
      // We must set default values or there will be an error about null values
      task_object : {'task_id': null, 'task_info': ''},
    }
  },
  methods:{
    callAPI: function(){
        axios.get(this.showTodosAPI).then(response=>{
          for(let task_id in response.data){
            let task = response.data[task_id]
            if(task['task_completed']){
              this.completed_tasks.push(task)
            }else{
              this.tasks.push(task)
            }
          }

      })
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
            axios.put(api_url, targeted_task)
            // After we updated our task we need to close out our modal
            this.activate_modal = !this.activate_modal
      }else if(status === 'completed'){
            targeted_task.task_completed = true
            axios.put(api_url, targeted_task)
            this.completed_tasks.unshift(targeted_task)
            this.tasks.splice(task_id, 1)
      }else if(status === 'delete'){
            axios.delete(api_url)
            this.tasks.splice(task_id, 1)
      }
    }
  },
  created(){
    this.callAPI()
  }
}
</script>

<style>
.todoSizing{
  max-width:30%;

}

</style>