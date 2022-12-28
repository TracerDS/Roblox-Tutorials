function get404(){
    return `<h1>
That page doesn't exist :c<br/>
<span class='std-a' onclick='history.back()'>Go back</span>
</h1>`
}
function addQuery(str, str2) {
    str2 = str2 ? str2 : str
    return `<a href='/Roblox-Tutorials/?q=${str}'>${str2}</a>`
}

function loadService(db, data, type){
    data.__customData.classType = `${type} Service`

    $(`<style>${JSONtoCSS(data.__customData.css)}</style>`).appendTo($('head'))
    $('main').html(getTemplate(data.nameDisplay, data.__customData.classType, data.content))
    $('.main-classtype > h2').html(data.__customData.classType)
}

function loadClass(db, data, type){
    data.__customData.classType = `${type} Class`

    $(`<style>${JSONtoCSS(data.__customData.css)}</style>`).appendTo($('head'))
    $('main').html(getTemplate(data.nameDisplay, data.__customData.classType, data.content))
    $('.main-classtype > h2').html(data.__customData.classType)
    
    let stmt = db.prepare('SELECT * FROM `class_properties` WHERE `class`=?')
    stmt.bind([data.name])

    while(stmt.step()){
        const propsData = stmt.getAsObject()
        $('.main-properties').append(JQCreate(
            'p',
            `${propsData.name}: ${addQuery(propsData.type)}<br/>${propsData.description}`
        ),'<hr/>')
    }

    stmt = db.prepare('SELECT * FROM `class_methods` WHERE `class`=?')
    stmt.bind([data.name])

    while(stmt.step()){
        const metsData = stmt.getAsObject()

        let params = metsData.parameters

        if(metsData.parameters !== ''){
            params = params.split(',').map(entry => {
                entry = entry.replace(/ /ig,'')
                let index = entry.indexOf(':')
                return `${entry.substring(0,index+1)} ${addQuery(entry.substring(index+1))}`
            }).join(', ')
        }

        let msg = `${metsData.name}(${params}): ${addQuery(metsData.returnType)}`
        msg += metsData.yields == 1 ? ' - YIELDS<br/>' : '<br/>'
        msg += metsData.description
        
        $('.main-methods').append(JQCreate(
            'p',
            msg
        ),'<hr/>')
    }
}

function loadWebsite(db, queryParams, filterParams, limitParams){
    if(!queryParams){
        if(filterParams && limitParams){
            let stmt = db.prepare('SELECT * FROM `pages`')
            let ul = JQCreateList(false)

            while(stmt.step()){
                let res = stmt.get()
                ul.appendChild(JQCreateListItem(addQuery(res[2],res[3])))
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
    let classType = 'Shared'

    const type = obj.type.toUpperCase()
    if(type === 'SHARED') {
        css = setShared(css)
        classType = 'Shared'
    } else if(type == 'SERVER') {
        css = setServer(css)
        classType = 'Server'
    } else if(type == 'CLIENT') {
        css = setClient(css)
        classType = 'Client'
    } else throw Error('Unknown type!')

    obj.__customData = {
        css: css,
        type: classType
    }

    if(obj.pageType === 'CLASS') return loadClass(db, obj, classType)
    else if(obj.pageType == 'SERVICE') return loadService(db, obj, classType)
    else throw Error('Unknown page type!')
}