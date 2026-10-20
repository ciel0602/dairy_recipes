require "faker"
Faker::Config.locale = :ja

User.create!(name: "テストユーザー1", email: "test1@example.com", password: "password", confirmed_at: Time.current)


recipe = Recipe.create!(
  user_id: 1,
  title: "カリッとジューシー！基本の鶏の唐揚げ",
  description: "外はカリッと中はジューシー！醤油・しょうが・にんにくの王道味でご飯がすすむ、鶏の唐揚げのレシピです。漬け時間や油温、二度揚げのコツまで押さえた、失敗しない作り方を紹介します。",
  ingredients: [
    { name: "鶏もも肉", amount: 400, unit: "g" },
    { name: "醤油", amount: 2, unit: "大さじ" },
    { name: "酒", amount: 1.5, unit: "大さじ" },
    { name: "しょうが", amount: 15, unit: "g" },
    { name: "にんにく", amount: 1, unit: "かけ" },
    { name: "薄力粉", amount: 3, unit: "大さじ" },
    { name: "片栗粉", amount: 5, unit: "大さじ" }
  ],
  steps: [
    {
      step: 1,
      description: "鶏肉は黄色い脂肪や軟骨を取り除き、はみ出た皮と白い筋は切り落とします。ひと口大に切り、表面の水気をキッチンペーパーでふき取ります。しょうが・にんにくはすりおろします。"
    },
    {
      step: 2,
      description: "ボウルまたはポリ袋に鶏肉と◯を入れ、よくもみ込みます。そのまま室内で20～30分置き、下味をなじませます（※ボウルの場合はラップを密着させる）。"
    },
    {
      step: 3,
      description: "底にたまった漬け汁を切ります。薄力粉を加え、全体にまんべんなくからめます。"
    },
    {
      step: 4,
      description: "バットに片栗粉を広げます。鶏肉をひとつずつ入れ、手で押さえるようにして全体にしっかりまぶします。"
    },
    {
      step: 5,
      description: "フライパンに油を2cm深さ（鶏肉が半分浸かるくらい）まで入れ、中火で中温（160～170度）に熱します。"
    },
    {
      step: 6,
      description: "鶏肉を皮目から入れ、触らずに揚げ焼きにします（※一度に全部入れない）。ふちが薄いきつね色になったら裏返します。全体が薄く色づいたら一度金網に取り出し、順次休ませます。"
    },
    {
      step: 7,
      description: "今度はフライパンを強めの中火で高温（180度）に熱します。鶏肉を戻し入れ、1～2分、衣がカリッとして全体がこんがりと濃い茶色になったら、完成。金網に取り出して油を切ります。"
    }
  ],
  rating: 4,
  version_id: 1
)

recipe.thumbnail.attach(
  io: File.open(
    Rails.root.join("db/seed_images/tori-karaage.webp"),
  ),
  filename: "tori-karaage.webp",
  content_type: "image/webp"
)

tag = Tag.create!(name: "お気に入り", user_id: 1, created_at: Time.current)


TagRelationship.create!(
  recipe: recipe,
  tag: tag,
)

# 100件のレシピのダミーデータを作成
user = User.first

recipe_names = [
  "鶏肉の照り焼き",
  "肉じゃが",
  "親子丼",
  "豚の生姜焼き",
  "鮭の塩焼き",
  "ハンバーグ",
  "野菜炒め",
  "カレーライス",
  "オムライス",
  "麻婆豆腐"
]

ingredients_list = [
  { name: "鶏肉", quantity: "200", unit: "g" },
  { name: "玉ねぎ", quantity: "1", unit: "個" },
  { name: "醤油", quantity: "2", unit: "大さじ" },
  { name: "砂糖", quantity: "1", unit: "小さじ" }
]


# 手順の候補
steps_list = [
  { step: 1, description: "材料を食べやすい大きさに切る" },
  { step: 2, description: "フライパンで材料を炒める" },
  { step: 3, description: "調味料を加えて煮込む" }
]

100.times do |i|
  Recipe.create!(
    user: user,
    title: "#{recipe_names.sample}（デモ#{i + 1}）",
    description: [
      "家庭で作りやすい定番料理です。",
      "普段の夕食におすすめの一品です。",
      "材料をシンプルにした料理です。"
    ].sample,
    ingredients: ingredients_list.sample(3),
    steps: steps_list,
    rating: rand(0..5)
  )
  recipe.update_column(
    :created_at,
    Faker::Time.backward(days: 30)
  )
end
