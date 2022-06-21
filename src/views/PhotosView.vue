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
    <div class="container-fluid mt-3 p-4">
        <div class="d-flex flex-wrap gap-1 justify-content-center align-items-center">
            <span class="rounded-pill bg-secondary px-3 py-1 text-white" v-if="value"
                @Click="modChanger('landscape')">Landscape</span>
            <span class="rounded-pill bg-secondary px-3 py-1 text-white" v-if="value"
                @Click="modChanger('medium')">medium</span>
            <span class="rounded-pill bg-secondary mx-2 px-3 py-1 text-white" v-if="value"
                @Click="modChanger('original')">original</span>
            <span class="rounded-pill bg-secondary px-3 py-1 text-white" v-if="value"
                @Click="modChanger('large')">large</span>
            <span class="rounded-pill bg-secondary px-3 py-1 text-white" v-if="value"
                @Click="modChanger('large2x')">Extra large</span>
        </div>
        <br><br>
        <small v-if="value">Select size from given options and then click on any image to get the image of desired
            size.</small>
        <h2 v-if="value" class="p-4">Your images related to "{{ value }}"</h2>

        <div class="container d-flex flex-wrap border rounded justify-content-around align-items-around" v-if="value">
            <div class="mx-2 my-5" v-for="items in images" :key="items">
                <!-- <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.small)"
                    v-if="mod == 'small'">
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.medium)"
                    v-if="mod == 'medium'">
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.original)"
                    v-if="mod == 'original'">
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.large)"
                    v-if="mod == 'large'">
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.large2x)"
                    v-if="mod == 'large2x'">
                <img :src="items.src.small" class="img-fluid mx-2 my-2" @Click="imageOpener(items.src.landscape)"
                    v-if="mod == 'landscape'"> -->
                <!-- style="width:200px;height:150px" -->
                <div class="border" :style="{backgroundImage:`url(${items.src.small})`,width:'18rem',height:'15rem',
                backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPosition:'center'}"></div>
            </div>
        </div>

        <div class="container-fluid mt-2 bg-dark d-flex justify-content-between p-2" v-if="value">
            <button class="btn btn-success" @Click="pageNo--; searchHandler(pageNo)">&lt; Prev</button>
            <button class="btn btn-success" @Click="pageNo++; searchHandler(pageNo)">Next &gt;</button>
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
            watch: "", value: "", images: [], mod: "small", pageNo: 1
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
            console.log(data)
            return data;
        },
        imageOpener(link) {
            window.open(link)
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