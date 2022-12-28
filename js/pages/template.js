function getTemplate(className, classType, description){
    return `
<div class='main-header'>
    <div class='main-classname'>
        <h2>${className}</h2>
    </div>
    <div class='main-classtype'>
        <h2>${classType}</h2>
    </div>
    <div style='clear: both'></div>
</div>
<div>
    <p class='main-description'>${description}</p><br/>
    <h2>Properties</h2>
    <div class='main-properties'></div>
    <h2>Methods</h2>
    <div class='main-methods'></div>
    <h2>Events</h2>
    <div class='main-events'></div>
</div>`
}