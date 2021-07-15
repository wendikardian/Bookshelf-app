const uncompletedList = document.getElementById("incompleteBookshelfList");
const completedList = document.getElementById("completeBookshelfList");
const BOOK_ID = "bookID";

function addBook(){
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    let strYear = document.getElementById("inputBookYear").value;
    let year = parseInt(strYear);
    let isCompleted = document.getElementById("inputBookIsComplete").checked; 
    const book =  createBook(title, author, year, isCompleted);
    const bookObject = composeBook(title, author, year, isCompleted);
    book[BOOK_ID] = bookObject.id;
    books.push(bookObject);

    if(isCompleted == true){
        ket.innerText = "Selesai Baca";
        completedList.append(book);
        

    }else{
        ket.innerText = "Belum Selesai Baca";
        uncompletedList.append(book);
    }   
    updateBook();
}

function createBook(title, author, year, iscompleted){
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("title")
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = "Penulis: ";
    const bookAuthorSpan = document.createElement("span");
    bookAuthorSpan.classList.add("author");
    bookAuthorSpan.innerText = (author);
    bookAuthor.append(bookAuthorSpan);

    const bookYear = document.createElement("p");
    bookYear.innerText = "Tahun: " ;
    const bookYearSpan = document.createElement("span");
    bookYearSpan.classList.add("year");
    bookYearSpan.innerText = year;
    bookYear.append(bookYearSpan);

    const artikel = document.createElement("article");
    artikel.classList.add("book_item");
    artikel.append(bookTitle, bookAuthor, bookYear);

    if(iscompleted){
        artikel.append(uncompleteButton(),
        removeButton(),
        editButton());
    }else{
        artikel.append(completeButton(),
        removeButton(),
        editButton());
    }

    return artikel;
}

function createButton(buttonType, eventListener){
    const button = document.createElement("button");
    button.classList.add("icon");
    button.classList.add(buttonType);
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("action");
    buttonDiv.append(button);
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    return buttonDiv;
}

function completeButton(){
    return createButton("check", function(){
        completeBook(event.target.parentElement.parentElement);
    })
}

function removeButton(){
    return createButton("trash", function(){
        removeBook(event.target.parentElement.parentElement);
    })
}

function uncompleteButton(){
    return createButton("uncheck", function(){
        uncompleteBook(event.target.parentElement.parentElement);
    })
}

function editButton(){
    return createButton("edit", function(){
        editBook(event.target.parentElement.parentElement);
    })
}

function completeBook(bookElement){
    const title = bookElement.querySelector(".title").innerText;
    const author = bookElement.querySelector(".author").innerText;
    const year = bookElement.querySelector(".year").innerText;
    newBook = createBook(title, author, year, true);
    const book = findBook(bookElement[BOOK_ID]);
    book.isComplete = true;
    newBook[BOOK_ID] = book.id;
    completedList.append(newBook);
    bookElement.remove();
    updateBook();
}

function uncompleteBook(bookElement){
    const title = bookElement.querySelector(".title").innerText;
    const author = bookElement.querySelector(".author").innerText;
    const year = bookElement.querySelector(".year").innerText;
    newBook = createBook(title, author, year, false);
    const book = findBook(bookElement[BOOK_ID]);
    book.isComplete = false;
    newBook[BOOK_ID] = book.id;
    uncompletedList.append(newBook);
    bookElement.remove();
    updateBook();

}

function removeBook(bookElement){
    if(confirm("are you sure")){
        const indexPosition = findBookIndex(bookElement[BOOK_ID]);
        books.splice(indexPosition, 1);
        bookElement.remove();
        updateBook();
    }

}

function editBook(bookElement){
    const title = bookElement.querySelector(".title").innerText;
    const author = bookElement.querySelector(".author").innerText;
    const year = bookElement.querySelector(".year").innerText;
    const editIcon = document.getElementsByClassName("action");
    while(editIcon.length > 0){
        editIcon[0].parentNode.removeChild(editIcon[0]);
    }

    const section = document.createElement("section");
    section.classList.add("input_section");
    const editBanner = document.createElement("h2");
    editBanner.innerText = "Edit Book"
    section.append(editBanner);
    const form = document.createElement("form");
    form.setAttribute("id", "inputBook" );
    const divInput1 = document.createElement("div");
    divInput1.classList.add("input");
    const divInput2 = document.createElement("div");
    divInput2.classList.add("input");
    const divInput3 = document.createElement("div");
    divInput3.classList.add("input");
    const divInput4 = document.createElement("div")
    divInput4.classList.add("input");
    const labelJudul = document.createElement("label");
    labelJudul.setAttribute("for", "editBookTitle");
    labelJudul.innerText = "Judul";
    const inputJudul = document.createElement("input");
    inputJudul.setAttribute("id", "editBookTitle");
    inputJudul.setAttribute("type", "text");
    inputJudul.setAttribute("value",title);
    inputJudul.required = true;
    divInput1.append(labelJudul, inputJudul);
    const labelAuthor = document.createElement("label");
    labelAuthor.setAttribute("for", "editBookAuthor");
    labelAuthor.innerText = "Author";
    const inputAuthor = document.createElement("input");
    inputAuthor.setAttribute("id", "editBookAuthor");
    inputAuthor.setAttribute("type", "text");
    inputAuthor.setAttribute("value",author);
    inputAuthor.required = true;
    divInput2.append(labelAuthor, inputAuthor);
    const labelYear = document.createElement("label");
    labelYear.setAttribute("for", "editBookYear");
    labelYear.innerText = "Year";
    const inputYear = document.createElement("input");
    inputYear.setAttribute("id", "editBookYear");
    inputYear.setAttribute("type", "number");
    inputYear.setAttribute("value",year);
    inputYear.required = true;
    divInput3.append(labelYear, inputYear);
    const buttonEdit = document.createElement("button");
    buttonEdit.setAttribute("id", "bookSubmit");
    buttonEdit.setAttribute("type","submit");
    const book = findBook(bookElement[BOOK_ID]);
    idBook= book.id;
    buttonEdit.setAttribute("onclick","submitEdit(idBook)");
    event.preventDefault();
    const buttonCancel = document.createElement("button");
    buttonCancel.setAttribute("id", "bookCancel");
    buttonCancel.setAttribute("type", "submit");
    buttonCancel.setAttribute("onclick", "cancelEdit()");
    buttonEdit.innerText = "Edit";
    buttonCancel.innerText = "Cancel";
    form.append(divInput1, divInput2, divInput3, buttonEdit, buttonCancel);
    section.append(form);
    bookElement.append(section);

}


function submitEdit(id){
    event.preventDefault();
    console.log("Edit Books");
    console.log(id);
    const newTitle = document.getElementById("editBookTitle").value;
    const newAuthor = document.getElementById("editBookAuthor").value;
    const newYear = document.getElementById("editBookYear").value;
    const newYearInt = parseInt(newYear);
    console.log(newTitle,newAuthor,newYear);
    var parsed = JSON.parse(JSON.stringify(books))
    console.log(parsed)
    const indexPosition = findBookIndex(id);
    const iscomplete = parsed[indexPosition].isComplete
     books[indexPosition] = {
        id : +new Date(),
        title : newTitle,
        author :newAuthor,
        year : newYear,
        isComplete : iscomplete
    }
    updateBook();
    refreshBook();
    document.location.reload(true);
    
    }

function cancelEdit(){
    document.location.reload(true);
}