let maxFrutas = 0, maxCaldas = 0, maxComplementos = 0, totalExtras = 0, totalPreco = 0, precoCopo = 0;
const tamanho = JSON.parse(localStorage.getItem("tamanhoCopo"));

        function carregarTamanho() {
            const tamanho = JSON.parse(localStorage.getItem("tamanhoCopo"));
            console.log("Dados carregados do localStorage:", tamanho); 
            if (tamanho) {
                
                document.getElementById("titulo-tamanho").innerText = `Tamanho escolhido: ${tamanho.copo}ml`;

                maxFrutas = tamanho.maxFrutas;
                maxCaldas = tamanho.maxCaldas;
                maxComplementos = tamanho.maxComplementos;
                precoCopo = parseFloat(tamanho.preco);

                totalPreco = precoCopo;
                atualizarBotaoConfirmar();
            } else {
                alert("Nenhum tamanho de copo foi selecionado! Retorne à página anterior.");
                precoCopo = 0;
                totalPreco = 0;
            }

            atualizarBotaoConfirmar();
        }

        function countChecked(className) {
            return document.querySelectorAll(`input.${className}:checked`).length;
        }

        function enforceLimits(event) {
            const className = event.target.classList[0];
            const maxLimit = className === "fruta" ? maxFrutas : className === "calda" ? maxCaldas : maxComplementos;

            if (countChecked(className) > maxLimit) {
                event.target.checked = false;
                alert(`Limite de ${maxLimit} atingido para ${className === "fruta" ? "frutas" : className === "calda" ? "caldas" : "complementos"}!`);
            }
        }

        function addExtra(type) {
            if (type === "fruta") {
                maxFrutas++;
                totalPreco += 3;
                alert("Fruta extra adicionada! (+R$3,00)");
            } else if (type === "complemento") {
                maxComplementos++;
                totalPreco += 2;
                alert("Complemento extra adicionado! (+R$2,00)");
            }
            totalExtras++;
            atualizarBotaoConfirmar();
        }

        function atualizarBotaoConfirmar() {
            console.log(totalPreco);
            document.getElementById("btn-confirmar").innerText = `Confirmar Pedido (R$${totalPreco})`;
        }

        function confirmSelection() {
            let selectedItems = [];
            document.querySelectorAll('input[type="checkbox"]:checked').forEach(item => {
                selectedItems.push(item.nextElementSibling.innerText);
            });

            alert(`Você escolheu: ${selectedItems.join(", ")}.\nTotal de extras: ${totalExtras}.\nValor final: R$${totalPreco.toFixed(2)}`);
        }

        document.querySelectorAll('input[type="checkbox"]').forEach(el => {
            el.addEventListener("change", enforceLimits);
        });

        function confirmarPedido() {
            let frutas = [];
            let complementos = [];
            let caldas = [];
        
            document.querySelectorAll('input[type="checkbox"]:checked').forEach(item => {
                let nome = item.nextElementSibling.innerText;
                if (item.classList.contains("fruta")) {
                    frutas.push(nome);
                } else if (item.classList.contains("complemento")) {
                    complementos.push(nome);
                } else if (item.classList.contains("calda")) {
                    caldas.push(nome);
                }
            });
        
            let pedido = {
                tamanho: tamanho.copo, // Certifique-se de que `tamanhoCopo` está correto
                frutas: frutas.length > 0 ? frutas : [],
                complementos: complementos.length > 0 ? complementos : [],
                caldas: caldas.length > 0 ? caldas : [],
                total: totalPreco.toFixed(2)
                    };
        
            localStorage.setItem("pedido", JSON.stringify(pedido));
        
            window.location.href = "confirmar_pedido.html";
        }
        

        window.onload = carregarTamanho;