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




    constructor(props) {
        props && Object.assign(this, props)
        //console.log(this)
    }





    //renderWorksCards(works){
    renderWorksCards = (data) => {
        this.works = data
        data.forEach((item, i) => {
            document.querySelector(".gallery").innerHTML +=
                `<figure data-category = "${item.category.name}" id = "${item.id}"">
                <img src="${item.imageUrl}" alt="Abajour Tahina">
                <figcaption>${item.title}</figcaption>
                </figure>`
        });
    }

    // renderFilterGallery(categories){
    renderFilterGallery = (data) => {
        
        this.addPhotosModal(data)
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

    galleryModal = (data) => {

        let modal = document.querySelector("#modal1")
        modal.innerHTML += `<div class="modalWrapper">
            <h3 id="titreModal">Galerie Photo</h3>
            <div id="imageContainer">
            </div>
            <form action="#" method="post" class="modal1">
                <input type="submit" value="Ajouter Photo" class="submit">
            </form>
        </div>`



        data.forEach((item, i) => {
            document.querySelector("#imageContainer").innerHTML +=
                `<div class="image-wrapper">
            <input type="image" src="${item.imageUrl}" width="100%" > 
            <button class="deleteBoutton" ><i class="fas fa-trash" data-id = ${item.id}></i></button>
            </div>`
        });
        document.querySelector("#imageContainer").innerHTML += `<hr class="grey-line">`

        const button = document.querySelector("#modal1 input[type=submit]")
            , modal2 = document.querySelector("#modal2")
        button.addEventListener("click", function (e) {
            e.preventDefault()
            modal.classList.add("hide")
            modal2.classList.remove("hide")
        })
        let backButton = document.querySelector("#backButton");
        backButton.addEventListener("click", function () {
            modal1.classList.remove("hide");
            let modal2 = document.querySelector("#modal2");
            modal2.classList.add("hide");

        });

        const deleteBoutton = document.querySelectorAll('.deleteBoutton')
        deleteBoutton.forEach((item, i) => {
            item.addEventListener('click', async e => {
                const id = e.target.dataset.id
                    , token = localStorage.token
                    , requestParameters = {
                        method: "DELETE"
                        , headers: {
                            // "Content-Type": "application/json"
                            "Authorization": `Bearer ${token}`
                        }
                    }
                console.log("http://localhost:5678/api/works/" + id)
                console.log(requestParameters)

                let response = await fetch("http://localhost:5678/api/works/" + id, requestParameters)

                if (response.ok) { // check if HTTP status is 2xx
                    let deletedWork = response.status !== 204 ? await response.json() : null;
                    console.log(deletedWork)
                } else {
                    console.log('HTTP response not 2xx, check the API or network');
                }
            })
        })



    }

    addPhotosModal = (data) => {
        this.categories = data


        // Ajout de la modal pour ajouter des travaux


        document.querySelector("#modal2").innerHTML += `
        <div class = modalWrapper>
        
        <div class ="modalHeader">
        <button id="backButton"><i class="fas fa-arrow-left"></i></button>
        </div>
        
        <h3>Ajout photo</h3>

        

        <form action="#">
            
            <div class="addPhotosDiv">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#c9c9c9" d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                <img src="" class = "hide">
                <label id="addPhotos">
                <p>+ Ajouter Photos</p>
                <input name="image" type="file" class="inputImg NoOpacity" accept="image/png, image/jpeg">
                </label>
                </div>
                
                <label for="title">Titre</label>
                <input type="text" name="title" id="title">
                <label for="category">Catégorie</label>
                <select name="category" class="selectCategorie"></select>
                <hr class="grey-line">
                
                <span id="submit">
                <input type="submit" value="Valider">
                </span>
                </form>
                </div>
                `;

            data.forEach((item, i) => {
             document.querySelector("#modal2 select").innerHTML += `<option value="${item.id}">${item.name}</option>`
            });    

        
        // initialisation des variables


        const token = localStorage.token
        , image = document.querySelector(".addPhotosDiv img")
        , picture = document.querySelector(".addPhotosDiv svg")
        let form = document.querySelector("#modal2 form")
        let input = document.querySelector(".inputImg")
        , preview = document.querySelector("form img")
        console.log(token);

        
        // Ecouteur d'événements pour l'envoi du formulaire au backend


        form.addEventListener("submit", e => {
            e.preventDefault();

            let formData = new FormData(form);
            

            const result = fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                    
                    
                },
                body: formData
            })
            .then(response => response.json())
            .then(json => {
                console.log('Success:', json);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
        });
        


        // Ecouteur d'événements pour l'affichage de l'image sélectionnée
        
        
        input.addEventListener("change", function () {  
            let file = this.files[0]; // Obtient le premier fichier sélectionné

            if (file) {
                let reader = new FileReader();

                reader.addEventListener("load", function () {
                    preview.src = this.result; // Attribue le résultat de la lecture du fichier à la propriété src de la balise img
                });

                reader.readAsDataURL(file); // Lit le fichier en tant que Data URL
                image.classList.remove("hide");
                picture.classList.add("hide");
                document.querySelector("#addPhotos").classList.add("hide");
            }
        });
    }
}

