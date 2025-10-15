<script>
        // Global variables
        let currentSimulator = 'poupanca';

        // Utility functions
        function formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        }

        function formatNumber(value) {
            return new Intl.NumberFormat('pt-BR').format(value);
        }

        // Simulator switching
        function switchSimulator(type) {
            // Hide all simulators
            document.getElementById('simulator-poupanca').classList.add('hidden');
            document.getElementById('simulator-fiis').classList.add('hidden');
            document.getElementById('simulator-credito').classList.add('hidden');
            
            // Remove active class from all tabs
            document.getElementById('tab-poupanca').className = 'px-6 py-3 rounded-lg font-semibold transition-all tab-inactive';
            document.getElementById('tab-fiis').className = 'px-6 py-3 rounded-lg font-semibold transition-all tab-inactive';
            document.getElementById('tab-credito').className = 'px-6 py-3 rounded-lg font-semibold transition-all tab-inactive';
            
            // Show selected simulator and activate tab
            document.getElementById('simulator-' + type).classList.remove('hidden');
            document.getElementById('tab-' + type).className = 'px-6 py-3 rounded-lg font-semibold transition-all tab-active';
            
            currentSimulator = type;
            updateSimulator(type);
        }

        function openSimulator(type) {
            document.getElementById('simuladores').scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => switchSimulator(type), 500);
        }

        function scrollToSimulators() {
            document.getElementById('simuladores').scrollIntoView({ behavior: 'smooth' });
        }

        // Poupança simulator
        function updatePoupancaSimulator() {
            const inicial = parseFloat(document.getElementById('poupanca-inicial').value) || 0;
            const mensal = parseFloat(document.getElementById('poupanca-mensal').value) || 0;
            const periodo = parseInt(document.getElementById('poupanca-periodo').value);
            const taxa = parseFloat(document.getElementById('poupanca-taxa').value) / 100;
            
            document.getElementById('poupanca-periodo-value').textContent = periodo + ' meses';
            
            const taxaMensal = taxa / 12;
            let valorFinal = inicial;
            let totalInvestido = inicial;
            
            // Cálculo com aportes mensais
            for (let i = 0; i < periodo; i++) {
                valorFinal = valorFinal * (1 + taxaMensal) + mensal;
                if (i < periodo - 1) totalInvestido += mensal;
            }
            
            const rendimento = valorFinal - totalInvestido;
            
            // Comparação com poupança tradicional (6.17% a.a.)
            const taxaTradMensal = 0.0617 / 12;
            let valorTrad = inicial;
            for (let i = 0; i < periodo; i++) {
                valorTrad = valorTrad * (1 + taxaTradMensal) + mensal;
            }
            
            const diferenca = valorFinal - valorTrad;
            
            document.getElementById('poupanca-investido').textContent = formatCurrency(totalInvestido);
            document.getElementById('poupanca-rendimento').textContent = formatCurrency(rendimento);
            document.getElementById('poupanca-final').textContent = formatCurrency(valorFinal);
            document.getElementById('poupanca-tradicional').textContent = formatCurrency(valorTrad);
            document.getElementById('poupanca-diferenca').textContent = formatCurrency(diferenca);
        }

        // FIIs simulator
        function updateFiisSimulator() {
            const inicial = parseFloat(document.getElementById('fiis-inicial').value) || 0;
            const mensal = parseFloat(document.getElementById('fiis-mensal').value) || 0;
            const periodo = parseInt(document.getElementById('fiis-periodo').value);
            const yield_ = parseFloat(document.getElementById('fiis-yield').value) / 100;
            const valorizacao = parseFloat(document.getElementById('fiis-valorizacao').value) / 100;
            
            document.getElementById('fiis-periodo-value').textContent = periodo + ' anos';
            
            const meses = periodo * 12;
            const yieldMensal = yield_ / 12;
            const valorizacaoMensal = valorizacao / 12;
            
            let patrimonio = inicial;
            let totalInvestido = inicial;
            let dividendosAcumulados = 0;
            
            for (let i = 0; i < meses; i++) {
                // Dividendos do mês
                const dividendoMes = patrimonio * yieldMensal;
                dividendosAcumulados += dividendoMes;
                
                // Valorização das cotas
                patrimonio *= (1 + valorizacaoMensal);
                
                // Aporte mensal (exceto no primeiro mês)
                if (i < meses - 1) {
                    patrimonio += mensal;
                    totalInvestido += mensal;
                }
            }
            
            const valorizacaoTotal = patrimonio - totalInvestido;
            const patrimonioTotal = patrimonio + dividendosAcumulados;
            const rendaMensal = patrimonioTotal * yieldMensal;
            
            document.getElementById('fiis-investido').textContent = formatCurrency(totalInvestido);
            document.getElementById('fiis-dividendos').textContent = formatCurrency(dividendosAcumulados);
            document.getElementById('fiis-valorizacao-total').textContent = formatCurrency(valorizacaoTotal);
            document.getElementById('fiis-total').textContent = formatCurrency(patrimonioTotal);
            document.getElementById('fiis-renda-mensal').textContent = formatCurrency(rendaMensal);
        }

        // Crédito simulator
        function updateCreditoSimulator() {
            const valor = parseInt(document.getElementById('credito-valor').value);
            const prazo = parseInt(document.getElementById('credito-prazo').value);
            const renda = parseFloat(document.getElementById('credito-renda').value) || 0;
            const taxa = parseFloat(document.getElementById('credito-finalidade').value) / 100;
            
            document.getElementById('credito-valor-display').textContent = formatCurrency(valor);
            document.getElementById('credito-prazo-display').textContent = prazo + ' meses';
            
            // Cálculo da parcela
            const parcela = (valor * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
            const comprometimento = (parcela / renda) * 100;
            
            // Score baseado na renda e comprometimento
            let score = 600;
            if (renda >= 10000) score += 100;
            else if (renda >= 5000) score += 50;
            if (comprometimento <= 20) score += 100;
            else if (comprometimento <= 30) score += 50;
            
            const cetAnual = ((Math.pow(1 + taxa, 12) - 1) * 100).toFixed(1);
            
            document.getElementById('credito-valor-result').textContent = formatCurrency(valor);
            document.getElementById('credito-taxa-result').textContent = (taxa * 100).toFixed(2) + '% a.m.';
            document.getElementById('credito-parcelas-result').textContent = prazo + 'x';
            document.getElementById('credito-cet').textContent = cetAnual + '% a.a.';
            document.getElementById('credito-parcela-result').textContent = formatCurrency(parcela);
            
            document.getElementById('score-value').textContent = score;
            document.getElementById('score-bar').style.width = (score / 1000 * 100) + '%';
            
            document.getElementById('comprometimento-value').textContent = comprometimento.toFixed(0) + '%';
            document.getElementById('comprometimento-bar').style.width = Math.min(comprometimento, 100) + '%';
            
            // Cor do comprometimento
            const compBar = document.getElementById('comprometimento-bar');
            if (comprometimento <= 30) {
                compBar.className = 'bg-green-500 h-2 rounded-full';
            } else if (comprometimento <= 50) {
                compBar.className = 'bg-yellow-500 h-2 rounded-full';
            } else {
                compBar.className = 'bg-red-500 h-2 rounded-full';
            }
        }

        // Update simulator based on type
        function updateSimulator(type) {
            switch(type) {
                case 'poupanca':
                    updatePoupancaSimulator();
                    break;
                case 'fiis':
                    updateFiisSimulator();
                    break;
                case 'credito':
                    updateCreditoSimulator();
                    break;
            }
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Poupança listeners
            document.getElementById('poupanca-inicial').addEventListener('input', updatePoupancaSimulator);
            document.getElementById('poupanca-mensal').addEventListener('input', updatePoupancaSimulator);
            document.getElementById('poupanca-periodo').addEventListener('input', updatePoupancaSimulator);
            document.getElementById('poupanca-taxa').addEventListener('change', updatePoupancaSimulator);
            
            // FIIs listeners
            document.getElementById('fiis-inicial').addEventListener('input', updateFiisSimulator);
            document.getElementById('fiis-mensal').addEventListener('input', updateFiisSimulator);
            document.getElementById('fiis-periodo').addEventListener('input', updateFiisSimulator);
            document.getElementById('fiis-yield').addEventListener('change', updateFiisSimulator);
            document.getElementById('fiis-valorizacao').addEventListener('change', updateFiisSimulator);
            
            // Crédito listeners
            document.getElementById('credito-valor').addEventListener('input', updateCreditoSimulator);
            document.getElementById('credito-prazo').addEventListener('input', updateCreditoSimulator);
            document.getElementById('credito-renda').addEventListener('input', updateCreditoSimulator);
            document.getElementById('credito-finalidade').addEventListener('change', updateCreditoSimulator);
            
            // Initialize simulators
            updatePoupancaSimulator();
            updateFiisSimulator();
            updateCreditoSimulator();
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'974dc6eaa7ee3729',t:'MTc1NjE1MzA4OS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
