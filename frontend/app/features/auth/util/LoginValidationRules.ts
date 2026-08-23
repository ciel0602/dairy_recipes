const loginValidationRules = {
    email: {
    required: 'メールアドレスを入力してください。',
    pattern: {
      value:
        /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
      message: '正しい形式のメールアドレスを入力してください。',
    },
  },
  password: {
    required: 'パスワードを入力してください。',
}
}
export default loginValidationRules