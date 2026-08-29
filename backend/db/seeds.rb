# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#
User.create!(name: "テストユーザー1", email: "test1@example.com", password: "password", confirmed_at: Time.current)

Recipe.create!(
  user_id: 1, title: "カリッとジューシー！基本の鶏の唐揚げ",
  description: "外はカリッと中はジューシー！醤油・しょうが・にんにくの王道味でご飯がすすむ、鶏の唐揚げのレシピです。漬け時間や油温、二度揚げのコツまで押さえた、失敗しない作り方を紹介します。",
  current_ingredients: [
    { name: "鶏もも肉", amount: 400, unit: "g" },
    { name: "醤油", amount: 2, unit: "大さじ" },
    { name: "酒", amount: 1.5, unit: "大さじ" },
    { name: "しょうが", amount: 15, unit: "g" },
    { name: "にんにく", amount: 1, unit: "かけ" },
    { name: "薄力粉", amount: 3, unit: "大さじ" },
    { name: "片栗粉", amount: 5, unit: "大さじ" }
  ],
  current_steps: [
    {
      title: "下ごしらえ",
      steps: [
        {
          step: 1,
          description: "鶏肉は黄色い脂肪や軟骨を取り除き、はみ出た皮と白い筋は切り落とします。ひと口大に切り、表面の水気をキッチンペーパーでふき取ります。しょうが・にんにくはすりおろします。"
        },
        {
          step: 2,
          description: "ボウルまたはポリ袋に鶏肉と◯を入れ、よくもみ込みます。そのまま室内で20～30分置き、下味をなじませます（※ボウルの場合はラップを密着させる）。"
        }
      ]
    },
    {
      title: "衣をつける",
      steps: [
        {
          step: 3,
          description: "底にたまった漬け汁を切ります。薄力粉を加え、全体にまんべんなくからめます。"
        },
        {
          step: 4,
          description: "バットに片栗粉を広げます。鶏肉をひとつずつ入れ、手で押さえるようにして全体にしっかりまぶします。"
        }
    ] },
    {
      title: "揚げ焼き",
      steps: [
        {
          step: 5,
          description: "フライパンに油を2cm深さ（鶏肉が半分浸かるくらい）まで入れ、中火で中温（160～170度）に熱します。"
        },
        {
          step: 6,
          description: "鶏肉を皮目から入れ、触らずに揚げ焼きにします（※一度に全部入れない）。ふちが薄いきつね色になったら裏返します。全体が薄く色づいたら一度金網に取り出し、順次休ませます。"
        }
    ] },
    {
      title: "二度あげ",
      steps: [
        {
          step: 7,
          description: "今度はフライパンを強めの中火で高温（180度）に熱します。鶏肉を戻し入れ、1～2分、衣がカリッとして全体がこんがりと濃い茶色になったら、完成。金網に取り出して油を切ります。"
        }
    ] }
  ],
  current_rating: 5,
  current_version_id: 1
)
