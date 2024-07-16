export default class DOMClass {
    works = []
    categories = []




    constructor(props) {
        props && Object.assign(this, props)
    }






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

    renderLogin = () => {

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

    loginBehavior = () => {
        document.addEventListener("DOMContentLoaded", function () {
            const token = localStorage.getItem('token')
                , edit = document.querySelector("#editLink")
                , editModeBar = document.querySelector("#editModeBar")
                , modal = document.querySelector("#modal1")
                , modal2 = document.querySelector("#modal2")
                , margin = document.querySelector("header")



            if (token) {
                const loginButton = document.querySelector('.loginBtn');
                if (loginButton) {
                    loginButton.textContent = 'logout';
                    const filter = document.querySelector('.filterGallery');
                    filter.classList.add('hide');
                    editModeBar.classList.remove('hide');
                    margin.style.marginTop = '6.5em';

                    loginButton.onclick = function () {
                        if (loginButton.textContent === 'login') {
                        }
                        localStorage.removeItem('token');
                        window.location.href = 'index.html';
                        loginButton.textContent = 'login';


                    }
                }
                edit.addEventListener('click', e => {
                    modal.classList.remove('hide');
                });

                const body = document.querySelector('body');
                body.addEventListener('click', e => {
                    if (e.target === modal) {
                        modal.classList.add('hide');
                    }
                    if (e.target === modal2) {
                        modal2.classList.add('hide');
                    }
                });


            }
            else {
                edit.classList.add('hide');

            }
        });
    }


    galleryModal = (data) => {

        let modal = document.querySelector("#modal1")
        modal.innerHTML += `<div class="modalWrapper">
            <div class=modalHeader>
            <button class="closeButton"><i class="fas fa-times"></i></button>
            </div>
            <h3 id="titreModal">Galerie Photo</h3>
            <div id="imageContainer">
            <div id="image-wrapper"></div>
            <span class="grey-line"></span>
            </div>
            
            <form action="#" method="post" class="modal1">
                <input type="submit" value="Ajouter une Photo" class="submit">
            </form>
        </div>`



        data.forEach((item, i) => {
            document.querySelector("#image-wrapper").innerHTML +=
                `<div class="image-wrapper">
            <input type="image" src="${item.imageUrl}" width="100%" > 
            <button class="deleteBoutton">
                <img data-id="${item.id}" src="assets/icons/Group17.png" alt="delete">
            </button>
            </div>`
        });


        const button = document.querySelector("#modal1 input[type=submit]")
            , modal2 = document.querySelector("#modal2")
        button.addEventListener("click", function (e) {
            e.preventDefault()
            modal.classList.add("hide")
            modal2.classList.remove("hide")
        })

        let closeButton = document.querySelector(".closeButton");
        closeButton.addEventListener("click", function (e) {
            let modal1 = document.querySelector("#modal1");
            modal1.classList.add("hide");
        });



        //Ecouteur d'événements pour la suppression de l'image

        const deleteBoutton = document.querySelectorAll('.deleteBoutton')
        deleteBoutton.forEach((item, i) => {
            item.addEventListener('click', async e => {
                const id = e.target.dataset.id
                console.log(id);
                    const token = localStorage.token
                    , requestParameters = {
                        method: "DELETE"
                        , headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                console.log("http://localhost:5678/api/works/" + id)
                console.log(requestParameters)

                try {
                    let response = await fetch(`http://localhost:5678/api/works/${id}`, requestParameters);

                    if (response.ok) {
                        e.target.closest('.image-wrapper').remove();
                        const works = document.querySelectorAll(".gallery figure")
                        works.forEach(work => {
                            if (work.id == id) {
                                work.remove()
                            }
                        })
                    } else {
                        console.error('HTTP response not 2xx, check the API or network');
                    }
                } catch (error) {
                    console.error('Error during fetch operation:', error);
                }
            })
        });


    }

    addPhotosModal = (data) => {
        this.categories = data


        // Ajout de la modal pour ajouter des travaux


        document.querySelector("#modal2").innerHTML += `
        <div class = modalWrapper>       
        
        <div class ="modalHeader">
            <button id="backButton"><i class="fas fa-arrow-left"></i></button>
            <button class="closeButton"><i class="fas fa-times"></i></button>
        </div>        
            <h3>Ajout photo</h3>
        <form action="#">          
            <div class="addPhotosDiv">
            <svg width="70" height="61" viewBox="0 0 70 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.5517 6.88793C61.7228 6.88793 62.681 7.84612 62.681 9.01724V51.5768L62.0156 50.7118L43.9165 27.2894C43.3176 26.5042 42.3727 26.0517 41.3879 26.0517C40.4031 26.0517 39.4715 26.5042 38.8594 27.2894L27.8136 41.5824L23.7546 35.8998C23.1557 35.0614 22.1975 34.569 21.1595 34.569C20.1214 34.569 19.1632 35.0614 18.5644 35.9131L7.91783 50.8183L7.31896 51.6434V51.6034V9.01724C7.31896 7.84612 8.27715 6.88793 9.44827 6.88793H60.5517ZM9.44827 0.5C4.75048 0.5 0.93103 4.31945 0.93103 9.01724V51.6034C0.93103 56.3012 4.75048 60.1207 9.44827 60.1207H60.5517C65.2495 60.1207 69.069 56.3012 69.069 51.6034V9.01724C69.069 4.31945 65.2495 0.5 60.5517 0.5H9.44827ZM20.0948 26.0517C20.9337 26.0517 21.7644 25.8865 22.5394 25.5655C23.3144 25.2444 24.0186 24.7739 24.6118 24.1807C25.2049 23.5876 25.6755 22.8834 25.9965 22.1083C26.3175 21.3333 26.4828 20.5027 26.4828 19.6638C26.4828 18.8249 26.3175 17.9943 25.9965 17.2192C25.6755 16.4442 25.2049 15.74 24.6118 15.1468C24.0186 14.5537 23.3144 14.0831 22.5394 13.7621C21.7644 13.4411 20.9337 13.2759 20.0948 13.2759C19.2559 13.2759 18.4253 13.4411 17.6503 13.7621C16.8752 14.0831 16.171 14.5537 15.5779 15.1468C14.9847 15.74 14.5142 16.4442 14.1931 17.2192C13.8721 17.9943 13.7069 18.8249 13.7069 19.6638C13.7069 20.5027 13.8721 21.3333 14.1931 22.1083C14.5142 22.8834 14.9847 23.5876 15.5779 24.1807C16.171 24.7739 16.8752 25.2444 17.6503 25.5655C18.4253 25.8865 19.2559 26.0517 20.0948 26.0517Z" fill="#B9C5CC"/>
            </svg>
                <img src="" class = "hide">
            <label id="addPhotos">
                <h3>+ Ajouter photo</h3>
                <input name="image" type="file" class="inputImg NoOpacity" accept="image/png, image/jpeg">
                </label>
                <p>jpg, png: 4Mo max</p>
            </div> 

            <label for="title">Titre</label>
                <input type="text" name="title" id="title">
            <label for="category">Catégorie</label>
                <select name="category" class="selectCategorie"></select>
                <hr class="grey-line">              
            <span id="submit">
                <input type="submit" value="Valider" class="submit">
            </span>
                </form>
            </div>`
            ;

        document.querySelector("#modal2 select").insertAdjacentHTML('beforeend', `<option value="">`);;
        data.forEach((item, i) => {
            document.querySelector("#modal2 select").insertAdjacentHTML('beforeend', `<option value="${item.id}">${item.name}</option>`);
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
                .then(response => {
                    if (!response.ok) {
                        throw alert('Remplissez les champs du formulaire correctement');
                    }
                    return response.json();
                })
                .then(json => {
                    const works = document.querySelector(".gallery");

                    const newWork = document.createElement("figure");
                    newWork.innerHTML = `<img src="${json.imageUrl}" alt="${json.title}">`;
                    newWork.innerHTML += `<figcaption>${json.title}</figcaption>`;
                    newWork.dataset.category = json.category;
                    newWork.id = json.id;
                    works.appendChild(newWork);

                    const modal = document.querySelector("#modal2");
                    modal.classList.add("hide");

                    // Ajout de l'image dans la galerie dynamiquement


                    const work = document.querySelector("#image-wrapper");

                    const newImage = document.createElement("div");
                    newImage.classList.add("image-wrapper");
                    newImage.innerHTML = `<input type="image" src="${json.imageUrl}" width="100%">`;
                    newImage.innerHTML += `<button class="deleteBoutton">
                                           <img data-id="${json.id}" src="assets/icons/Group17.png" alt="delete">
                                            </button>`;
                    work.appendChild(newImage);


                    // Ecouteur d'événements pour la suppression de l'image

                    const deleteBoutton = document.querySelectorAll('.deleteBoutton')
                    deleteBoutton.forEach((item, i) => {
                        item.addEventListener('click', async e => {
                            const id = e.target.dataset.id
                            console.log(id);
                            const token = localStorage.token
                                , requestParameters = {
                                    method: "DELETE"
                                    , headers: {
                                        "Authorization": `Bearer ${token}`
                                    }
                                }
                            console.log("http://localhost:5678/api/works/" + id)
                            console.log(requestParameters)

                            try {
                                let response = await fetch(`http://localhost:5678/api/works/${id}`, requestParameters);

                                if (response.ok) {
                                    e.target.closest('.image-wrapper').remove();
                                    const works = document.querySelectorAll(".gallery figure")
                                    works.forEach(work => {
                                        if (work.id == id) {
                                            work.remove()
                                        }
                                    })
                                } else {
                                    console.error('HTTP response not 2xx, check the API or network');
                                }
                            } catch (error) {
                                console.error('Error during fetch operation:', error);
                            }
                            
                        })
                        form.reset();
                        image.classList.add("hide");
                        document.querySelector("#addPhotos").classList.remove("hide");
                        picture.classList.remove("hide");
                    });

                    console.log('Success:', json);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        });

        //Ecouteur d'événements pour le bouton de fermeture et de retour en arrière de la modal

        let backButton = document.querySelector("#backButton");
        backButton.addEventListener("click", function () {
            let modal1 = document.querySelector("#modal1");
            modal1.classList.remove("hide");
            let modal2 = document.querySelector("#modal2");
            modal2.classList.add("hide");
        });

        let closeButton = document.querySelector(".closeButton");
        closeButton.addEventListener("click", function (e) {
            console.log(e.target);
            let modal2 = document.querySelector("#modal2");
            modal2.classList.add("hide");
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

