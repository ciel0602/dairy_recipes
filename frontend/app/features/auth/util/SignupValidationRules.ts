const SignupValidationRules = {
  name: {
    required: 'ユーザー名を入力してください。',
  },
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
    minLength:{
      value:8,
      message:'パシワードは8文字以上で入力してください。'
    },
    maxLength:{
      value:32,
      message:'パスワードは32文字以内で入力してください。'
    }
  },
}


export default SignupValidationRules