function loadWebsite(db, query){
    const stmt = db.prepare('SELECT * FROM `pages` WHERE `name`=?')
    stmt.bind([query.toLowerCase()])
    stmt.step()

    const obj = stmt.getAsObject()

    $(document).prop('title', `${obj.title} - Roblox Docs`)

    let css = cssToJSON(getPageCSS())
    let classType = 'Shared class'

    const type = obj.type.toUpperCase()
    if(type === 'SHARED') {
        css = setShared(css)
        classType = 'Shared class'
    }
    else if(type == 'SERVER') {
        css = setServer(css)
        classType = 'Server class'
    }
    else if(type == 'CLIENT') {
        css = setClient(css)
        classType = 'Client class'
    }
    else throw Error('Unknown type!')

    $(`<style>${JSONtoCSS(css)}</style>`).appendTo($('head'))
    $('main').html(obj.content)
    $('.main-classtype > h2').html(classType)
}