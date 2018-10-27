<template>
  <section class="container">
    <div>
      <b-form data-vv-scope="loginFrm">
        <b-button-group size="sm">
          <a href="http://localhost:3001/auth/github" class="btn btn-outline-success">Github</a>
          <b-button @click="check" variant="outline-success">Check</b-button>
        </b-button-group>
      </b-form>
    </div>
  </section>
</template>

<script>
  export default {
    mounted(){
      if(this.$auth.loggedIn) {
        this.$router.push('/dashboard');
      }
    },
    methods: {
      check(){
        this.$toast.show(this.$auth.loggedIn? this.$auth.loggedIn : "Logged Out!", {icon: "fingerprint"});
      }
    }
  }
</script>

<style scoped>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

</style>
