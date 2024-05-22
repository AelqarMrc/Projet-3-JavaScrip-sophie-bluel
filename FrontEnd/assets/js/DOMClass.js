export default class DOMClass {
    // Public field declarations
    // publicField = 0;
    // Public Static field declarations
    // static staticField = 0;
    // Private field declarations
    // #privateField = 0;
    // Private Static field declarations
    // static #privateStaticField = 0;
    works = []
    categories = []
    //login = []



    constructor(props) {
        props && Object.assign(this, props)
        //console.log(this)
    }





    //renderWorksCards(works){
    renderWorksCards = (data) => {
        this.works = data
        data.forEach((item, i) => {
            document.querySelector(".gallery").innerHTML +=
                `<figure data-category = "${item.category.name}">
                <img src="${item.imageUrl}" alt="Abajour Tahina">
                <figcaption>${item.title}</figcaption>
                </figure>`
        });
    }

    // renderFilterGallery(categories){
    renderFilterGallery = (data) => {
        //console.log(this.works)
        this.categories = data
        this.works = data
        data.unshift({ name: "Tous" });
        data.forEach((item, i) => {
            document.querySelector(".filterBtn").innerHTML +=
                `<button>${item.name}</button>`
        });
    };



    // filterClickEvent(){
    filterClickEvent = () => {

        const filters = document.querySelectorAll(".filterBtn")
            , works = document.querySelectorAll(".gallery figure")


        filters.forEach(filter => {
            filter.addEventListener("click", function (e) {

                works.forEach((work, i) => {
                    work.classList.remove("hide")
                })

                works.forEach((work, i) => {
                    if (e.target.textContent == "Tous") {
                        work.classList.remove("hide")
                    }
                    else if (work.dataset.category !== e.target.textContent) {
                        work.classList.add("hide")
                    }

                })


            })
        })

    }


    // renderLogin(login){
    renderLogin = () => {

        const data = document.querySelectorAll("#login")
        data.forEach((item, i) => {
            document.querySelector("#login").innerHTML =
                `<h2>Log in</h2>
            <form id="loginForm">
            <label for="email">Email</label>
            <input type="email" name="email"">
            <label for="password">Mot de passe</label>
            <input type="password" name="password">
            <input type="submit" value="Se connecter">	
            <h3>Mot de passe oublié</h3>
            </form>`
        })

        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const formData = {
                email: loginForm.email.value,
                password: loginForm.password.value
            };


            let response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify((formData))
            });
            console.log(response);
            
            // Si la requête est réussie, le serveur doit renvoyer un token
            if (response.ok === true) {
                const { token } = await response.json();

                // Stocker le token dans le localStorage
                localStorage.setItem('token', token);

                // Rediriger l'utilisateur vers la page d'accueil
                window.location.href = 'index.html';
                console.log(localStorage);
                
                
            } else {
                // Gérer les erreurs, par exemple en montrant un message à l'utilisateur
                console.error('Login failed');
            }

            

        });
    }


    // loginPage(){
    loginPage = () => {

        this.renderLogin()
        document.querySelector("#login").classList.add("hide")
        const login = document.querySelectorAll(".loginBtn")

        login.forEach(button => {
            button.addEventListener("click", function (e) {

                document.querySelector("main").classList.add("hide")
                document.querySelector("#login").classList.remove("hide")
            })
        })

    }

}

