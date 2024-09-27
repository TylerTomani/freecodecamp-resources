export const sideBarBtn = document.querySelector("#sideBarBtn")
export const sideBar = document.querySelector('.side-bar')
const navTitles = document.querySelector('#navTitles')

function toggleSideBar(){
    sideBar.classList.toggle('active')
}


[navTitles,sideBar,sideBarBtn].forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        if(e.target == sideBar){
            toggleSideBar()
        }
        
    })
})
// For some reasonse, navTitles and sideBarBtn not working in [...]
navTitles.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'enter' ){
        toggleSideBar()
    }
})
navTitles.addEventListener('click', e => {
    e.preventDefault()
        toggleSideBar()
})
sideBarBtn.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    if(letter == 'enter' ){
        toggleSideBar()
    }
})

// sideBarBtn.forEach(el =>{

    // el.addEventListener('keydown', e => {
    //     let letter = e.key.toLowerCase() 
    //     if(letter == 'enter' ){
    //         toggleSideBar()
    //     }
    // })
// })