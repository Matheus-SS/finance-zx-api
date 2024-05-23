import { AutoIncrement, Column, PrimaryKey, Table, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'tbl_users',
  timestamps: false
})
export class UserModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  created_at: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  updated_at: number;
}