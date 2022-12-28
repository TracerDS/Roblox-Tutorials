function get404(){
    return `<h1>
That page doesn't exist :c<br/>
<a href='/Roblox-Tutorials'>Go back</a>
</h1>`
}

function loadWebsite(db, queryParams, filterParams, limitParams){
    if(!queryParams){
        if(filterParams && limitParams){
            let stmt = db.prepare('SELECT * FROM `pages`')
            let ul = document.createElement('ul')
            while(stmt.step()){
                let elem = document.createElement('li')
                let res = stmt.get()
                elem.innerHTML = `<a href='/Roblox-Tutorials/?q=${res[2]}'>${res[3]}</a>`
                ul.append(elem)
            }
            $('main').append(ul)
            $('main').css('text-align','left')
        }else $('main').html(get404())
        return
    }
    let stmt = db.prepare('SELECT * FROM `pages` WHERE `name`=?')
    stmt.bind([queryParams.toLowerCase()])
    stmt.step()

    let obj = stmt.getAsObject()
    if(obj.id === undefined) {
        stmt = db.prepare('SELECT * FROM `aliases` WHERE `name`=?')
        stmt.bind([queryParams.toLowerCase()])
        stmt.step()
        obj = stmt.getAsObject()

        if(obj.id === undefined){
            $('main').html(get404())
            return
        }else {
            stmt = db.prepare('SELECT * FROM `pages` WHERE `name`=?')
            stmt.bind([obj.page])
            stmt.step()

            obj = stmt.getAsObject()
        }
    }

    $(document).prop('title', `${obj.title} - Roblox Docs`)

    let css = cssToJSON(getPageCSS())
    let classType = 'Shared class'

    const type = obj.type.toUpperCase()
    if(type === 'SHARED') {
        css = setShared(css)
        classType = 'Shared class'
    } else if(type == 'SERVER') {
        css = setServer(css)
        classType = 'Server class'
    } else if(type == 'CLIENT') {
        css = setClient(css)
        classType = 'Client class'
    } else throw Error('Unknown type!')

    $(`<style>${JSONtoCSS(css)}</style>`).appendTo($('head'))
    $('main').html(getTemplate(obj.nameDisplay, classType, obj.content))
    $('.main-classtype > h2').html(classType)
}