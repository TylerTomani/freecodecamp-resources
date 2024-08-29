const backlink = document.getElementById('backlink')
const homelink = document.getElementById('homelink')
const tutoriallink = document.getElementById('tutorialLink')
const regexCmds = document.getElementById('regexCmds')
const linuxCmds = document.getElementById('linuxCmds')
export const nav = document.querySelector('nav')
export const aside = document.querySelector('aside')
export const targetDiv = document.querySelector('#targetDiv')

nav.addEventListener('click', e => {
    
})
nav.addEventListener('keydown', e => {
    let key = e.keyCode
    if(key === 13){
        if(!aside.classList.contains('hide')){
            aside.classList.add('hide')
        } else {
            aside.classList.remove('hide')
        }
    }

})


addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    switch(letter){
        case 'b':
            backlink.focus()
            backlink.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break
        case 'h':
            homelink.focus()
            homelink.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break
        case 'r':
            regexCmds.focus()
            regexCmds.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break
        case 'a':
            aside.focus()
            break
        case 'm':
            targetDiv.focus()
            break
        case 'l':
            linuxCmds.focus()
            break
        case 't':
            tutoriallink.focus()
            break
        case 'n':
            nav.focus()
            break
    }
});
[aside,nav,targetDiv].forEach( el => {
    el.addEventListener('focus', ()=>{scrollTo(0,0)});
})
