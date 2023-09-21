export interface RidesTotals {
  count: number
  distance: number
  elapsed_time: number
  elevation_gain: number
  moving_time: number
}


export interface AthleteStats {
  all_ride_totals: RidesTotals  
  biggest_climb_elevation_gain: number
  biggest_ride_distance: number
  recent_ride_totals: RidesTotals
  ytd_ride_totals: RidesTotals  
}