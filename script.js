document.addEventListener('DOMContentLoaded', function () {
    // Exibe o modal de disclaimer ao carregar a página
    var disclaimerModal = new bootstrap.Modal(document.getElementById('disclaimerModal'));
    disclaimerModal.show();

    // Certifique-se de que jsPDF e autoTable estão disponíveis
    const { jsPDF } = window.jspdf;

    // Agora você pode usar jsPDF e autoTable
    const doc = new jsPDF();

    // Preenche as marcas de carros via API
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
        .then(response => response.json())
        .then(data => {
            const marcaCarroSelect = document.getElementById('marcaCarro');
            data.forEach(marca => {
                const option = document.createElement('option');
                option.value = marca.codigo;
                option.textContent = marca.nome;
                marcaCarroSelect.appendChild(option);
            });
        });

    // Preenche os modelos de carros ao selecionar uma marca
    document.getElementById('marcaCarro').addEventListener('change', function () {
        const marcaCodigo = this.value;
        const modeloCarroSelect = document.getElementById('modeloCarro');

        if (marcaCodigo) {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`)
                .then(response => response.json())
                .then(data => {
                    modeloCarroSelect.innerHTML = '<option value="">Selecione o modelo do carro</option>';
                    data.modelos.forEach(modelo => {
                        const option = document.createElement('option');
                        option.value = modelo.codigo;
                        option.textContent = modelo.nome;
                        modeloCarroSelect.appendChild(option);
                    });
                    modeloCarroSelect.disabled = false;
                });
        } else {
            modeloCarroSelect.innerHTML = '<option value="">Selecione o modelo do carro</option>';
            modeloCarroSelect.disabled = true;
            document.getElementById('ano').innerHTML = '<option value="">Selecione o ano do carro</option>';
            document.getElementById('ano').disabled = true;
        }
    });

    // Preenche os anos disponíveis ao selecionar um modelo
    document.getElementById('modeloCarro').addEventListener('change', function () {
        const marcaCodigo = document.getElementById('marcaCarro').value;
        const modeloCodigo = this.value;
        const anoSelect = document.getElementById('ano');

        if (marcaCodigo && modeloCodigo) {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`)
                .then(response => response.json())
                .then(data => {
                    anoSelect.innerHTML = '<option value="">Selecione o ano do carro</option>';
                    data.forEach(ano => {
                        const option = document.createElement('option');
                        option.value = ano.codigo;
                        option.textContent = ano.nome;
                        anoSelect.appendChild(option);
                    });
                    anoSelect.disabled = false;
                });
        } else {
            anoSelect.innerHTML = '<option value="">Selecione o ano do carro</option>';
            anoSelect.disabled = true;
        }
    });

    // Gera a apólice ao enviar o formulário
    document.getElementById('apoliceForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Validação dos campos
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const marca = document.getElementById('marcaCarro').value;
        const modelo = document.getElementById('modeloCarro').value;
        const ano = document.getElementById('ano').value;

        if (!nome || !cpf || !email || !marca || !modelo || !ano) {
            toaster.show('Preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Gera um número de apólice aleatório
        const numeroApolice = Math.floor(Math.random() * 1000000000);

        // Obtém o preço FIPE do carro selecionado
        const marcaCodigo = document.getElementById('marcaCarro').value;
        const modeloCodigo = document.getElementById('modeloCarro').value;
        const anoCodigo = document.getElementById('ano').value;

        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`)
            .then(response => response.json())
            .then(data => {
                const precoFipe = data.Valor;
                const valorSeguro = (parseFloat(precoFipe.replace('R$ ', '').replace('.', '').replace(',', '.')) * 0.05).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                });

                // Exibe os dados da apólice
                document.getElementById('numeroApolice').textContent = numeroApolice;
                document.getElementById('nomeUsuario').textContent = nome;
                document.getElementById('cpfUsuario').textContent = cpf;
                document.getElementById('emailUsuario').textContent = email;
                document.getElementById('marcaCarroSelecionado').textContent = document.getElementById('marcaCarro').selectedOptions[0].textContent;
                document.getElementById('modeloCarroSelecionado').textContent = document.getElementById('modeloCarro').selectedOptions[0].textContent;
                document.getElementById('anoCarroSelecionado').textContent = document.getElementById('ano').selectedOptions[0].textContent;
                document.getElementById('precoFipe').textContent = precoFipe;
                document.getElementById('valorSeguro').textContent = valorSeguro;
                document.getElementById('apoliceResult').classList.remove('d-none');

                // Exibe mensagem de sucesso
                toaster.show('Apólice gerada com sucesso!', 'success');
            })
            .catch(() => {
                toaster.show('Erro ao consultar o preço FIPE. Tente novamente.', 'error');
            });
    });

    // Gera o PDF da apólice
    document.getElementById('downloadPdf').addEventListener('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Cabeçalho
        doc.setFontSize(18);
        doc.setTextColor(35, 61, 255); // Cor primária (#233DFF)
        doc.text('Apólice de Seguro Automotivo', 10, 20);

        // Informações da apólice
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Preto
        doc.text(`Número da Apólice: ${document.getElementById('numeroApolice').textContent}`, 10, 30);
        doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}`, 10, 40);

        // Tabela de dados
        const dadosApolice = [
            ['Nome', document.getElementById('nomeUsuario').textContent],
            ['CPF', document.getElementById('cpfUsuario').textContent],
            ['Email', document.getElementById('emailUsuario').textContent],
            ['Marca', document.getElementById('marcaCarroSelecionado').textContent],
            ['Modelo', document.getElementById('modeloCarroSelecionado').textContent],
            ['Ano', document.getElementById('anoCarroSelecionado').textContent],
            ['Preço FIPE', document.getElementById('precoFipe').textContent],
            ['Valor do Seguro', document.getElementById('valorSeguro').textContent],
        ];

        // Adiciona a tabela ao PDF
        doc.autoTable({
            startY: 50,
            head: [['Campo', 'Valor']],
            body: dadosApolice,
            theme: 'striped',
            headStyles: { fillColor: [64, 164, 213] }, // Cor secundária (#40A4D5)
        });

        // Franquias de seguro (valores aleatórios)
        const franquias = [
            ['Colisão', (Math.random() * 1000 + 500).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })],
            ['Roubo', (Math.random() * 1000 + 500).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })],
            ['Incêndio', (Math.random() * 1000 + 500).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })],
            ['Danos a Terceiros', (Math.random() * 1000 + 500).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })],
        ];

        doc.setFontSize(14);
        doc.setTextColor(35, 61, 255); // Cor primária (#233DFF)
        doc.text('Franquias de Seguro', 10, doc.autoTable.previous.finalY + 10);

        // Adiciona a tabela de franquias ao PDF
        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 15,
            head: [['Tipo de Franquia', 'Valor']],
            body: franquias,
            theme: 'striped',
            headStyles: { fillColor: [64, 164, 213] }, // Cor secundária (#40A4D5)
        });

        // Rodapé
        doc.setFontSize(10);
        doc.setTextColor(107, 107, 107); // Cor quaternária (#6B6B6B)
        doc.text('Este documento é gerado automaticamente e não necessita de assinatura.', 10, doc.autoTable.previous.finalY + 10);

        // Salva o PDF
        doc.save('apolice.pdf');
    });
});