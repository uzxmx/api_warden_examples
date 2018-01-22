Rails.application.routes.draw do
  namespace :api do
    controller :users do
      post :sign_in
      post :refresh_token
    end

    controller :resources do
      get :protected_resource
    end
  end

  get '/(*any)' => 'spa_entries#index'
end
