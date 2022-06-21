<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <!-- <a class="navbar-brand fs-3" href="#">{{title}}</a> -->
            <router-link class="navbar-brand fs-3" to="/">{{title}}</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/photos">Photos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/videos" class=nav-link>Videos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/weather" class="nav-link">Weather</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/notes" class="nav-link">Notes</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <router-view />
</template>

<script>
    export default{
        data(){
            return{
                title:"Volnite"
            }
        }
    }
</script>