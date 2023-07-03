let data;

        document.addEventListener("DOMContentLoaded", function () {
            fetch('https://fakestoreapi.com/products')
                .then(res => res.json())
                .then(responseData => {
                    data = responseData;
                    console.log(data);
                    AddMaisProcurados(data);
                    AddImagens(data);
                    AddCards(data);
                })
        })

        function AddCards(data) {
            console.log(data);
            var card = "";
            for (let index = 0; index < data.length; index++) {
                card += `<div class="col-md-3 d-flex p-2">
                <div class="card m-1 border-0" style="width: 18rem;">
                    <div class="ratio" style="--bs-aspect-ratio:45%;">
                        <img style="height:9rem;" src="${data[index].image}" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <p class="card-text">${data[index].title}</p>
                        <p><b>R$</b>: ${data[index].price}</p>`;

                // Adicione o rating abaixo do preço
                const rating = data[index].rating.rate;
                const estrelas = adicionarEstrelas(rating);
                card += `<p><b>Rating</b>: ${estrelas}</p>`;

                card += `</div>
                </div>
            </div>`;
            }
            document.getElementById("Cards").innerHTML = card;
        }

        function AddMaisProcurados(data) {
            var html = ""
            for (let index = 0; index < 9; index++) {
                html += `<div class="row">
                <div class="card mb-3 border-0" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data[index].image}" class="img-fluid rounded mt-3" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <p class="card-title">${data[index].title}</p>
                                <p><b>R$:${data[index].price}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>`
            }
            document.getElementById("MaisProcurados").innerHTML = html
        }

        function adicionarEstrelas(rating) {
            const estrelas = []
            // Verifica se o rating é um número válido
            if (!isNaN(rating)) {
                // Obtém o número inteiro do rating
                const ratingInteiro = Math.floor(rating);

                // Adiciona estrelas inteiramente preenchidas
                for (let i = 0; i < ratingInteiro; i++) {
                    estrelas.push(`<i class="bi bi-star-fill" style = "color: #c7c700;"></i>`);
                }

                // Verifica se o rating tem parte decimal
                if (rating % 1 !== 0) {
                    estrelas.push(`<i class="bi bi-star-half" style = "color: #c7c700;"></i>`);
                }

                // Adiciona estrelas vazias para completar até 5 estrelas
                const estrelasVazias = 5 - estrelas.length;
                for (let i = 0; i < estrelasVazias; i++) {
                    estrelas.push(`<i class="bi bi-star" style = "color: #c7c700;"></i>`);
                }
            }

            return estrelas.join(" ");
        }

        function AddImagens(data) {
            document.getElementById("imagem1").setAttribute('src', data[1].image)
            document.getElementById("imagem2").setAttribute('src', data[2].image)
            document.getElementById("imagem3").setAttribute('src', data[3].image)
        }