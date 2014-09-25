require_relative '../models/yelp_api'

get '/' do 
  redirect '/search'
end

get '/search' do 
  erb :yelp_request
end

get '/search/request' do 
  search_city = params[:city]
  api = Yelp::Api.new
  @business_hash = api.search_businesses(search_city)
  erb :yelp_response
end

get '/cesium' do 
  erb :cesium
end
