Monkeytrip::Application.routes.draw do
  root to: 'home#index'
  resources :leads, only: [:create]
end
