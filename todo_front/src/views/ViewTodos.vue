<template>
  <div class="container">
    <div class="box mt-5" v-for="(todo, index) in tasks" :key="index">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Task {{ index + 1 }}</strong> <small>{{ todo.date_added }}</small>
              <br>
              {{ todo.task }}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" aria-label="reply">
                <span class="icon is-small">
                  <i class="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="retweet">
                <span class="icon is-small">
                  <i class="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a class="level-item" aria-label="like">
                <span class="icon is-small">
                  <i class="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
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
      api_url : 'http://127.0.0.1:8000/show_todos/'
    }
  },
  methods:{
    callAPI: function(){
        axios.get(this.api_url).then(response=>{
          for(let task_id in response.data){
            let task = response.data[task_id]
            if(task['task_completed']){
              this.completed_tasks.push(task)
            }else{
              this.tasks.push(task)
            }
          }
          console.log(this.completed_tasks)
          console.log(this.tasks)

      })
    },
  },
  created(){
    this.callAPI()
  }
}
</script>

<style>
</style>