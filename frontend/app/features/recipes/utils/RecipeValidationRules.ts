const RecipeValidationRules = {
  title: {
    required: '料理名は入力必須です。'
  },
  amount :{
    min: {
      value: 0.001,
      message: "分量は0より大きい値を入力してください。",
    },
  }
}
export default RecipeValidationRules;