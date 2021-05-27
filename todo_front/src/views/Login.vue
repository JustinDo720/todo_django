<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <form @submit.prevent="login">
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Username"
                v-model="username"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-success"
                type="text"
                placeholder="Password"
                v-model="password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button type="submit" class="button is-success is-light">
                  Log In
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      incorrectAuth: false,
    };
  },
  methods: {
    ...mapActions(['userLogin']),
    async login() {
        // We could use mapActions to dispatch UserLogin actions without using the code below
        // We need to however make the function async because we need to await for our dispatch
          // this.$store
          //   .dispatch("userLogin", {
          //     username: this.username,
          //     password: this.password,
          //   })
          //   .then(() => {
          //     console.log(this.returnToken, this.$store.state.accessToken);
          //     this.$router.push({ name: "ViewTodo" });
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     this.incorrectAuth = true;
          //   });
        await this.userLogin({
            username: this.username,
            password: this.password,
          })
        await this.$router.push({name: 'ViewTodo'})
    },
  },
};
</script>

<style scoped></style>
