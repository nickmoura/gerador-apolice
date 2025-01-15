// masks.js - Arquivo para aplicar máscaras nos campos de formulário

// Função para aplicar máscara de CPF e limitar a 11 números
function maskCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo que não é dígito
    cpf = cpf.substring(0, 11); // Limita a 11 números
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os 3 primeiros dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto após os 6 primeiros dígitos
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen antes dos últimos 2 dígitos
    return cpf;
}

// Aplica a máscara de CPF ao campo correspondente
document.getElementById('cpf').addEventListener('input', function (e) {
    e.target.value = maskCPF(e.target.value);
});