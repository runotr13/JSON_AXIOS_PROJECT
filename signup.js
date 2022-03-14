const mail = document.getElementById('email');
const password = document.getElementById('password');
const sbmtButton = document.querySelector('#submit');

window.addEventListener('load',() => {
    mail.value = "eve.holt@reqres.in";
    password.value = "pistol";
});

sbmtButton.addEventListener('click',e => {
    postCustomerRegister();
})

const postCustomerRegister = async () => {
    const bodyData = {
        email:mail.value,
        password:password.value
    };
    console.log(bodyData);

    try {
        showLoading()
        const response = await axios({
            url: "https://reqres.in/api/register",
            method: "post",
            data:bodyData
            
        })
        const {data:userData} = response
        console.log(response);
        console.log(userData);
        if(userData.token == undefined){
            alert('undefined your token.');
            removeLoading();
        }else{
            localStorage.setItem('baseUrl',EncryptStringAES("https://reqres.in"));
            localStorage.setItem('ApiKey',EncryptStringAES(userData.token)); //! şifreledik... public yerlerde tokenler gözükmemeli.
            removeLoading();
            // tokene kaydettiyse o kullanıcılara bu sayfayı göster.
            window.location.href = "userList.html";
        }
    } catch (error) {
        alert(error);
        removeLoading();
    }
}