## NEW

### CRIAR USUARIO
- id (int autoincrement) 
- email (string unique) body
- name (string min 2 max 50) body
- urlAvatar(null | string)
- password (string min 6 max 25) body
- createdAt  (timestamp)
- updatedAt (timestamp)

Senha usar bcrypt

### LOGIN 
- email (string) body
- password (string) body

 Retornar access token e objeto com nome, email, urlAvatar\
 Token com 6 horas de duracao\
 Refresh Token

###  