'use strict';

module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define(
    'Case',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      case_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      patient_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      category_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      practice_location_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      purpose_of_visit: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      case_type: {
        type: DataTypes.ENUM(
          'Initial Consultation',
          'Follow-up',
          'Emergency',
          'Chronic Care',
          'Preventive Care',
          'Pre-surgical',
          'Post-surgical'
        ),
        allowNull: false,
      },

      priority: {
        type: DataTypes.ENUM('Low', 'Normal', 'High', 'Urgent'),
        defaultValue: 'Normal',
      },

      case_status: {
        type: DataTypes.ENUM(
          'Active',
          'On Hold',
          'Closed',
          'Transferred',
          'Cancelled'
        ),
        defaultValue: 'Active',
      },

      date_of_accident: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      insurance_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      firm_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      referred_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      referred_doctor_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      opening_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      closing_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      clinical_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'cases',
      timestamps: true,
      paranoid: true, // enables soft deletes (deletedAt)
      underscored: true,
    }
  );

  Case.associate = function (models) {
    Case.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      onDelete: 'CASCADE',
    });

    Case.belongsTo(models.Category, {
      foreignKey: 'category_id',
      onDelete: 'RESTRICT',
    });

    Case.belongsTo(models.PracticeLocation, {
      foreignKey: 'practice_location_id',
    });

    Case.belongsTo(models.Insurance, {
      foreignKey: 'insurance_id',
      onDelete: 'SET NULL',
    });

    Case.belongsTo(models.Firm, {
      foreignKey: 'firm_id',
      onDelete: 'SET NULL',
    });
  };

  return Case;
};