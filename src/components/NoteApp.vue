<template>
    <NavBar />
    <h1 class="text-center mt-4">Make your notes here..</h1>
    <div class="container p-sm-4  d-flex flex-column justify-content-start align-items-start p-5">
        <label for="notes" class="form-label">Start making note's....</label>
        <input type="text" class="form-control" placeholder="Give your note a title" v-model="noteTitle">
        <small class="text-danger" v-if="showIptError">Note title can't be empty</small>
        <textarea class="form-control mt-2" id="notes" cols="30" rows="5" placeholder="Write your notes here....."
            v-model="noteWatcher"></textarea>
        <small class="text-danger" v-if="showContentError">Note content can't be empty</small>

        <button class="btn btn-outline-primary btn-sm mt-4" @click="addNotes">Add Note</button>
    </div>
    <!-- <h3 class="container d-sm-flex mt-2 px-sm-0 ">Your Notes</h3> -->
    <div class="container d-flex justify-content-between mt-4 align-items-center">
        <h3>Your Notes</h3>
        <small>Click on content or title of notes to edit it....</small>
    </div>
    <div class="container-fluid px-sm-3 py-sm-2 px-5 py-3 mt-1 border-top">
        <h4 class="p-5" v-if="dataPresent">Nothing to see here please add notes....</h4>
        <div class="container-fluid p-0 d-flex flex-wrap justify-content-around
        w-75" v-if="!this.notes.length == 0">

            <!-- This is the notes code -->
            <div class="border border-success d-flex flex-column align-items-start px-0 m-sm-2 m-3"
                style="width:18rem;height:14rem" v-for="items, key in notes">
                <div class="text-bold bg-success text-white container-fluid d-flex p-1" :data-bs-toggle="toggler"
                    data-bs-target="#exampleModal" @click="updtHandler(items,key)">{{ items[0] }}</div>

                <small class="p-2 text-start overflow-scroll container-fluid" style="font-size:10pt;height:inherit"
                    data-bs-toggle="modal" data-bs-target="#exampleModal">{{ items[1] }}</small>
                <div>
                </div>

                <div class="container-fluid border-top border-success p-0 d-flex justify-content-center">
                    <button class="btn btn-sm btn-secondary d-block w-75 my-1"
                        @click="delBtnHandler(items)">Delete</button>
                </div>

            </div>
            <!-- <p v-for="items in notes">Title{{items[0]}} Content{{items[1]}}</p> -->
            <!-- THis is the note code end -->

        </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Enter the new title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Enter the new title here..."
                        @blur="" v-model="newTitle">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Update tab -->
</template>
<!-- UPDATE REMAINING -->
<script>
import NavBar from '../components/NavBar.vue'
export default {
    data() {
        return {
            notes: [], tempNote: [],
            noteWatcher: '', noteTitle: '', showIptError: false, showContentError: false,
            dataPresent: true, editable: false, newTitle: '', newContent: '',toggler:"none"
        }
    },
    components: {
        NavBar
    },
    methods: {
        addNotes() {
            console.log(this.tempNote)
            if (this.noteWatcher == '' && this.noteTitle == '') {
                this.showIptError = true; this.showContentError = true
            }
            else if (this.noteWatcher == '') {
                this.showContentError = true
            }
            else if (this.noteTitle == '') {
                this.showIptError = true
            }
            else {
                this.showIptError = false; this.showContentError = false
                this.tempNote.push(this.noteTitle); this.tempNote.push(this.noteWatcher);
                this.notes.push(this.tempNote); this.tempNote = [];
                localStorage.setItem('notes', JSON.stringify(this.notes));
                this.noteTitle = ''; this.noteWatcher = ''
                this.dataAdder();
            }
        },
        delBtnHandler(arr) {
            // this.notes=this.notes.filter(element=>{element!=arr,console.log(element)});
            // document.location.reload();
            console.log(arr);
            this.notes = this.notes.filter(element => element != arr);
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        dataAdder() {
            if (localStorage.getItem('notes') == null) {
                this.notes = [];
                localStorage.setItem('notes', JSON.stringify(this.notes));
            }
            else if (JSON.parse(localStorage.getItem('notes')).length == 0) {
                this.dataPresent = true
            }
            else {
                this.notes = JSON.parse(localStorage.getItem('notes'));
                this.dataPresent = false;
            }
        },
        updtHandler(arr,original_key) {
            this.toggler='modal'
            console.log(arr,this.notes[original_key]);
        },
        updater(value){

        }
    },
    mounted() {
        this.dataAdder();
    },
}
</script>