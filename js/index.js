let page = 1

document.addEventListener("DOMContentLoaded", () =>{
    getMonsters()
    createForm()
    let next = document.getElementById('forward')
    next.addEventListener('click', nextMonsters)
})

function getMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(monster => monster.forEach(monster => {
        renderMonsters(monster)
    }))
}

function renderMonsters(monster){
    let container = document.getElementById('monster-container')
    let monsterItem = document.createElement("div")
    container.appendChild(monsterItem)
    let name = document.createElement('h2')
    name.innerText = `${monster.name}`
    let age = document.createElement('h4')
    age.innerText = `${monster.age}`
    let bio = document.createElement('p')
    bio.innerText = `${monster.description}`
    monsterItem.append(name, age, bio)
}

function createForm(){
    let formContainer = document.getElementById('create-monster')
    let monsterForm = document.createElement('form')
    monsterForm.id = 'monform'
    formContainer.appendChild(monsterForm)
    let name = document.createElement('input')
    name.id = 'monname'
    name.placeholder = 'name...'
    let age = document.createElement('input')
    age.id = 'monage'
    age.placeholder = 'age...'
    let bio = document.createElement('input')
    bio.placeholder = 'description...'
    bio.id = 'monbio'
    let create = document.createElement('button')
    create.innerText = 'Create'
    monsterForm.append(name, age, bio, create)
    monsterForm.addEventListener('submit', createMonster)
}

function createMonster(event){
    event.preventDefault()
    let name = document.getElementById('monname').value
    let age = document.getElementById('monage').value
    let bio = document.getElementById('monbio').value
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, age: age, description: bio})
    })
    .then(res => res.json())
    .then(monster =>{
        renderMonsters(monster)
    })
    document.getElementById('monform').reset()
}


function nextMonsters(){
    page++
    let monList = document.getElementById('monster-container')
    monList.innerHTML = ""
    getMonsters() 
}