const mail= document.getElementById('fname').value
const number= document.getElementById('mnumber').value
const form= document.getElementById('form')
const errorElement= document.getElementById('error')
console.log('testing')
form.addEventListener('submit', (e)=>{
    let messages=[];

    if(mail === '' || number ==='' || mail===null || number==null){
        messages.push('Name is required')
    }
    if(messages.length > 0){
        e.preventDefault();
        errorElement.innerHTML = messages.join(',')
    }
})