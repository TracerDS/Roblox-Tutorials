function JQCreate(elemType, html=''){
    let elem = document.createElement(elemType)
    elem.innerHTML = html

    return elem
}
function JQCreateList(ordered = false){
    return JQCreate(ordered ? 'oi' : 'ul')
}
function JQCreateListItem(value=''){
    return JQCreate('li',value)
}
function JQCreateFillList(items = 1, ordered = false){
    let list = JQCreateList(ordered)
    let itemsArr = []
    for(let i=0; i<items; i++) itemsArr.push(JQCreateListItem())
    for(let item of itemsArr) list.appendChild(item)
    return list
}