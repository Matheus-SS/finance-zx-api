import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../users/model/users.model';
import { SessionModel } from '../sessions/model/sessions.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'phoenix',
      });
      sequelize.addModels([UserModel, SessionModel]);
      sequelize.authenticate().then(() => {
        console.log("Conexao com o banco de dados feita com sucesso")
      }).catch((err) => {
        console.log("Erro ao logar no banco de dados", err)
      })
      return sequelize;
    },
  },
];