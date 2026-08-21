
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins Settings.front_domain

    resource "*",
            headers: :any,
            methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
            expose: [ 'access-token', 'client', 'uid' ]
  end
end
