
# OAuth2.0 - Using Bun (v0.7.1)

+ bun install
+ npm run build & npm run start 
+ npm run dev

---

 Auth 모듈 API 연동 규약서 입니다.

> OAuth 2.0 Authorization Framework (https://datatracker.ietf.org/doc/html/rfc6749/)

---

# 토큰 발급 API
http://{UCS-Auth}:5010/auth/token

 
> password (https://www.oauth.com/oauth2-servers/access-tokens/password-grant/)
>- 사용자 인증 방식
 
 
```
POST http://43.202.76.8:5010/auth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
 
grant_type=password
&client_id=ucs-auth
&client_secret=533a32096da1209badac716538604dd2
&username=ucsadmin
&password=ucsadmin
------------------------------------------------------------------------
{
  "token_type": "Bearer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMTEzLCJleHAiOjE2OTI2MDU3MTN9.wagLcBfedAI5hjchg-PD2PNXMMzimoxj8CYLWY6C89g",
  "expires_in": 3600,
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMTEzLCJleHAiOjE2OTMyMDY5MTN9.rV3pEybsS-T0bJTBYnhMVUNu0YGJzvLZvizOTseKfxQ"
}
```

```
POST http://43.202.76.8:5010/auth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dWNzLWF1dGg6NTMzYTMyMDk2ZGExMjA5YmFkYWM3MTY1Mzg2MDRkZDI=
 
grant_type=password
&username=ucsadmin
&password=ucsadmin
------------------------------------------------------------------------
{
  "token_type": "Bearer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMTI5LCJleHAiOjE2OTI2MDU3Mjl9.KN8BODZs7z6L_4ygJRhBOc9l827P_etUL-EcCamnUhw",
  "expires_in": 3600,
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMTI5LCJleHAiOjE2OTMyMDY5Mjl9.MjvR1vS479HZBJi1qR7g5FPDgSNfVaxs3l4MEw1oDl0"
}
```


> refresh_token (https://www.oauth.com/oauth2-servers/access-tokens/refreshing-access-tokens/)
>- 토큰 재 발급

 
```
POST http://43.202.76.8:5010/auth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
 
grant_type=refresh_token
&client_id=ucs-auth
&client_secret=533a32096da1209badac716538604dd2
&refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMTI5LCJleHAiOjE2OTMyMDY5Mjl9.MjvR1vS479HZBJi1qR7g5FPDgSNfVaxs3l4MEw1oDl0
------------------------------------------------------------------------
{
  "token_type": "Bearer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMjM4LCJleHAiOjE2OTI2MDU4Mzh9.fDM756IhGtrVWfNSeaqnUIvCDALoeviR_bCg7pWgU5w",
  "expires_in": 3600,
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMjM4LCJleHAiOjE2OTMyMDcwMzh9.Uy8JQKCUqIMQEWGW8EvluzAx4MBzkssrDGII2qaBVWs"
}
```

```
POST http://43.202.76.8:5010/auth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dWNzLWF1dGg6NTMzYTMyMDk2ZGExMjA5YmFkYWM3MTY1Mzg2MDRkZDI=
 
grant_type=refresh_token
&refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMTI5LCJleHAiOjE2OTMyMDY5Mjl9.MjvR1vS479HZBJi1qR7g5FPDgSNfVaxs3l4MEw1oDl0
------------------------------------------------------------------------
{
  "token_type": "Bearer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMjE3LCJleHAiOjE2OTI2MDU4MTd9.9g3MOXkz9koN1CXNCHXlqyFE36gybNMhrAg-pdNkdP4",
  "expires_in": 3600,
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAyMjE3LCJleHAiOjE2OTMyMDcwMTd9.8OXnxnCdmZ4wB8nEYbFxkovYveybrz-DmVPAaYEegI4"
} 
```

> client_credentials (https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)
>- Client 연동 방식 (서버 모듈 간에서 사용) (현재는 사용 하지 않음)
 
 

```
POST http://43.202.76.8:5010/auth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
 
grant_type=client_credentials
&client_id=ucs-auth
&client_secret=533a32096da1209badac716538604dd2
------------------------------------------------------------------------
{
  "token_type": "Bearer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI2MDE3NTQsImV4cCI6MTY5MjYwNTM1NH0.bp1vUsc3JrbOycp9YbDHQ2jvzLM_jZm4Y2ADINNmnIs",
  "expires_in": 3600
}
```

```
POST http://43.202.76.8:5010/auth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic dWNzLWF1dGg6NTMzYTMyMDk2ZGExMjA5YmFkYWM3MTY1Mzg2MDRkZDI=
 
grant_type=client_credentials
------------------------------------------------------------------------
{
  "token_type": "Bearer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI2MDE4NzUsImV4cCI6MTY5MjYwNTQ3NX0.pWgqThE8oSmc1SkOvC1-T8EGPbebbPYV7TkdS0bXIuE",
  "expires_in": 3600
}
```
 
 
---

# 토큰 확인 API
http://{UCS-Auth}:5010/auth/validate
 
> password

```
POST http://43.202.76.8:5010/auth/validate HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVjc2FkbWluIiwiaWF0IjoxNjkyNjAzNjQ3LCJleHAiOjE2OTI2MDcyNDd9.-8ku7_C9AoAaA3YVOBrxcg8lMCv6DhkLMt_y0xJVH1Y
------------------------------------------------------------------------
{
  "username": "ucsadmin",
  "iat": 1692603647,
  "exp": 1692607247
}
```

> client_credentials

```
POST http://43.202.76.8:5010/auth/validate HTTP/1.1
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTI2MDUwMzEsImV4cCI6MTY5MjYwODYzMX0.RWNAS_Cw45foQQta2vyeRKWs-OrROrYKZig2M5U9TH4
------------------------------------------------------------------------
{
  "iat": 1692605031,
  "exp": 1692608631
}
``` 
 
