export interface Ride {
  resource_state : number
  athlete : {
    id : number
    resource_state: number
  }
  name : string
  distance : number
  moving_time : number
  elapsed_time : number
  total_elevation_gain : number
  type : string
  sport_type : string
  workout_type : string | null
  id : number
  external_id : string
  upload_id : number
  start_date : string
  start_date_local : string
  timezone : string
  utc_offset : number
  start_latlng : null
  end_latlng : null
  location_city : string | null
  location_state : string | null
  location_country : string | null
  achievement_count : number
  kudos_count : number
  comment_count : number
  athlete_count : number
  photo_count : number
  map : {
    id : number
    summary_polyline : any
    resource_state : number
  }
  trainer : boolean
  commute : boolean
  manual : boolean
  private : boolean
  flagged : boolean
  gear_id : number
  from_accepted_tag : boolean
  average_speed : number
  max_speed : number
  average_cadence : number
  average_watts : number
  weighted_average_watts : number
  kilojoules : number
  device_watts : boolean
  has_heartrate : boolean
  average_heartrate : number
  max_heartrate : number
  max_watts : number
  pr_count : number
  total_photo_count : number
  has_kudoed : boolean
  suffer_score : number
}