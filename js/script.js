document.addEventListener("DOMContentLoaded", function(){
    const inputBook = document.getElementById("inputBook");

    inputBook.addEventListener("submit", function(){
        event.preventDefault();
        addBook();
    });


    const titleBook = document.getElementById("searchBook");
    titleBook.addEventListener("submit", function(){
    const search = document.getElementById("searchBookTitle").value;
    event.preventDefault();
    bookSearch(search);
    });

    if(isStorageExist()){
        loadBook();
    }
});

document.addEventListener("savebook", function(){
    console.log("Data berhasil disimpan");
})

document.addEventListener("loadbook",function(){
    console.log("Data Berhasil diload");
    refreshBook();
})


    const ket = document.getElementById("ket");
    const checkbox = document.querySelector("input[type=checkbox]");
    const checkboxValue = document.querySelector("input[type=checkbox]").checked;
    checkbox.addEventListener("change", function(){
    if(this.checked){
        ket.innerText= "Selesai Baca";
    }else{
        ket.innerText = "Belum Selesai Baca";
    }
})



