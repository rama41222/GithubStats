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
    data(){
      return {
        loginForm: {
        }

      }
    },
    component: {
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

  .alert_danger {
    color: white;
    font-weight: lighter;
    font-size: 0.8em;
    padding: 3px;
    padding-left: 8px;
    padding-right: 8px;
    vertical-align: center;
    background-color: #18a800;
    border-radius: 10px;
  }
</style>
