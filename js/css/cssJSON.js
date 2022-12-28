/*
main {
    text-align: left;
    border-radius: 30px;
    border: 5px solid rgb(117, 117, 255); 
    width: auto;
    padding: 20px;
    background-color: #121319;
    color: #bbb;
}
.main-header {
    border-bottom: 5px solid rgb(117, 117, 255);
    display: flex;
}
*/

function __formatDataToJSON(str){
    let curIndex = 0
    let data = ''
    let json = {}

    for(; curIndex < str.length; curIndex++){
        if(str[curIndex] == '\r') continue
        if(str[curIndex] == '\n') continue
        if(str[curIndex] == '\t') continue
        if(str[curIndex] == ' ' && str[curIndex+1] == ' ') {
            curIndex++
            continue
        }
        data += str[curIndex]
    }
    for(let elem of data.split(';').filter(s => s)){
        let [key, value] = elem.split(':')
        if(key.startsWith(' ')) key = key.substring(1)
        if(key.endsWith(' ')) key = key.substring(0,key.length-1)
        if(value.startsWith(' ')) value = value.substring(1)
        json[key] = value
    }

    return json
}
function JSONtoCSS(json){
    let css = ''

    for (const [key, value] of Object.entries(json)) {
        css += key
        css += ' {\r\n'
        for(const [k,v] of Object.entries(value)) {
            css += `\t${k}: ${v};\r\n`
        }
        css += '}\r\n'
    }
    return css
}

function cssToJSON(str){
    let curIndex = 0
    let elemIndex = 0
    let endIndex = 0
    let elems = {}
    
    while(true){
        elemIndex = str.indexOf('{',curIndex)
        if(elemIndex == -1) break
        endIndex = str.indexOf('}',curIndex)
        if(endIndex == -1) throw Error('Malformed CSS!')

        let name = str.substring(curIndex,elemIndex-1).replace(/([\r\n]+| )/,'')
        elems[name] = __formatDataToJSON(str.substring(elemIndex+1,endIndex))

        curIndex = endIndex+1
    }
    return elems
}