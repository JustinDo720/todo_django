<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <form @submit.prevent="register">
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
                type="password"
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
                  Register Now
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

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
      register() {
        // We could use mapActions to dispatch UserLogin actions without using the code below
        // We need to however make the function async because we need to await for our dispatch
          this.$store
            .dispatch("userRegister", {
              username: this.username,
              password: this.password,
            })
            .then(() => {
              // If this is successful then we are going to log them in
              this.$store.dispatch("userLogin",{
                username: this.username,
                password: this.password,
              }).then(()=>{
               this.$router.push({name:'Home'})
              })

            })
            .catch((err) => {
              console.log(err);
            });
    },
  },
};
</script>

<style scoped></style>
