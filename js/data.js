const STORAGE_KEY = "BOOKSELF_APPS";
let books = [];
let result = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung web storage");
        return false;
    }else{
        return true;
    }
}

function saveBook(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("savebook"));
}

function loadBook(){
    const bookData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(bookData);
    if(data !== null){
        books = data;
    }
    document.dispatchEvent(new Event("loadbook"));
}

function updateBook(){
    if(isStorageExist()){
        saveBook();
    }
}

function composeBook(title, author, year, iscomplete){
    return{
        id : +new Date(),
        title : title,
        author :author,
        year : year,
        isComplete : iscomplete
    };
}

function findBook(bookId){
    for (book of books){
        if(book.id === bookId ){
            return book;
        }
    }
    return null;
}

function findBookIndex(bookId){
    let index = 0;
    for (book of books){
        if(book.id === bookId){
            return index;
        }
        index++;
    }

    return -1;
}

function refreshBook(){
    let listUncomplete = document.getElementById("incompleteBookshelfList");
    let listComplete = document.getElementById("completeBookshelfList");

        for(book of books){
            const newBook = createBook(book.title, book.author, book.year, book.isComplete);
            newBook[BOOK_ID] = book.id;
    
            if(book.isComplete){
                listComplete.append(newBook);
            }else{
                listUncomplete.append(newBook);
            }
        }
}

function refreshSearchBook(result){

    
    let toDelete = document.getElementsByTagName("article");
    while(toDelete[0]){
        toDelete[0].parentNode.removeChild(toDelete[0]);
    }
    let listUncomplete = document.getElementById("incompleteBookshelfList");
    let listComplete = document.getElementById("completeBookshelfList");
    for(book of result){
        const newBook = createBook(book.title, book.author, book.year, book.isComplete);
        newBook[BOOK_ID] = book.id;

        if(book.isComplete){
            listComplete.append(newBook);
           
        }else{
            listUncomplete.append(newBook);
        }
    }
    result.splice(0, result.length);
}

function refreshSearchBookNull(){
    let toDelete = document.getElementsByTagName("article");
    while(toDelete[0]){
        toDelete[0].parentNode.removeChild(toDelete[0]);
    }
    let listUncomplete = document.getElementById("incompleteBookshelfList");
    let listComplete = document.getElementById("completeBookshelfList");

        for(book of books){
            const newBook = createBook(book.title, book.author, book.year, book.isComplete);
            newBook[BOOK_ID] = book.id;
    
            if(book.isComplete){
                listComplete.append(newBook);
            }else{
                listUncomplete.append(newBook);
            }
        }
}

function bookSearch(key){
    
    if(key === ""){
        refreshSearchBookNull();
    }else{
        const bookData = localStorage.getItem(STORAGE_KEY);
        let data = JSON.parse(bookData);
        let searchField = "title";
        let searchVar = key;
        for ( let i = 0 ; i < data.length ; i++){
            if(data[i][searchField].toLowerCase().match(searchVar.toLowerCase())){
                result.push(data[i])
                console.log(result);
            }
        }
        refreshSearchBook(result);
    }
    
}