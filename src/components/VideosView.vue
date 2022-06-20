<template>
    <NavBar />
    <div class="container-fluid px-0">
        <h1 class="my-5">Search for any video</h1>
        <div class="container-fluid  d-flex justify-content-center align-items-center">
            <input type="text" name="search" class="form-control w-50" placeholder="Search Sunrise" v-model="watch"
            @keypress.enter="searchHandler">
            <button class="btn btn-success ms-2" @Click.prevent="searchHandler(pageNo)">Search</button>
        </div>
    </div>
    <!-- <PhotoSection :search="value"/> -->
    <div class="container-fluid mt-3 p-4">
        <span class="rounded-pill bg-secondary mx-2 px-3 py-1 text-white" v-if="value" @Click="modChanger('landscape')">Landscape</span>
        <span class="rounded-pill bg-secondary mx-2 px-3 py-1 text-white" v-if="value" @Click="modChanger('medium')">medium</span>
        <span class="rounded-pill bg-secondary mx-2 px-3 py-1 text-white" v-if="value" @Click="modChanger('original')">original</span>
        <span class="rounded-pill bg-secondary mx-2 px-3 py-1 text-white" v-if="value" @Click="modChanger('large')">large</span>
        <span class="rounded-pill bg-secondary mx-2 px-3 py-1 text-white" v-if="value" @Click="modChanger('large2x')">Extra large</span><br><br>
        <small v-if="value">Select size from given options and then click on any image to get the image of desired size.</small>
        <h2 v-if="value" class="p-4">Your images related to "{{value}}"</h2>
        <div class="d-flex flex-wrap justify-content-around align-items-center px-2 border py-2 rounded" v-if="value">
            <div class="" v-for="items in video" :key="items">
                <!-- <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.small)" v-if="mod=='small'" >
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.medium)" v-if="mod=='medium'" >
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.original)" v-if="mod=='original'" >
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.large)" v-if="mod=='large'" >
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.large2x)" v-if="mod=='large2x'" >
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.landscape)" v-if="mod=='landscape'" > -->
                <!-- style="width:200px;height:150px" -->
                <video :src="videos.link" v-if="key==3" v-for="(videos,key) in items.video_files" :key="videos" ></video>
            </div>
        </div>
        <div class="container-fluid mt-2 bg-dark d-flex justify-content-between p-2" v-if="value">
            <button class="btn btn-success" @Click="pageNo--;searchHandler(pageNo)">&lt; Prev</button>
            <button class="btn btn-success" @Click="pageNo++;searchHandler(pageNo)">Next &gt;</button>
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
            watch: "", value: "", video:[],mod:"small",pageNo:1
        }
    },
    components: {
        NavBar, PhotoSection
    },
    methods: {
        show() {
            console.log(this.search)
        },
        async searchHandler(pageNo) {
            this.value = this.watch;
            // this.watch = "";
            pageNo==0?pageNo=1:pageNo--;
            const response = await fetch(`https://api.pexels.com/videos/search?query=${this.value}&page=1&per_page=2`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: '563492ad6f917000010000012dd717bb05af4ea48618c1f5f403227c',
                        //use the apikey you have generated
                    },
                });
            const data=await response.json();
            this.video=data;
            this.video=this.video.videos
            console.log(this.video)
            return data;
        },
        imageOpener(link){
            window.open(link)
        },
        modChanger(mod){
            this.mod=mod;
        }
    }
}
</script>

<style scoped>
.imgBox {
    height: 200px;
}
span{
    cursor: pointer;
}
</style>