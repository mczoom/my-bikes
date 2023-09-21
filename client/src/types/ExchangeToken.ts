export interface ExchangeToken {
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string | undefined
  access_token: string
  athlete: any
}