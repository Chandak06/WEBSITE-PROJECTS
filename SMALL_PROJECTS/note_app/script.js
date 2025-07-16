const btnEl=document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((note)=>{
    const noteEl=createNode(note.id,note.content);
    appEl.insertBefore(noteEl,btnEl);
})
function createNode(id,content){
    const element =document.createElement("textarea");
    element.classList.add("note");
    element.placeholder="Empty Note";
    element.value=content;

    element.addEventListener("dblclick",()=>{
        const warning=confirm("Do you want to delete this note?");
        if(warning){
            deleteNode(id,element);
        }
    })

    element.addEventListener("input",()=>{
        updateNote(id,element.value);
    })
    return element;
}

function deleteNode(id,element){
    const notes =getNotes().filter((note)=>note.id!=note);
    saveNotes(notes);
        appEl.removeChild
        (element);
}

function updateNote(id,content){
    const notes=getNotes();
    const target=notes.filter((note)=>note.id==id)[0];
    target.content=content;
    saveNotes(notes);
}

function saveNotes(notes){
    localStorage.setItem("note-app",JSON.stringify(notes))
}

function getNotes(){
   return JSON.parse(localStorage.getItem("note-app")|| "[]");
}
function addNote(){
    const notes=getNotes();
    const noteObj={
        id:Math.floor(Math.random() * 10000),
        content: "",
    };
    const noteEl=createNode(noteObj.id,noteObj.content);
    appEl.insertBefore(noteEl,btnEl);
    notes.push(noteObj);
    saveNotes(notes);
}

btnEl.addEventListener("click",addNote);