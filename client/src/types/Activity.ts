export interface Activity {
  achievement_count: number;
  athlete: {
    id: number;
    resource_state: number;
  };
  athlete_count: number;
  average_cadence: number;
  average_heartrate: number;
  average_speed: number;
  average_temp: number;
  average_watts: number;
  comment_count: number;
  commute: boolean;
  device_watts: boolean;
  display_hide_heartrate_option: boolean;
  distance: number;
  elapsed_time: number;
  elev_high: number;
  elev_low: number;
  end_latlng: {
    0: number;
    1: number;
  };
  external_id: string;
  flagged: boolean;
  from_accepted_tag: boolean;
  gear_id: string;
  has_heartrate: true;
  has_kudoed: boolean;
  heartrate_opt_out: boolean;
  id: number;
  kilojoules: number;
  kudos_count: number;
  location_city: string | null;
  location_country: string | null;
  location_state: string | null;
  manual: boolean;
  map: {
    id: string;
    resource_state: number;
    summary_polyline: string;
  };
  max_heartrate: number;
  max_speed: number;
  moving_time: number;
  name: string;
  photo_count: number;
  pr_count: number;
  private: boolean;
  resource_state: number;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  start_latlng: {
    0: number;
    1: number;
  };
  timezone: string;
  total_elevation_gain: number;
  total_photo_count: number;
  trainer: boolean;
  type: string;
  upload_id: number;
  upload_id_str: string;
  utc_offset: number;
  visibility: string;
  workout_type: string | null;
}
