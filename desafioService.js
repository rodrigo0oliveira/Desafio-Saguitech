const form = document.getElementById("form");
const notaFiscal = document.getElementById("nota-fiscal");
const buttonNovoCalculo = document.getElementById("novo-calculo");

const calculosListas = [];

form.addEventListener('submit',async function (event) {
    event.preventDefault();

    const valorVenda = document.getElementById("valor-venda").value;
    const itensArray  = document.getElementById("itens").value;
    const irpf  = document.getElementById("irpf").value;
    const pis  = document.getElementById("pis").value;
    const cofins  = document.getElementById("cofins").value;
    const inss  = document.getElementById("inss").value;
    const issqn  = document.getElementById("issqn").value;


    formataNotaFiscal();

    var arrayImposto = [irpf,pis,cofins,inss,issqn];

    var resultado = calculaValorFinalAposImpostos(valorVenda,arrayImposto);
    formataDadosIniciais(arrayImposto,valorVenda);
    formataDadosFinais(resultado,itensArray);
});

buttonNovoCalculo.addEventListener('click',function(){
    form.style.display = "block";
    notaFiscal.style.display = "none";
})


function formataNotaFiscal(){
    form.style.display = "none";
    notaFiscal.style.display = "block";
}


function calculaValorFinalAposImpostos(vendaInicial,array){
    var resultado = vendaInicial;
    
    array.forEach(imposto=>{
        resultado -= resultado * imposto/100;
        calculosListas.push(resultado.toFixed(2));
    })
    return resultado;
}


function formataDadosIniciais(impostos,valorInicial){

    var valorVenda = document.getElementById("nota-valor");
    valorVenda.textContent = "Valor da Venda = "+valorInicial;
    
    const impostosArray = [   
        document.getElementById("nota-irpf"),
        document.getElementById("nota-pis"),
        document.getElementById("nota-cofins"),
        document.getElementById("nota-inss"),
        document.getElementById("nota-issqn"),
    ];

    limparDadosIniciais(impostosArray);

    for(var i = 0;i<impostosArray.length;i++){
        impostosArray[i].textContent += impostos[i]+"%";
    }
}


function formataDadosFinais(resultadoFinal,itensArray){
    
    var itens = document.getElementById("nota-itens");
    itens.textContent = "Itens : ";

    const subtotais = [
        document.getElementById("subtotal1"),
        document.getElementById("subtotal2"),
        document.getElementById("subtotal3"),
        document.getElementById("subtotal4"),
        document.getElementById("subtotal5"),
        document.getElementById("resultado"),
    ];

    limparNotaFiscal(subtotais);

    itens.textContent += itensArray;

    for(var i = 0;i<calculosListas.length;i++){
        subtotais[i].textContent += calculosListas[i];
    }
    resultado.textContent += resultadoFinal.toFixed(2);
}

function limparNotaFiscal(arraySubtotais){
    var string = "Subtotal (após imposto): R$";
    for(var i = 0;i<arraySubtotais.length;i++){
        arraySubtotais[i].textContent = string;
    }
}

function limparDadosIniciais(impostosArray){
    var impostos = ["IRPF","PIS","COFINS","INSS","ISSQN"];
    for(var i = 0;i<impostos.length;i++){
       impostosArray[i].textContent = impostos[i]+" = ";
    }
}

