class Api::V1::MealPlansController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    meal_plans = current_user.meal_plans.all

    render json:
      meal_plans.map { |meal_plan|
      recipe = meal_plan.recipe
        {
          id: meal_plan.id,
          planned_date: meal_plan.planned_date,
          recipe: {
            id: meal_plan.recipe.id,
            title: meal_plan.recipe.title,
            thumbnail_url: meal_plan.recipe.thumbnail.attached? ? url_for(recipe.thumbnail) : nil,
            rating: meal_plan.recipe.rating,
            created_at: meal_plan.recipe.created_at
          }
        }
      }
  end

  def create
    recipe_ids = meal_plan_params[:recipe_ids]
    planned_date = meal_plan_params[:planned_date]
    # ログイン中のユーザーのレシピ以外にはアクセスできないようにする
    recipes = current_user.recipes.where(id: recipe_ids)
    unless recipes.size == recipe_ids.size
      return render json: {
        errors: [ "指定されたレシピが見つかりません。" ],
        status: :unprocessable_content
      }
    end

    meal_plans = recipes.map do |recipe|
      current_user.meal_plans.build(
        recipe: recipe,
        planned_date: planned_date,
        status: "planned"
      )
    end

    # 一つでもエラーがあれば、ロールバックしてキャンセルする
    MealPlan.transaction do
      meal_plans.each(&:save!)
    end

    render json: {
      data: meal_plans.as_json(only: [ :id, :recipe_id, :planned_date, :status ]),
      message: "success"
    },
    status: :created
  end

  private
  def meal_plan_params
    params.permit(:planned_date, recipe_ids: [])
  end
end
