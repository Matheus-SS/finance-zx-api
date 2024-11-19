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
 