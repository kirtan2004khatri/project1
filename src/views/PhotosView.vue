<template>
    <NavBar />
    <div class="container-fluid px-0">
        <h1 class="my-5">Search Any Photos</h1>
        <div class="container-fluid  d-flex justify-content-center align-items-center">
            <input type="text" name="search" class="form-control w-50" placeholder="Search Flowers" v-model="watch">
            <button class="btn btn-success ms-2" @Click.prevent="searchHandler">Search</button>
        </div>
    </div>
    <!-- <PhotoSection :search="value"/> -->
    <div class="container-fluid mt-5 border-top">
        <div class="row gy-4 gx-3" v-if="value">

            <div class="col-sm-6 col-lg-3 col-md-4 imgBox"
            v-for="items in images" :key="items">
                <!-- <div class="card">
                    {{items.photos.url}}
                </div> -->
            </div>

        </div>
    </div>
    <h3 v-if="value == ''" class="p-5">Nothing to see here....</h3>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import PhotoSection from '../components/PhotoSection.vue'
export default {
    data() {
        return {
            watch:"",value:"",images:[]
        }
    },
    components: {
        NavBar, PhotoSection
    },
    methods: {
        show() {
            console.log(this.search)
        },
        searchHandler(){
            this.value=this.watch;
            this.watch="";
            fetch(`https://api.pexels.com/v1/search?query=${this.value}&page=1`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization:'563492ad6f917000010000012dd717bb05af4ea48618c1f5f403227c',     //use the apikey you have generated
                },
            }).then(response=>response.json()).then(data=>{console.log(data),this.images=data});
            console.log(JSON.stringify(this.images))}
    }
}
</script>

<style scoped>
.imgBox {
    height: 200px;
}
</style>