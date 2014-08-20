module Yelp
  class Api
    include HTTParty
    base_uri "http://api.yelp.com"
    def search_restaurants(latitude,longitude)
      response = self.class.get("/v2/search?term=food&ll=#{latitude},#{longitude}") 
      restaurant_array = []
      JSON.parse(response).each do |restaurant|
        restaurant_array << restaurant 
      end
      return restaurant_array
    end
  end
end