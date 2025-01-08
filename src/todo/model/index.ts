import { DataTypes, Model } from 'sequelize';
import db from '../../config/database.config';

interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export class TodoInstance extends Model<ITodo> {}

TodoInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'todos',
  }
);
