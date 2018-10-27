<template>
    <div>
    </div>
</template>

<script>
    export default {
       mounted(){
         this.fetchUser()
      },
      methods: {
        async fetchUser(){ try {
          const accessToken = this.$route.query.access_token  || null;
          if(accessToken) {
            this.$auth.setToken('github', accessToken);
            setTimeout( async () => {
              // this.$auth.setStrategy('github');
              setTimeout( async () => {
                await this.$store.dispatch('fetchUser', accessToken);

              });
            })
          } else {
            this.$router.push('/')
          }
        } catch (e) {
          console.log(e);
          this.$router.push('/')
        }}
      }
    }
</script>

<style scoped>

</style>
