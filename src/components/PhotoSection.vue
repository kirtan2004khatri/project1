<template>
    <div class="container-fluid mt-5 border-top">
        <div class="row gy-4 gx-3" v-if="search">
            <div class="col-sm-6 col-lg-3 col-md-4">
                <div class="card imgBox"
                    style="background:url('https://source.unsplash.com/random/500x200?plants') no-repeat center center/cover">
                </div>
            </div>
        </div>
    </div>
    <h3 v-if="search == ''" class="p-5">Nothing to see here....</h3>
</template>

<script>
export default {
    props: ['search'],
    mounted() {
        if(!this.search){
            fetch(`https://api.pexels.com/v1/search?query=${this.search}&page=1`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization:'563492ad6f917000010000012dd717bb05af4ea48618c1f5f403227c',     //use the apikey you have generated
                },
            }).then(response=>response.json).then(data=>console.log(data));
        }
    },
}
</script>

<style scoped> 
.imgBox {
    height: 200px;
}
</style>
<!-- 563492ad6f917000010000012dd717bb05af4ea48618c1f5f403227c -->