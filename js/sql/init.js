async function startDB(callback, ...args){
    const sqlPromise = initSqlJs({
        locateFile: file => `js/sql/${file}`
    })

    const dataPromise = fetch('db/database.db').then(res => res.arrayBuffer())
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf))
    callback(db, args)
}
