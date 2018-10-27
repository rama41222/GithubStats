<template>
    <div>
      <h1>callback</h1>
    </div>
</template>

<script>
    export default {
        mounted(){
          try {
            const {data} = await app.$axios.$post(url, null);
            auth.setToken('local', "Bearer "+ data.access_token);
            setTimeout( async () => {
              auth.setStrategy('local');
              setTimeout( async () => {
                await auth.fetchUser();
              })
            });
          } catch (e) {
            console.log(e);
          }
        }
    }
</script>

<style scoped>

</style>
