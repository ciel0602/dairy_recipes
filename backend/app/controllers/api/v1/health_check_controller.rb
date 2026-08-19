class Api::V1::HealthCheckController < ApplicationController
  def index
    render json: { message: "ヘルスチェック　OK！" }, status: :ok
  end
end
