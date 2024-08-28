import sequelize from "../conf/db";
import Question from "./question";
import Batch from "./batch";
import { DataTypes } from "sequelize";


//this communicates with batches tables where batches and colleges are linked with a foreign key
const QuestionCollege = sequelize.define('question_college',{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
    },

    question_id: {
        type: DataTypes.UUID,
        references: {
          model: Question, 
          key: 'id',
        },
        allowNull: false,
      },
    
    batch_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Batch,
            key:'id'
        },
        allowNull:false,
    }
});