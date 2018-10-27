<template>
  <section class="container-fluid" align="center">
    <h1>Stat Dashboard</h1>
    <hr/>
    <div class="container-fluid">
      <b-button @click="check" variant="outline-success">Logged in ?</b-button>
      <b-button @click="logout" variant="outline-success">Logout</b-button>
    </div>

    <div class="container-fluid row col-6 offset-3" align="center" style="margin-top: 2vh;margin-bottom: 2vh;">
      <table class="table" align="center">
        <tr>
          <th>Name</th>
          <th>Language</th>
        </tr>
        <tr v-for="stat in stats">
          <td>{{stat.name}}</td>
          <td>{{stat.languages}}</td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
  import { mapGetters} from 'vuex'
  export default {
    middleware: ['auth'],
    computed: {
      ...mapGetters({
        user: 'getUser',
        stats: 'getStats'
      })
    },
    component: {
    },
    mounted(){
      this.fatchData()
    },
    methods: {
      async fatchData(){
        await this.$store.dispatch('fetchLanguages', this.$auth.getToken('github'));
      },
      check(){
        this.$toast.show(this.$auth.loggedIn? this.$auth.loggedIn: "Logged Out!", {icon: "fingerprint"});
      },
      logout() {
        this.$toast.show('Logging out...', {icon: "fingerprint"});
        this.$auth.setToken('');
        this.$auth.setUser(null);
        this.$router.push('/?login=1');
      },
    }
  }
</script>

<style>
  .container {
    margin-top: 1vh;
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
