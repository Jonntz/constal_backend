import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const produto = sequelize.define(
    'produto',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.TEXT,
      },
      descricao: {
        type: DataTypes.TEXT,
      },
      marca: {
        type: DataTypes.TEXT,
      },
      modelo: {
        type: DataTypes.TEXT,
      },
      caracteristicas: {
        type: DataTypes.TEXT,
      },
      codigo: {
        type: DataTypes.TEXT,
      },
      preco: {
        type: DataTypes.DECIMAL,
      },
      somatoriaAvaliacoes: {
        type: DataTypes.INTEGER,
      },
      quantidadeAvaliacoes: {
        type: DataTypes.INTEGER,
      },
      volumeVendas: {
        type: DataTypes.INTEGER,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  produto.associate = (models) => {
    models.produto.belongsTo(models.empresa, {
      as: 'empresa',
      constraints: false,
    });

    models.produto.belongsTo(models.categoria, {
      as: 'categoria',
      constraints: false,
    });

    models.produto.hasMany(models.file, {
      as: 'fotos',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.produto.getTableName(),
        belongsToColumn: 'fotos',
      },
    });
    
    models.produto.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.produto.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.produto.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return produto;
}
