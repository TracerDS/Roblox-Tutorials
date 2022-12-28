const SHARED_COLOR = 'rgb(117, 117, 255)'
const SERVER_COLOR = 'rgb(232, 115, 0)'
const CLIENT_COLOR = 'rgb(255, 50, 50)'

function getPageCSS(){
    return `
main {
    text-align: left;
    border-radius: 30px;
    width: auto;
    padding: 20px;
    background-color: #121319;
    color: #bbb;
}
.main-header {
    display: flex;
}

.main-classname {
    text-align: left;
    width: 30%;
    margin-left: 5%;
}
.main-classtype {
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    text-align: right;
    margin-right: 5%;
    flex: 1;
}`
}

function setShared(json){
    json.main.border = `5px solid ${SHARED_COLOR};`
    json['.main-header']['border-bottom'] = `5px solid ${SHARED_COLOR};`
    json['.main-classname'].color = SHARED_COLOR
    json['.main-classtype'].color = SHARED_COLOR

    return json
}
function setServer(json){
    json.main.border = `5px solid ${SERVER_COLOR};`
    json['.main-header']['border-bottom'] = `5px solid ${SERVER_COLOR};`
    json['.main-classname'].color = SERVER_COLOR
    json['.main-classtype'].color = SERVER_COLOR
    
    return json
}
function setClient(json){
    json.main.border = `5px solid ${CLIENT_COLOR};`
    json['.main-header']['border-bottom'] = `5px solid ${CLIENT_COLOR};`
    json['.main-classname'].color = CLIENT_COLOR
    json['.main-classtype'].color = CLIENT_COLOR
    
    return json
}