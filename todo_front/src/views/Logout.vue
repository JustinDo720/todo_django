<template>
  <!-- The template requires child element -->
  <div>

  </div>

</template>

<script>
import {mapActions} from 'vuex'

export default{
  methods:{
    ...mapActions(['userLogout'])
  },
  async created(){
      await this.userLogout()
      await this.$router.push({name:'Login'})
      // this.$store.dispatch('userLogout')
  }
}

</script>