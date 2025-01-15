// toaster.js - Arquivo para gerenciar o toaster de validação

class Toaster {
    constructor() {
        this.toasterElement = document.getElementById('toaster');
        this.timeoutId = null; // Armazena o ID do timeout para controle
        this.isDragging = false; // Controla se o toaster está sendo arrastado
        this.startX = 0; // Posição inicial do arrasto
        this.initialRight = 0; // Posição inicial do toaster

        // Adiciona o botão de fechar
        this.closeBtn = document.createElement('button');
        this.closeBtn.className = 'close-btn';
        this.closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // Ícone de "X"
        this.closeBtn.addEventListener('click', () => this.hide());
        this.toasterElement.appendChild(this.closeBtn);

        // Adiciona eventos de arrastar
        this.toasterElement.addEventListener('mousedown', this.startDrag.bind(this));
        this.toasterElement.addEventListener('mousemove', this.drag.bind(this));
        this.toasterElement.addEventListener('mouseup', this.endDrag.bind(this));
        this.toasterElement.addEventListener('mouseleave', this.endDrag.bind(this));
    }

    // Exibe uma mensagem no toaster
    show(message, type = 'success', duration = 3000) {
        // Limpa o timeout anterior, se houver
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        // Reseta o toaster para o estado inicial
        this.toasterElement.style.transition = 'right 0.5s ease, opacity 0.3s ease, visibility 0.3s ease';
        this.toasterElement.style.right = '20px'; // Posição inicial
        this.toasterElement.style.opacity = '1';
        this.toasterElement.style.visibility = 'visible';

        // Define o ícone com base no tipo (sucesso ou erro)
        const icon = type === 'success' 
            ? '<i class="fa-solid fa-check icon"></i>' 
            : '<i class="fa-solid fa-circle-exclamation icon"></i>';

        // Define o conteúdo do toaster
        this.toasterElement.innerHTML = `
            ${icon}
            <div>${message}</div>
            <div class="timebar"></div>
        `;
        this.toasterElement.className = `toaster ${type}`;

        // Adiciona o botão de fechar novamente (pois o innerHTML substituiu o conteúdo)
        this.toasterElement.appendChild(this.closeBtn);

        // Mostra o toaster com animação
        this.toasterElement.classList.add('show');

        // Oculta o toaster após o tempo especificado
        this.timeoutId = setTimeout(() => {
            if (!this.isDragging) { // Só fecha se não estiver sendo arrastado
                this.hide();
            }
        }, duration);
    }

    // Oculta o toaster
    hide() {
        this.toasterElement.style.transition = 'right 0.3s ease'; // Adiciona transição suave
        this.toasterElement.style.right = '-100%'; // Move o toaster para fora da tela
        setTimeout(() => {
            this.toasterElement.classList.remove('show');
            this.timeoutId = null;
        }, 300); // Tempo da transição
    }

    // Inicia o arrasto
    startDrag(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.initialRight = parseFloat(window.getComputedStyle(this.toasterElement).right);
        this.toasterElement.style.transition = 'none'; // Remove a transição durante o arrasto
    }

    // Arrasta o toaster
    drag(e) {
        if (this.isDragging) {
            const deltaX = e.clientX - this.startX; // Calcula o deslocamento horizontal
            const newRight = this.initialRight - deltaX;

            // Move o toaster para a direita
            this.toasterElement.style.right = `${newRight}px`;

            // Fecha o toaster se ele for arrastado para fora da tela
            if (newRight < -this.toasterElement.offsetWidth / 2) {
                this.hide();
            }
        }
    }

    // Finaliza o arrasto
    endDrag() {
        this.isDragging = false;

        // Retorna o toaster para a posição inicial se não foi fechado
        if (parseFloat(window.getComputedStyle(this.toasterElement).right) >= 0) {
            this.toasterElement.style.transition = 'right 0.3s ease'; // Adiciona transição suave
            this.toasterElement.style.right = '20px'; // Retorna à posição inicial
        }
    }
}

// Exporta uma instância do Toaster para uso global
const toaster = new Toaster();