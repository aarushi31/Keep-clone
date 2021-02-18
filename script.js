const addBtn=document.querySelector('#add');

const updateLSData=()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes=[];
    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })

    localStorage.setItem('notes',JSON.stringify(notes));

}

const addNewNote=(text='')=>{
    const note=document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="operation">
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash-alt"></i>
        </button>
        </div>
        <div class="main ${text ? "":"hidden"}">
            
        </div>
        <textarea class="${text?"hidden":""}"></textarea>
    
    `;

    note.insertAdjacentHTML('afterbegin',htmlData);

    //getting references 

    const editbtn=note.querySelector('.edit');
    const delbtn=note.querySelector('.delete');
    const main=note.querySelector('.main');
    const textArea=note.querySelector('textarea');

    //deleting note
    delbtn.addEventListener('click',()=>{
        note.remove();
        updateLSData();
    })

    //toggle textarea using edit button

    textArea.value=text;
    main.innerHTML=text;

    editbtn.addEventListener('click',()=>{
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change',(event)=>{
        const value=event.target.value;
        main.innerHTML=value;


        updateLSData();
    })
    

    document.body.appendChild(note);
}

//getting data back from localstorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes)
{
    notes.forEach((note)=>addNewNote(note));
}

addBtn.addEventListener('click',()=>addNewNote());