const iptBase = document.getElementById('iptBase');
        const botao = document.getElementById('obter');
        const opcoes = document.getElementById('opcoes');
        const opcoes1 = document.getElementById('opcoes1');
        const spanTaxa = document.getElementById('taxaText');
        const convertBtn = document.getElementById('converter');
        const spanConv = document.getElementById('convertText');

        const apiURL = 'https://api.exchangeratesapi.io/v1/latest?access_key=4e841d0b9308ef8107a387df1c386883';
        fetch(apiURL)
            .then(response => {
                if(!response.ok){
                    throw new Error('A solicitação não foi bem-sucedida');
                }
                return response.json();
            })
            .then(data => {
                const taxas = data.rates;
                for (let moeda in taxas) {
                    const opcao = document.createElement('option');
                    const opcao1= document.createElement('option');
                    opcao.value = taxas[moeda];
                    opcao.title = moeda;
                    opcao.innerText = `${moeda} - ${taxas[moeda]}`;
                    opcao1.value = taxas[moeda];
                    opcao1.title = moeda;
                    opcao1.innerText = `${moeda} - ${taxas[moeda]}`;
                    opcoes.appendChild(opcao);
                    opcoes1.appendChild(opcao1);
                }

                function obterCotacaoMoeda(){
                    return new Promise((resolve) => {
                        const taxa = parseFloat(opcoes1.value)/parseFloat(opcoes.value);
                        const moeda = opcoes1.querySelectorAll(`option`);
                        const moeda1 = opcoes.querySelectorAll(`option`);
                        const nomeMoeda = moeda[opcoes1.selectedIndex].getAttribute('title');
                        const nomeMoeda1 = moeda[opcoes.selectedIndex].getAttribute('title');
        
                        spanTaxa.innerText = `A taxa de câmbio é de ${taxa.toFixed(2)} (Valor de 1 ${nomeMoeda1} em ${nomeMoeda})`;

                        resolve(taxa);
                    })
                }

                async function exemploConversaoMoeda(){
                    if(iptBase.value == ''){
                        throw "Campo de valor vazio!"
                    }
                    try{
                        const taxa = await obterCotacaoMoeda();
                        const convertido = taxa * (iptBase.value);
                        const moeda = opcoes1.querySelectorAll(`option`);
                        const nomeMoeda = moeda[opcoes1.selectedIndex].getAttribute('title');

                        spanConv.innerText = `O valor convertido é de ${convertido.toFixed(2)} em ${nomeMoeda}`;
                    }
                    catch(erro){
                        console.error('Ocorreu um erro: ',erro);
                    }
                }
                
                convertBtn.addEventListener('click',exemploConversaoMoeda);
                botao.addEventListener('click',obterCotacaoMoeda);
            })
            .catch(error => {
                alert('Erro: '+error.message);
            })



    