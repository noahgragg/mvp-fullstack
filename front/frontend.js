const mainDiv = document.getElementById('main');
const backButton = document.getElementById('back')
//load main boss page when on loot page
backButton.addEventListener('click', () =>{
    getBossList();
})
//load all bosses to page
function loadBossList(bossObject){
    let bossName = bossObject.name;
    let bossPhoto = bossObject.photo; //add key from fetch for name
    let bossDiv = document.createElement('div');
    bossDiv.className = 'boss';
    bossDiv.id = bossObject['boss_id'];
    mainDiv.appendChild(bossDiv);
    console.log(bossPhoto);
    bossDiv.innerText = bossName
    bossDiv.style.backgroundImage = `url('${bossPhoto}')`
    bossDiv.style.backgroundSize = 'cover';
    console.log(bossName + ' appended')
    bossDiv.addEventListener('click', () => { //button for each boss
        getLootList(bossObject['boss_id']);
    })
}
//get all bossed
async function getBossList(){
    fetch(`http://127.0.0.1:8000/api/boss`, {method: "GET", mode: 'cors'})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            console.log('getBosses working');
            deleteChild();
        data.forEach(element => {
            loadBossList(element) //call load function
        })
      })
}
//fetch loot for boss clicked on
async function getLootList(bossId){
    fetch(`http://127.0.0.1:8000/api/${bossId}`, {method: 'GET', mode: 'cors'})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            deleteChild();
            data.forEach(element => {
                loadLootList(element);
            })
        })
}
//load loot to page
function loadLootList(item){
    let lootName = item.name;
    let lootId = item['wowhead_id']
    let lootDiv = document.createElement('a')
    lootDiv.setAttribute('href','#');
    lootDiv.style.textDecorationLine = "none"
    lootDiv.setAttribute('data-wowhead', `item=${lootId}&domain=wotlk`)
    lootDiv.setAttribute('class', 'q4');
    lootDiv.innerText = `[${lootName}]`;
    mainDiv.appendChild(lootDiv);
}
async function addToWishList(){

}
async function removeFromWishList(){

}
function loadWishList(){

}
//clear divs from main
function deleteChild() {
    var e = document.getElementById("main");
    
    //e.firstElementChild can be used.
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}
//call on page load
getBossList();
