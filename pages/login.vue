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

      <b-modal ref="myModalRef" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
          <h3>Please Login Again</h3>
          <a href="http://localhost:3001/auth/github" class="btn btn-outline-success">Github</a>
        </div>
        <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
      </b-modal>
    </section>
</template>

<script>
  export default {
    data(){
      return {
        loginForm: {
          email:'',
          password:''
        }

      }
    },
    component: {
    },
    watch: {
      $route() {
        this.showLoginModal();
      }
    },
    methods: {
      showLoginModal(){
        if (typeof this.$route.query.login !== 'undefined' && this.$route.query.login === "1") {
          this.$toast.error('Please Login ', {icon: "fingerprint"});
          this.$refs.myModalRef.show();
          this.$router.push('/')
        }
      },
      hideModal () {
        this.$refs.myModalRef.hide()
      },
      async github(){
        await this.$.loginWith('github').catch(e => {
          this.$toast.show('Error', {icon: "fingerprint"});
        })
      },
      check(){
        this.$toast.show(this.$auth.loggedIn? this.$auth.loggedIn: "Logged Out!", {icon: "fingerprint"});
      },
      logout() {
        this.$toast.show('Logging out...', {icon: "fingerprint"});
        this.$auth.logout()
      },
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
