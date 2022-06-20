<template>
  <NavBar/>
  <HomeContent />
</template>

<script>
// @ is an alias to /src
import NavBar from "../components/NavBar.vue"
import HomeContent from "../components/HomeContent.vue"
export default {
  name: 'HomeView',
  data(){
    return{

    }
  },
  components: {NavBar,HomeContent}
}
</script>
