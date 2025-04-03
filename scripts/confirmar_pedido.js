 let numeroLoja = CONFIG.WHATSAPP_NUMERO;

        // Carregar os dados do pedido armazenados no localStorage
        let pedido = JSON.parse(localStorage.getItem("pedido")) || {}; // Garante que sempre tem um objeto

        let frutas = pedido.frutas || [];
        let complementos = pedido.complementos || [];
        let caldas = pedido.caldas || [];
        console.log(pedido);

        if (pedido) {
            let detalhesHTML = `
                <p><strong>Tamanho do Copo:</strong> ${pedido.tamanho || "Não informado"}</p>
                <p><strong>🍓 Frutas:</strong> ${frutas.length > 0 ? frutas.join(", ") : "Nenhuma"}</p>
                <p><strong>➕ Complementos:</strong> ${complementos.length > 0 ? complementos.join(", ") : "Nenhum"}</p>
                <p><strong>🍯 Caldas:</strong> ${caldas.length > 0 ? caldas.join(", ") : "Nenhuma"}</p>
                <p><strong>💰 Total:</strong> R$${pedido.total || "0.00"}</p>
            `;
            document.getElementById("detalhesPedido").innerHTML = detalhesHTML;
        } else {
            document.getElementById("detalhesPedido").innerHTML = "<p>Nenhum pedido encontrado.</p>";
        }

        function enviarWhatsApp() {
             // Substitua pelo número da loja no WhatsApp
            let mensagem = `Olá, gostaria de pedir um açaí com os seguintes detalhes:\n\n` +
                `🥤 *Tamanho do Copo:* ${pedido.tamanho}ml\n\n` +
                `🍓 *Frutas:* ${pedido.frutas.length > 0 ? pedido.frutas.join(", ") : "Nenhuma"}\n` +
                `➕ *Complementos:* ${pedido.complementos.length > 0 ? pedido.complementos.join(", ") : "Nenhum"}\n` +
                `🍯 *Caldas:* ${pedido.caldas.length > 0 ? pedido.caldas.join(", ") : "Nenhuma"}\n\n` +
                `💰 *Total:* R$${pedido.total}\n\n` +
                `Pode confirmar o pedido?`;

            let linkWhatsApp = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;
            window.open(linkWhatsApp, "_blank"); // Abre o WhatsApp em uma nova aba
        }