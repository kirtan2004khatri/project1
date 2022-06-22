<template>
    <NavBar />
    <div class="container-fluid px-0">
        <h1 class="my-5">Search Any Photos</h1>
        <div class="container-fluid  d-flex justify-content-center align-items-center">
            <input type="text" name="search" class="form-control w-50" placeholder="Search Flowers" v-model="watch"
                @keypress.enter="searchHandler">
            <button class="btn btn-success ms-2" @Click.prevent="searchHandler(pageNo)">Search</button>
        </div>
    </div>
    <!-- <PhotoSection :search="value"/> -->
    <div class="container-fluid mt-3 p-3">
        <small v-if="value">Select size from given options and then click on any image to get the image of desired
            size.</small>
        <h2 v-if="value" class="p-4">Your images related to "{{ value }}"</h2>

        <div class="container d-flex flex-wrap border border-0 rounded justify-content-center align-items-center"
            v-if="value">
            <div class="mx-2 my-2" v-for="items in images" :key="items">
                <div class="border" :style="{
                    backgroundImage: `url(${items.src.medium})`, width: '18rem', height: '15rem',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                }"
                    @click="imageOpener(items.src)" data-bs-toggle="modal" data-bs-target="#exampleModal"></div>
            </div>
        </div>

        <div class="container-fluid mt-2 bg-dark d-flex justify-content-between p-2" v-if="value">
            <button class="btn btn-success" @Click="pageNo--; searchHandler(pageNo)">&lt; Prev</button>
            <button class="btn btn-success" @Click="pageNo++; searchHandler(pageNo)">Next &gt;</button>
        </div>
    </div>
    <h3 v-if="value == ''" class="p-5">Nothing to see here....</h3>
    <!-- Image size selector -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Select size of image</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex flex-column gap-1 justify-content-center align-items-center modal-body">
                        <button class="btn btn-secondary d-block w-50" @click="imageViewer('small')">Small</button>
                        <button class="btn btn-secondary d-block w-50" @click="imageViewer('original')">original</button>
                        <button class="btn btn-secondary d-block w-50" @click="imageViewer('large')">large</button>
                        <button class="btn btn-secondary d-block w-50" @click="imageViewer('large2x')">Extra large</button>
                        <button class="btn btn-secondary d-block w-50" @click="imageViewer('landscape')">Landscape</button>
                </div>
                <div class="modal-footer">
                    <small class="mx-auto">Click on any button to see and download image of desired size...</small>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import PhotoSection from '../components/PhotoSection.vue'
export default {
    data() {
        return {
            watch: "", value: "", images: [], mod: "small", pageNo: 1,onClickArray:[]
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
            const response = await fetch(`https://api.pexels.com/v1/search?query=${this.value}&page=${pageNo}&per_page=30`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: '563492ad6f917000010000012dd717bb05af4ea48618c1f5f403227c',
                        //use the apikey you have generated
                    },
                });
            const data = await response.json();
            this.images = data;
            this.images = this.images.photos
            // console.log(data)
            return data;
        },
        imageOpener(link) {
            this.onClickArray=link;
            // console.log(this.onClickArray);
        },
        imageViewer(size){
            if(size=='small')window.open(this.onClickArray.small,'_blank')
            if(size=='original')window.open(this.onClickArray.original,'_blank')
            if(size=='large')window.open(this.onClickArray.large,'_blank')
            if(size=='large2x')window.open(this.onClickArray.large2x,'_blank')
            if(size=='landscape')window.open(this.onClickArray.landscape,'_blank')
        },
        modChanger(mod) {
            this.mod = mod;
        }
    }
}
</script>

<style scoped>
.imgBox {
    height: 200px;
}

span {
    cursor: pointer;
}
</style>