
fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(Response=>Response.json())
.then(json=>console.log(json))
.catch(error=>console.log("Rejected to get Api",error));




 


















// const axios = require("axios");
// const demoApi = () => {
//     return new Promise((resolve, reject) => {
//         axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
//             resolve(response.data);
//         }).catch(error => {
//             reject(error);
//         });
//     });
// };
 
// demoApi().then(data=>{
//     console.log("Api Successfully fetched",data);
// }).catch(error =>{
//     console.error('faliure:',error);
// });