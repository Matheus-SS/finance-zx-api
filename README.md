## NEW

### CRIAR USUARIO
- id (int autoincrement) 
- email (string unique) body
- name (string min 2 max 50) body
- urlAvatar(null | string) aqui previnir que coloque localhost e faca uma requisicao para meu proprio backend
- password (string min 6 max 25) body
- createdAt  (integer unix time) 
- updatedAt (integer unix time)
- settingId (null | integer)

Senha usar bcrypt

### LOGIN 
- email (string) body
- password (string) body

 Retornar access token e objeto com nome, email, urlAvatar\
 Token com 6 horas de duracao\
 Refresh Token

###  CRIAR EXPENSES
PUT - criar quando nao existir e update quando existir - insertOrUpdate
- id (int autoincrement)
- userId(int tabela user) vindo do token
- type (string | credit | debit) body
- option PIX OU DINHEIRO 
- value (decimal, 19,2) body - sempre valor positivo
- description(string min 2 max 30) body
- isPaid(boolean) criado como falso e só pode quando débito
- isReceived(boolean) criado como true e só pode quando crédito
- createdAt (int unix time)
- updatedAt (int unix time)
- date (null | data em string e modificar date time do banco) body
- timezone (string - nome do timezone pego pelo client) body

### CREDIT CARDS
 - id (int autoincrement)
 - nome (ITAU/SANTANDER/BRADESCO/NUBANK/) deixar com USUARIO
 - userId (chave estrangeira)
 - cor do cartao (string)
 - ultimo 4 digitos
 - dueDate (data em string e modificar date time do banco) body

 ### CARDSFUNDS
- id (int autoincrement)
- userId(int tabela user) vindo do token
- creditCardId(int)
- value (decimal, 10,2) body - sempre valor positivo
- description(string min 2 max 30) body
- isPaid(boolean) criado como falso
- createdAt (int unix time)
- updatedAt (int unix time)
- buyDate (null | data em string)
- timezone (string - nome do timezone pego pelo client) body

### LISTAR FUNDOS
usar userId do token e trazer objeto
SELECT DA TABELA FUNDS

### EDITAR E EXCLUIR

### SETTINGS
- id (int autoincrement)
- (qualquer config) Ex.: discord, email, se enviar notificao, qual notificao usar
 

 adicionar despesa
 EX.: compras que acabei de fazer a vista, um lanche, remedio do cachorro, algo no mercado versao a vista
  - valor
  - data que foi adicionado (created_at)
  - data da despesa
  - descricao da despesa
    - Despesas que sao fixas: luz, agua, telefone
      - quando é a primeira parcela - data
      - quantas parcelas - numero de meses 12
      - qual o numero da atual parcela
      - data de vencimento
      - opcao para saber se notifica quando vence essa conta
  - opcao de esta pago - quando for despesa variavel padrao é true, no fixa eu deixo como padrao false

Criar despesa
body
 - value
 - date
 - description
 - type / fixo ou variável
 - first_month_installment/ fixo
 - due_date / fixo
 - notify / fixo true ou false
 - paid true ou false

 banco
 - id
 - user_id
 - date
 - description
 - type
 - quantity_installment
 - current_installment
 - due_date
 - notify
 - paid
 - created_at
 - updated_at

 Insercao de quando for tipo de despesas variaveis
 receber user_id do token do usuario
 Usar campos value, date(data da despesa), description, type(1), notify, paid(1)
Insercao de quando for tipo de despesas fixas
receber user_id do token do usuario
 Usar campos value, date(data da despesa), description, type(2), notify, first_month_installment(data), due_date(data)

------------------------------

  Cartao
  valor
  descricao da despesa
  quantidade de parcela da compra
  campo de quando é a primeira parcela
  data q foi feita a compra
  data de vencimento do cartao
  nome do cartao

