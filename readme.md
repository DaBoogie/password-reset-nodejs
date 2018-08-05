## Server

- [api-docs](https://exapmle.app/api-docs/#/)

### App settings
Please set-up environment variables before start testing or create .env file in the root of the project with next values:
```
API_URI = [your-api-host]:[PORT]
DATABASE_URL = mysql://[user]:[password]@[host]:[port|3306]/[db_name]
EMAILING_ACCOUNT_EMAIL = no-reply@example.com
EMAILING_ACCOUNT_PASSWORD = notification-email-password

# This link should open application password confirmation page
# can be hardcoded in src/controllers/user/password/send.post.js
# This page should send PATCH request to this link: `${process.env.API_URI}/password/reset/${token.uuid}`
APP_EMAIL_CONFIRMATION_GET_LINK = http://[you-app-url]/[password-reset-patch]
```

### Installation

Server:
```
npm install
npm run serve
```

