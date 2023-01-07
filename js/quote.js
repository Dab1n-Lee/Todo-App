const content = document.getElementById('content');
const author = document.getElementById('author');

/*axios.get('https://api.quotable.io/random').then(res => {
    content.innerText = res.data.content;
    author.innerText = res.data.author;
});*/

fetch('https://api.quotable.io/random').then(response => response.json()).then(data => {
    content.innerText = data.content
    author.innerText = data.author
})