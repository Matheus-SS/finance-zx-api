import { Column, PrimaryKey, Table, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'tbl_sessions',
  timestamps: false
})
export class SessionModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  expires_in: number;

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