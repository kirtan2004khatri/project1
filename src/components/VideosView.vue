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
    <!-- <small class="d-sm-none d-block">I'm only visible in mobile devices</small> -->
    <!-- <PhotoSection :search="value"/> -->
    <div class="container-fluid mt-3 p-4">

        <small v-if="value">Click on the menu option of video to download it.</small>


        <h2 v-if="value" class="p-4">Your videos related to "{{ value }}"</h2>

        <div class="container d-flex flex-wrap justify-content-around border border-0 rounded container-fluid " v-if="value">

            <div class="my-2" v-for="items in video" :key="items">

                <div v-for="links, key in items.video_files" class="mx-3 my-3">
                    <!-- <video  :height="links.height" :width="links.width"
                        controls :src="links.link" v-if="links.height==360"></video> -->
                    <iframe v-if="key == 0" :src="links.link" frameborder="1" :style="{width:'20rem',height:'15rem'}"></iframe>
                </div>

            </div>

        </div>

        <div class="container mt-2 bg-dark d-flex justify-content-between p-2" v-if="value">

            <button class="btn btn-success" @Click="pageNo--; searchHandler(pageNo)">&lt; Prev</button>

            <button class="btn btn-success" @Click="pageNo++; searchHandler(pageNo)">Next &gt;</button>

           
        </div>

         <!-- <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center bg-dark p-2 ">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li class="page-item"><span class="page-link" @click="searchHandler(1)">1</span></li>
                    <li class="page-item"><span class="page-link" @click="searchHandler(2)">2</span></li>
                    <li class="page-item"><span class="page-link" @click="searchHandler(3)">3</span></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav> -->


    </div>

    <h3 v-if="value == ''" class="p-5">Nothing to see here....</h3>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import PhotoSection from '../components/PhotoSection.vue'
export default {
    data() {
        return {
            watch: "", value: "", video: [], pageNo: 1
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
            pageNo == 0 ? pageNo = 1 : pageNo--;
            const response = await fetch(`https://api.pexels.com/videos/search?query=${this.value}&page=${pageNo}&per_page=27`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: '563492ad6f917000010000012dd717bb05af4ea48618c1f5f403227c',
                        //use the apikey you have generated
                    },
                });
            const data = await response.json();
            this.video = data;
            this.video = this.video.videos
            return data;
        },
        imageOpener(link) {
            window.open(link)
        },
        modChanger(mod) {
            this.mod = mod;
        },
    }
}
</script>
