const form = document.getElementById('github-form')
const ul = document.querySelector('ul')
function searchForUsers(name) {
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(res => res.json())
    .then(data => data.items.forEach(element => {
        
        const p = document.createElement('p')
        p.innerText = element.login
        document.body.append(p)
        const img = document.createElement('img')
        img.src = element.avatar_url
        document.body.append(img)
        const a = document.createElement('a')
        a.href = element.html_url
        a.innerText = 'profile'
        document.body.append(a)
        p.addEventListener('click', () =>
        fetch(`https://api.github.com/users/${p.innerText}/repos`)
            .then(res => res.json())
            .then(data => data.forEach(element => {
                const li = document.createElement('li')
                li.innerText = element.archive_url
                ul.appendChild(li)
            })) )
    }))
    
}

form.addEventListener('submit',(event) => {
event.preventDefault()
searchForUsers(event.target.children[0].value)
})