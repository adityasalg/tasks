const fs= require('fs');

const loadContacts= ()=>{
    return new Promise((resolve, reject)=>{
        try
        {
            const buffContacts=fs.readFileSync('abc.json');
            const stringContacts=buffContacts.toString();
            resolve(JSON.parse(stringContacts));
        }
        catch(e)
        {
            resolve([])
        }
    })
}

const saveContacts= (contacts)=>{
    return new Promise((resolve, reject)=>{
        const dataJSON= JSON.stringify(contacts)
        fs.writeFileSync('abc.json',dataJSON)
        resolve('success')
    })
}

const checkDuplicate=(loadedContacts,name)=>{
    return new Promise((resolve, reject)=>{
        const duplicateTasks= loadedContacts.filter((contact) => contact.name===name)
        if(duplicateTasks.length===0)
        {
            resolve(1);
        }
        reject()
    })
}

const addContact=(fname, mnumber)=>{
    loadContacts().then(async (loadedContacts)=>{
        const status= await checkDuplicate(loadedContacts,fname);
        if(status===1)
        {
            loadedContacts.push({
                name: fname,
                number: mnumber
            })
        }
        return saveContacts(loadedContacts)
    }).then(()=>{
        console.log('Successful')
    }).catch((err)=>{
        console.log('name already present')
    })
}

// const status= addContact('aditya',123)

    
//     const addTask= (title)=>{
//     const tasks= loadTasks();
//     const duplicateTasks= tasks.filter((task) => task.title===title)

//     if(duplicateTasks.length===0)
//     {
//         tasks.push({
//             title: title
//         })
//         saveTasks(tasks)
//     }
//     else
//     {
//         console.log('task already present')
//     }
// }



// const saveTasks= (tasks)=>{
//     const dataJSON= JSON.stringify(tasks)
//     fs.writeFileSync('abc.json',dataJSON)
// }

module.exports= (app) =>{

    app.get('/contact', async(req, res)=>{
        const data= await loadContacts();
        return res.render('contactList',{todos:data});
    });

    app.post('/contact', async(req, res)=>{
        await addContact(req.body.fname,req.body.mnumber);
        const data=await loadContacts();
        return res.render('contactList',{todos:data});
    });
};