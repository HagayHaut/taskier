Rails.application.routes.draw do
  # resources :categories
  resources :tasks, only: %i[index create]
  resources :users, only: [:index] do
    resources :tasks, only: [:index]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'
end
