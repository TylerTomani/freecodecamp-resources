const tutorials = document.querySelectorAll('.tutorial')
const homelink = document.getElementById('homelink')
const backlink = document.getElementById('backlink')

addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    
    tutorials.forEach(el => {
        const h3 = el.querySelector('a > h3')
        console.log(h3.innerText[1])
        if(letter == el.innerText[1].toLowerCase() || letter == el.innerText[5].toLowerCase()){
            el.focus()
        }
    })
    if(letter == 'h'){
        homelink.focus()
    }
    if(letter == 'b'){
        backlink.focus()
    }
    
})