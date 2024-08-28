import { Sequelize } from "sequelize";
import sequelize from "../conf/db";
import { DataTypes } from "sequelize";
import Question from "./question";
import Student from "./student";
const Score  = sequelize.define('Score', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

    question_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Question,
            key:id,
        }
    },

    student_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Student,
            key:id,
        }
    },

    percentage:{
        type:DataTypes.INTEGER,
        allowNull:false
    },


    passed_testcases:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
{
    timestamps: true, 
}
);

export default Score;


