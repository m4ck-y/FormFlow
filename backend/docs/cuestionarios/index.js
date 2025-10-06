//CRAFFT
//IPAQ




//condition

//PHQ9
//condition question number 10
const condition_phq9_my_str = "all(["
  + "(question.id == 1 and question.value > 0), "
  + "(question.id == 2 and question.value > 0), "
  + "(question.id == 3 and question.value > 0), "
  + "(question.id == 4 and question.value > 0), "
  + "(question.id == 5 and question.value > 0), "
  + "(question.id == 6 and question.value > 0), "
  + "(question.id == 7 and question.value > 0), "
  + "(question.id == 8 and question.value > 0), "
  + "(question.id == 9 and question.value > 0)"
  + "])";

const condition_phq9_my_str_with_selector = "all([selector(question, id, in[1,2,3,4,5,6,7,8,9]), value > 0])";
const condition_phq9_pandas = df_questions[(df_questions['id'].isin([1, 2, 3, 4, 5, 6, 7, 8, 9])) & (df_questions['value'] > 0)]
const condition_phq9_sql = `SELECT EXISTS (
    SELECT 1
    FROM question
    WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9)
      AND value > 0
) AS cumple_condicion;`
