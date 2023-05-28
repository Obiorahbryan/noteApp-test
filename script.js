const
    parentElem = document.querySelector('.targetParent'),
    textArea = document.querySelector('textarea'),
    submit = document.querySelector('.submit'),
    notes = JSON.parse(localStorage.getItem('notes') || '[]');

let 
    ascending = JSON.parse(localStorage.getItem('ascending')) || false,
    descending = JSON.parse(localStorage.getItem('descending')) || true;

    //ascending order
    function ascFunc() {
        if (!ascending) {
            ascending = true;
            descending = false;
            clearArea();
            showItem();
        } else if (ascending && descending) {
            ascending = true;
            descending = false;
        } else {
            ascending = true;
        }
        
        updateLocalStorage();
    }

    //descending order
    function decFunc() {
        if (!descending) {
            descending = true;
            ascending = false;
            clearArea();
            showItem();
        } else if (ascending && descending) {
            ascending = false;
            descending = true;
            clearArea();
            showItem();
        } else {
            descending = true;
        }

        updateLocalStorage();
    }

    //submit button here
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        clearArea();
        createItem();
        showItem();
        clearText();
    })

    //showing Items
    const showItem = () => {
        notes.forEach((note, index) => {
            const liTag = `
            <div class="target">
                <p class="para">${note.item}</p>
                <i class="fa-solid fa-pen" title="edit" onclick="editFunc(${index}, '${note.item}')"></i>
                <i class="fa-solid fa-trash" title="delete" onclick="delFunc(${index})"></i>
            </div>

        `;

        if (ascending) {
            parentElem.insertAdjacentHTML('beforebegin', liTag);
        } else if (descending) {
            parentElem.insertAdjacentHTML('afterend', liTag);
        }
        
        })
    };

    //The Edit Function:
    let updateId;
    let isUpdated = false;
    function editFunc(noteId, item) {
        submit.innerHTML = "Edit";
        textArea.value = item;
        updateId = noteId;
        isUpdated = true;
    }

    //delete Function: we delete from local storage and then update to our UI.
    function delFunc(noteId) {
        //To delete we use the splice because we have the index but if we have the name of the item to be deleted we can use the filter.
        notes.splice(noteId, 1);
        //We store this new note to local else, the deletion won't b global.
        localStorage.setItem('notes', JSON.stringify(notes));
        console.log(notes);
        clearArea();
        showItem();
    }

    //creating items
    const createItem = () => {
        if (!textArea.value.trim()) {
            alert('no input')
        } else {
            const ItemObject = {
            item: textArea.value
        };

        //Here if one condition is met we create a new item to the array object else we just modify existing array object
        if (isUpdated) {
            notes[updateId] = ItemObject; //for updating
            isUpdated = false; //restoring to initial state
            submit.innerHTML = "Submit";
        } else {
            notes.push(ItemObject); //for creating new
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        }

        
    };

    //Clear the previous notes
    const clearArea = () => {
        const list = document.querySelectorAll('.target');
        list.forEach(item => item.remove());
    }

    //clear the text
    const clearText = () => {
        textArea.value = "";
    }

    // Update the local storage
    const updateLocalStorage = () => {
    localStorage.setItem('ascending', JSON.stringify(ascending));
    localStorage.setItem('descending', JSON.stringify(descending));
};

    showItem();