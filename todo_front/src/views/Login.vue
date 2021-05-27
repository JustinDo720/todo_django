<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <form  @submit.prevent="login">
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-success" type="text" placeholder="Username" v-model="username">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-success" type="text" placeholder="Password" v-model="password">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button type='submit' class="button is-success is-light">Log In</button>
              </div>
            </div>
          </div>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      incorrectAuth: false,
    };
  },
  computed:{
    returnToken(){
      return this.$store.state.accessToken
    }
  },
  methods: {
     login () {
        this.$store.dispatch('userLogin', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          console.log(this.returnToken, this.$store.state.accessToken)
        })
        .catch(err => {
          console.log(err)
          this.incorrectAuth = true
        })
        }
      },
};
</script>

<style scoped></style>
