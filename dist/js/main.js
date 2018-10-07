//Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    

    /* 
    // Local Storage Test
    localStorage.setItem('test', "Hello Rohit");
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

        // Test if bookmarks in null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    // Clear Form
    document.getElementById('myForm').reset();

    // Re-fetch Bookmarks
    fetchBookmarks();

    // Prevents form from submitting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i=0; i< bookmarks.length;i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    // Re-fetch Bookmarks
    fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks(){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build Output
    bookmarksResults.innerHTML = '';
    for(var i=0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += 
        '<div class="well">'+
        '<h3>'+name+
        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
        '</h3>'+
        '</div>';
    }
}


// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please Use a valid URL');
        return false
    }

    // Checking for duplicate
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0; i< bookmarks.length;i++){
        if(bookmarks[i].url == siteUrl){
            alert('Already Exist');
            return false;
        }
    }    

    return true;
}