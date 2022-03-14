const tbody = document.getElementById('tbodyUserLists');
const click = document.querySelector('.click')
const backclick = document.querySelector('.backclick')


window.onload = () =>{
    /* alert("Your ApiKey is: " + DecryptStringAES(localStorage.getItem('ApiKey'))); */ //! örnek acısından yazdık. tokeni şifrelemiştik burada acıp kullanıcıya gösteriyoruz.gerçekte böyle birşey yok sadece örnek.
    getApiUserList(1);
   /*  setInterval(getApiUserList,5000); *///? sayfa yuklensın sonra 5 sanıyede bır guncellesın. o nedenle yukarı silmedik.
    
}
const getApiUserList = async ( pageNumber) =>{
    showLoading();
    //!axios
    try {

    /* const responseData = await axios.get('https://reqres.in/api/users?page=1') */
    const responseData = await axios({
        url: `https://reqres.in/api/users?page=${pageNumber}`,  //? birden fazla veri için süslü açılır.
        method: "get",
        /* data: bodyData */
    });
    console.log(responseData);  //?object döndü.başarılı.gelen veri object formatında.


    const {data:userListArray} = responseData.data;
    console.log(userListArray);
    if(userListArray.length == 0){
        alert("userlist not found"); //? bize göre apiye göre hata. bunuda kotrol etmeliyiz.
        removeLoading();
    }
    else{
        tbody.innerHTML = "";
        userListArray.forEach(customer => {
            tbody.innerHTML += `
        <tr>
            <td>
                ${customer.id}
            </td>
            <td>
            <img src="${customer.avatar}">
            </td>
            <td>
            ${customer.email}
            </td>
            <td>
            ${customer.first_name}
            </td>
            <td>
            ${customer.last_name}
            </td>
        </tr>`
            
        });
        removeLoading();
    }


    } 
    
    catch (error) {
        alert(error);

        // ?send errors to api and database (errorLogs table) // hatayı depoluyoruz cunku problemlerı gormek ıcın.
        /* postErrorLog('userList', "getApiUserList",error); */
        removeLoading();
    }
}

click.addEventListener('click',()=>{
    let word = true;
    if(word == true){
        getApiUserList(2);
    }
})
backclick.addEventListener('click',()=>{
    let word = true;
    if(word == true){
        getApiUserList(1);
    }
})

