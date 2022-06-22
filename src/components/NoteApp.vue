<template>
    <NavBar />
    <h1 class="text-center mt-4">Make your notes here..</h1>
    <div class="container p-sm-4  d-flex flex-column justify-content-start align-items-start p-5">
        <label for="notes" class="form-label">Start making note's....</label>
        <!-- title input -->
        <input type="text" class="form-control" placeholder="Give your note a title" v-model="noteTitle"
            v-if="titleTrimer(this.noteTitle)">
        <!-- title input errors -->
        <div class="d-flex justify-content-between container p-2">
            <small class="text-danger" v-if="showIptError">Note title can't be empty</small>
            <small class="text-danger" v-if="noteTitle.length >= 50 ? limitTitleError = true :
            limitTitleError = false">You reached max word limit 50</small>
            <small class="text-muted ms-auto">{{ noteTitle.length }}/50</small>
        </div>
        <!-- content input -->
        <textarea class="form-control mt-2" id="notes" cols="30" rows="5" placeholder="Write your notes here....."
            v-model="noteWatcher" v-if="contentTrimer(this.noteWatcher)"></textarea>
        <!-- content input errors -->
        <div class="d-flex justify-content-between container p-2">
            <small class="text-danger" v-if="showContentError">Note content can't be empty</small>
            <small class="text-danger" v-if="noteWatcher.length >= 1000 ? limitTitleError = true :
            limitTitleError = false">You reached max word limit 1000</small>
            <small class="text-muted ms-auto">{{ noteWatcher.length }}/1000</small>
        </div>

        <div class="container-fluid d-flex justify-content-between aling-items-center p-0 mt-4">
            <button class="btn btn-outline-primary btn-sm" @click="addNotes">Add Note</button>
            <div class="d-flex gap-2 align-items-center">
                View:
                <button :class="btnClass1" @click="cardView = true; tableView = false; btnChanger('card')"
                    ref="card">Card</button>
                <button :class="btnClass2" @click="tableView = true; cardView = false; btnChanger('table')"
                    ref="table">Table</button>
            </div>
        </div>
    </div>
    <!-- <h3 class="container d-sm-flex mt-2 px-sm-0 ">Your Notes</h3> -->
    <div class="container d-flex flex-sm-row flex-column justify-content-between mt-4 align-items-center">
        <h3>Your Notes</h3>
        <small>Click on content or title of notes to edit it....</small>
    </div>
    <div class="container p-0 mt-1 border-top">
        <h4 class="p-5" v-if="notes.length==0">Nothing to see here please add notes....</h4>

        <!-- Note container and generator -->
        <div class="container-fluid py-sm-2 px-sm-2 mx-5 my-3 mx-sm-0 my-sm-0 d-sm-flex flex-wrap justify-content-center"
            v-if="!this.notes.length == 0 && cardView">
            <!-- This is the notes code -->
            <div class="border border-success flex-column align-items-start px-0 my-3
            ms-4" style="width:15rem;height:10rem" v-for="items, key in notes">

                <div class="text-bold bg-success text-white container-fluid d-flex p-1" :data-bs-toggle="toggler"
                    data-bs-target="#exampleModal" @click="modalOpener(items,key)">{{ items[0] }}</div>

                    <div class="border overflow-auto" style="font-size:10pt;height:5.2rem" :data-bs-toggle="toggler"
                    data-bs-target="#exampleModal" @click="modalOpener(items,key)">{{items[1]}}</div>
                    <!-- <small class="p-2 text-start overflow-scroll container-fluid" style="font-size:10pt;height:200px"
                    :data-bs-toggle="toggler" data-bs-target="#exampleModal" @click="updtHandler(items, key)">{{items[1]}}</small> -->

                <div class="container-fluid border-top border-success p-0 d-flex justify-content-center">
                    <button class="btn btn-sm btn-secondary d-block w-75 my-1"
                        @click="delBtnHandler(items)">Delete</button>
                </div>

                <!-- This is the modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit the content and title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    @click="notemsg = false,toggler='none'"></button>
                            </div>
                            <div class="modal-body">
                                <label for="title" class="text-start d-block p-2">New Title:</label>
                                <input type="text" id="title" class="form-control"
                                    placeholder="Enter the new title here..." v-model="newTitle">
                                <!-- Error code -->
                                <small class="text-danger text-start d-block" v-if="modalIptError">Note title can't be empty</small>
                                <label for="content" class="text-start d-block p-2">New Content:</label>
                                <textarea id="content" cols="30" rows="3" class="form-control"
                                    placeholder="Enter the new content here..." v-model="newContent"></textarea>
                                <!-- Error code -->
                                <small class="text-danger text-start d-block" v-if="modalContentError">Note content can't be empty</small>
                            </div>
                            <div class="modal-footer">
                                <small v-if="notemsg" class="me-auto text-wrap">Note updated successfully..!</small>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                    @click="notemsg = false;toggler='none'">Cancel</button>
                                <button type="button" class="btn btn-primary"
                                    @click="update(items,key)">Update</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- <p v-for="items in notes">Title{{items[0]}} Content{{items[1]}}</p> -->
            <!-- THis is the note code end -->

        </div>

        <div class="container p-0" v-if="tableView && !this.notes.length == 0">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Note Title</th>
                        <th scope="col">Note Content</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="items in notes">
                        <th scope="row" class="align-middle">{{ items[0] }}</th>
                        <td class="text-start">{{ items[1] }}</td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash-fill" viewBox="0 0 16 16" @click="delBtnHandler(items)"
                                :data-bs-toggle="toggler" data-bs-target="#exampleModal">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                        </td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-clockwise" viewBox="0 0 16 16" :data-bs-toggle="toggler"
                                data-bs-target="#exampleModal">
                                <path fill-rule="evenodd"
                                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                                <path
                                    d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                            </svg>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            dataPresent: true, editable: false, newTitle: '', newContent: '', toggler: "none", notemsg: false, modalIptError: false, modalContentError: false,
            limitTitleError: false, cardView: true, tableView: false, btnClass1: 'btn btn-outline-dark btn-sm active', btnClass2: 'btn btn-outline-dark btn-sm'
            ,arrKey:1
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
        titleTrimer(text) {
            if (text.length > 50) {
                text = text.substr(0, 50);
                console.log(text, this.newTitle)
                this.noteTitle = text;
            }
            return true
        },
        contentTrimer(text) {
            if (text.length > 1000) {
                text = text.substr(0, 1000);
                this.noteWatcher = text;
            }
            return true
        },
        modalOpener(arr,key){
            this.toggler='modal';
            this.newTitle=arr[0];this.newContent=arr[1];
            this.arrKey=key;
        },
        update(arr, key) {
            if (this.newTitle == '') {
                this.modalIptError = true;
            }
            if (this.newContent == '') {
                this.modalContentError = true;
            }
                console.log(arr,key)
            if (this.newTitle!='' && this.newContent!='') {
                this.modalIptError = false; this.modalContentError = false;
                arr[0] = this.newTitle;
                arr[1] = this.newContent;
                this.notes[this.arrKey] = arr;
                localStorage.setItem('notes', JSON.stringify(this.notes));
                this.notemsg = true;
                this.modalIptError = false; this.modalContentError = false
            }
        },
        btnChanger(e) {
            if (e == 'card') {
                this.btnClass1 = 'btn btn-outline-dark active btn-sm'
                this.btnClass2 = 'btn btn-outline-dark btn-sm'
            }
            if (e == 'table') {
                this.btnClass1 = 'btn btn-outline-dark btn-sm'
                this.btnClass2 = 'btn btn-outline-dark active btn-sm'
            }
        },
    },
    mounted() {
        this.dataAdder();
    },
}
</script>

<style scoped>
svg {
    cursor: pointer;
}
</style>