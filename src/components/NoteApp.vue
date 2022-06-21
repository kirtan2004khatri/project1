<template>
    <NavBar />
    <h1 class="text-center mt-4">Make your notes here..</h1>
    <div class="container p-4  d-flex flex-column justify-content-start align-items-start">
        <label for="notes" class="form-label">Start making note's....</label>
        <input type="text" class="form-control"  placeholder="Give your note a title" v-model="noteTitle">
        <textarea class="form-control mt-2" id="notes" cols="30" rows="5" placeholder="Write your notes here....." v-model="noteWatcher"></textarea>
        <button class="btn btn-outline-primary btn-sm mt-4" @click="addNotes">Add Note</button>
    </div>
    <h3 class="container d-flex mt-2">Your Notes</h3>
    <div class="container p-2 mt-1 border-top">
        <h4 class="p-5">Nothing to see here please add notes....</h4>
        <div class="container-fluid border">

        </div>
    </div>
</template>

<script>
    import NavBar from '../components/NavBar.vue'
    export default{
        data(){
            return{
                notes:[],tempNote:[],
                noteWatcher:'',noteTitle:''
            }
        },
        components:{
            NavBar
        },
        methods:{
            addNotes(){
                this.tempNote.push()
            }
        }
    }
</script>