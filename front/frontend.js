const mainDiv = document.getElementById('main');
var backButton = document.getElementById('back')
var wishButton = document.getElementById('wishlist')
var ApiUrl = "https://icecrown-citadel.onrender.com"
console.log("API:", ApiUrl)
//load main boss page when on loot page
backButton.addEventListener('click', () =>{
    getBossList();
})
//load all wishlist items
wishButton.addEventListener('click', () => {
    loadWishList();
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
//get all bosses and photos
async function getBossList(){
    fetch(`${ApiUrl}/api/boss`, {method: "GET", mode: 'cors'})
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
    fetch(`${ApiUrl}/api/boss/${bossId}`, {method: 'GET', mode: 'cors'})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            deleteChild();
            data.forEach(element => {
                loadLootList(element);
            })
        })
}
//load loot to page for each object
function loadLootList(item){
    let lootName = item.name;
    let whId = item['wowhead_id']
    let lootId = item['loot_id']
    let wish = item['wishlist']
    let lootDiv = document.createElement('a')
    lootDiv.setAttribute('href','#');
    lootDiv.style.textDecorationLine = "none"
    lootDiv.setAttribute('data-wowhead', `item=${whId}&domain=wotlk`)
    lootDiv.setAttribute('class', 'q4');
    lootDiv.innerText = `[${lootName}]`;
    mainDiv.appendChild(lootDiv);
    //create wishlist checkbox
    var wishList = document.createElement("INPUT");
    wishList.setAttribute("type", "checkbox");
    wishList.setAttribute("id", item['loot_id'])
    wishList.setAttribute("class", "wishbox")
    lootDiv.appendChild(wishList)
    console.log(wish)
        if(wish !== null){
            wishList.checked = true;
        }
        wishList.addEventListener('change', function() {
            if (wishList.checked) {
                console.log("Checkbox is checked..");
                addToWishList(lootId)
            } else {
                console.log("Checkbox is not checked..");
                removeFromWishList(lootId);
            }
        });
}
//set wishlist value to 1
async function addToWishList(wishId){
    fetch(`${ApiUrl}/api/wish/${wishId}`, {method: 'PATCH', mode: 'cors'})
    .then(resp => {
        console.log(resp + ' added to wishlist.')
    }
    )
}
//set wishlist value to NULL
async function removeFromWishList(wishId){
    fetch(`${ApiUrl}/api/removewish/${wishId}`, {method: 'PATCH', mode: 'cors'})
    .then(resp => resp.json())
    .then(data => {
        console.log(data + ' removed from wishlist.')
    }
    )
}
//fetch all from loot where wishlist = 1
function loadWishList(){
    fetch(`${ApiUrl}/api/wish`, {method: 'GET', mode: 'cors'})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            deleteChild();
            data.forEach(element => {
                loadLootList(element); //load wishlist items to page
            })
        })
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
