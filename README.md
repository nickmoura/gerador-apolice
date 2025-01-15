# Gerador de Apólice de Seguro Automotivo

Este projeto é um gerador de apólice de seguro automotivo que permite ao usuário preencher um formulário com dados pessoais e informações sobre o veículo. O sistema gera uma apólice com um número único, consulta o preço FIPE do veículo e calcula um valor fictício para o seguro. O usuário pode baixar a apólice em formato PDF.

## Funcionalidades

- **Geração de Número de Apólice**: Um número de apólice totalmente aleatório é gerado para cada solicitação.
- **Consulta de Preço FIPE**: O preço FIPE do veículo é obtido através de uma API.
- **Cálculo de Valor do Seguro**: O valor do seguro é calculado como 5% do preço FIPE.
- **Download de PDF**: A apólice pode ser baixada em formato PDF.
- **Validação de Campos**: Todos os campos do formulário são validados antes da geração da apólice.
- **Toaster de Notificação**: Exibe mensagens de sucesso ou erro com ícones e funcionalidade de arrastar para fechar.
- **Responsividade**: A interface é responsiva e funciona bem em dispositivos móveis e desktops.

## Tecnologias Utilizadas

- **HTML**: Estrutura da página.
- **CSS**: Estilização da página e do toaster.
- **JavaScript**: Lógica do formulário, consulta à API e geração do PDF.
- **Bootstrap**: Framework CSS para estilização e componentes.
- **Font Awesome**: Ícones para o toaster.
- **jsPDF**: Biblioteca para geração de PDFs.
- **FIPE API**: API para consulta do preço FIPE do veículo.

## Como Usar

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/nickmoura/gerador-apolice.git
   cd gerador-apolice
   ```

2. **Abra o Projeto**:
   - Abra o arquivo `index.html` no seu navegador.

3. **Preencha o Formulário**:
   - Insira os dados pessoais e as informações do veículo.
   - Selecione a marca, modelo e ano do veículo.

4. **Gere a Apólice**:
   - Clique em "Gerar Apólice" para gerar a apólice e exibir os detalhes.

5. **Baixe o PDF**:
   - Clique em "Baixar PDF" para baixar a apólice em formato PDF.

## Estrutura do Projeto

```
/gerador-apolice
│
├── index.html          # Página principal do projeto
├── style.css           # Estilos CSS para a página e o toaster
├── script.js           # Lógica JavaScript do formulário e geração do PDF
├── masks.js            # Máscaras para campos de formulário (ex: CPF)
├── toaster.js          # Lógica do toaster de notificação
└── README.md           # Documentação do projeto
```

## Dependências

- **Bootstrap**: Adicionado via CDN.
- **Font Awesome**: Adicionado via CDN.
- **jsPDF**: Adicionado via CDN.
- **FIPE API**: Utilizada para consulta do preço FIPE.

## Exemplo de Uso

```javascript
// Exibir toaster de sucesso
toaster.show('Apólice gerada com sucesso!', 'success');

// Exibir toaster de erro
toaster.show('Preencha todos os campos obrigatórios.', 'error');
```

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

- **Nome**: Nick Moura
- **Email**: [ola@nickmoura.dev]
- **GitHub**: [seu-usuario](https://github.com/nickmoura)