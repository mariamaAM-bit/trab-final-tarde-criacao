  # Diagramas
Teste o código dos diagramas em [https://mermaid.live](https://mermaid.live)

## De classe
<img width="2597" height="1798" alt="image" src="https://github.com/user-attachments/assets/de4c067e-0fc2-4c3a-8c8d-03a2ea4e441b" />

```
classDiagram
    class Usuario {
        +int idUsuario
        +string nome
        +string email
        +string senha
        +string cpf
        +Date dataCadastro
        +boolean autenticar(email, senha)
        +void atualizarPerfil()
    }
    class Conta {
        +int idConta
        +string tipoConta
        +double saldo
        +double limiteCredito
        +void depositar(valor)
        +void sacar(valor)
        +void transferir(destino, valor)
    }
    class Transacao {
        +int idTransacao
        +string tipo
        +double valor
        +Date data
        +string descricao
        +void registrar()
    }
    class Investimento {
        +int idInvestimento
        +string tipoInvestimento
        +double valorAplicado
        +double rentabilidade
        +Date dataAplicacao
        +double calcularRendimento()
        +void resgatar(valor)
    }
    class Poupanca {
        +double taxaMensal
        +double calcularRendimentoMensal()
    }
    class FundoImobiliario {
        +string codigoFundo
        +double valorCota
        +int quantidadeCotas
        +double calcularValorTotal()
        +void atualizarCotas(qtd)
    }
    class Credito {
        +int idCredito
        +double valor
        +double taxaJuros
        +int parcelas
        +Date dataContratacao
        +double calcularParcela()
        +void quitar()
    }
    class RelatorioFinanceiro {
        +Date periodoInicio
        +Date periodoFim
        +double saldoFinal
        +double totalInvestido
        +double totalCredito
        +string gerarResumo()
        +void exportarPDF()
    }
    Usuario "1" --> "*" Conta : tem
    Usuario "1" --> "*" Investimento : possui
    Conta "*" --> "1" Transacao : possui
    Transacao "*" --> "1" Conta : registrada em
    Investimento "*" --> "1" Usuario : possui
    Investimento <|-- Poupanca : é um
    Investimento <|-- FundoImobiliario : é um
    Conta "1" --> "*" Credito : pode ter
    Usuario "1" --> "1" RelatorioFinanceiro : gera

```
## De caso de uso
<img width="2456" height="870" alt="image" src="https://github.com/user-attachments/assets/3ac16cb4-1c29-451f-848f-5f849fa10401" />


```
 
flowchart TD

    subgraph "🧞‍♂️Ator"
      Usuario(["👤Usuário"])
    end
    subgraph "Casos de Uso"
      CU1(["Gerenciar Conta"])
      CU2(["Realizar Transação"])
      CU3(["Aplicar/Resgatar Investimento"])
      CU4(["Solicitar Crédito"])
      CU5(["Gerar Relatório Financeiro"])
      CU6(["Aplicar em Poupança"])
      CU7(["Aplicar em Fundo Imobiliário"])
    end

    Usuario -- "Acessa" --> CU1
    Usuario -- "Realiza" --> CU2
    Usuario -- "Investe em" --> CU3
    Usuario -- "Solicita" --> CU4
    Usuario -- "Consulta" --> CU5
    CU3 -- "Inclui" --> CU6
    CU3 -- "Inclui" --> CU7
    
```
