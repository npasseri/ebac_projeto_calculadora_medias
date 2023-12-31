const form = document.getElementById('form-atividade')
const img_aprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />'
const img_reprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />'
const atividades = []
const notas = []
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = parseFloat(prompt('Digite a nota mínima:'))

// Variável para conter todas as linhas (atividades) que forem adicionadas
let linhas = ''

form.addEventListener('submit', function(e) {
    e.preventDefault()

    adicionaLinha()
    atualizaTabela()
    atualizaMediaFinal()
})

function adicionaLinha () {
    const inputNomeAtividade = document.getElementById('nome-atividade')
    const inputNotaAtividade = document.getElementById('nota-atividade')

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida.`)
    } else {
        atividades.push(inputNomeAtividade.value)
        notas.push(parseFloat(inputNotaAtividade.value))
    
        // Contrução na nova linha para inclusão na tabela
        let linha = '<tr>'
        linha += `<td>${inputNomeAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? img_aprovado : img_reprovado}</td>`
        linha += '</tr>'
    
        // Adição da linha no conjunto total
        linhas += linha
    }

    inputNomeAtividade.value = ''
    inputNotaAtividade.value = ''
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = linhas // inserir conteúdo dentro de tag
}

function atualizaMediaFinal () {
    const mediaFinal = calculaMediaFinal()

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2)
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado
    console.log(media)
}

function calculaMediaFinal() {
    let somaDasNotas = 0
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]
    }
    return somaDasNotas / notas.length
}