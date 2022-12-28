function getTemplate(className, classType, description){
    return`
<main>
    <div class='main-header'>
        <div class='main-classname'>
            <h2>${className}</h2>
        </div>
        <div class='main-classtype'>
            <h2>${classType}</h2>
        </div>
        <div style='clear: both'></div>
    </div>
    <p>${description}</p>
</main>`
}