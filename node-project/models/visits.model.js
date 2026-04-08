<<<<<<< HEAD
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define(
    'Visit',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      visit_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      appointment_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      case_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      patient_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      doctor_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      visit_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      visit_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },

      visit_duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      diagnosis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      diagnosis_codes: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      treatment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      treatment_plan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      prescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      prescription_documents: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      vital_signs: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      symptoms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      follow_up_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      follow_up_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },

      referral_made: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      referral_to: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      visit_status: {
        type: DataTypes.ENUM(
          'Draft',
          'Completed',
          'Cancelled',
          'Billed'
        ),
        defaultValue: 'Draft',
      },

      completed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'visits',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  Visit.associate = function (models) {
    Visit.belongsTo(models.Appointment, {
      foreignKey: 'appointment_id',
      onDelete: 'CASCADE',
    });

    Visit.belongsTo(models.Case, {
      foreignKey: 'case_id',
      onDelete: 'CASCADE',
    });

    Visit.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      onDelete: 'CASCADE',
    });

    Visit.belongsTo(models.User, {
      as: 'doctor',
      foreignKey: 'doctor_id',
      onDelete: 'CASCADE',
    });
  };

=======
// models/visit.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    static associate(models) {
      this.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
      this.belongsTo(models.Patient, { foreignKey: 'patient_id' });
      this.belongsTo(models.User, { as: 'doctor', foreignKey: 'doctor_id' });
    }
  }

  Visit.init(
    {
      visit_number: { type: DataTypes.STRING, unique: true },
      visit_date: DataTypes.DATEONLY,
      visit_time: DataTypes.TIME,
      diagnosis: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Visit',
      tableName: 'visits',
      paranoid: true,
      underscored: true,
    }
  );

>>>>>>> b51cdb19601096eab18448278d5dbdcfa2a545b3
  return Visit;
};