# Production deployment

## Recommended low-cost architecture

Use **Vercel Pro** for the Next.js application and **MySQL** for the database, in the same cloud region where possible.

- Vercel Pro is the appropriate entry plan for a commercial storefront. It supplies HTTPS, CDN caching, deployments from GitHub, and basic protection without operating servers.
- A managed MySQL database is a better fit for this app’s relational data model and supports stable hosting for products, orders, and settings.
- This app does not need Redis, a queue, a container platform, or a separate API service at launch. Its database connection pool and public-response caching are tuned for low serverless cost.

## First deployment

1. Create an Atlas database user with access only to the `sutrakriti` database. Create the database in the closest available region.
2. Copy the connection string and replace the password placeholder. Restrict the Atlas network access list to the deployment provider where feasible.
3. Import this GitHub repository into Vercel. Set the production branch to `CustomDeployment` until it is merged into your primary branch.
4. In Vercel, add every variable from `.env.example`. Do not upload or commit a `.env` file.
5. Generate a strong value for `ADMIN_PASSWORD`, for example:

   ```bash
   openssl rand -base64 32
   ```

6. Deploy. Vercel supplies HTTPS automatically. Configure the custom domain and add both the apex and `www` domain if applicable.
7. Visit `/api` to confirm a healthy response, then visit `/admin`. Your browser will ask for the `ADMIN_USERNAME` and `ADMIN_PASSWORD` set in Vercel.

## Required production variables

```dotenv
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/sutrakriti?retryWrites=true&w=majority
DB_NAME=sutrakriti
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<long-unique-secret>
NEXT_PUBLIC_WHATSAPP_NUMBER=917777932385
NEXT_PUBLIC_EMAIL=orders@example.com
NEXT_PUBLIC_INSTAGRAM_HANDLE=_sutrakriti
```

`ADMIN_PASSWORD` is a secret. The `NEXT_PUBLIC_*` values are intentionally visible in the browser.

## Security and operations checklist

- [ ] Confirm `.env` is not committed and rotate any secret that was ever committed.
- [ ] Use a distinct database user and a 32+ character password for production.
- [ ] Enable MySQL storage alerts and connection monitoring for the production database.
- [ ] Enable automated backups before relying on customer-order data.
- [ ] Turn on Vercel deployment notifications and review the build check on every change.
- [ ] Keep `ADMIN_PASSWORD` in a password manager and rotate it when access changes.
- [ ] Test the contact, newsletter, and custom-order forms after each production deployment.

## Cost-control guardrails

- The public catalogue response is cached at the CDN for short intervals to reduce database reads.
- Public form endpoints have per-instance rate limiting. Also enable Vercel's Web Application Firewall/bot protection for stronger cross-instance abuse protection.
- Product images are served through Next.js image optimization. Keep source images reasonably sized; do not place large originals in the repository.
- Do not rely on a single unmanaged MySQL instance for business-critical customer data; use automated backups and monitoring.

## MilesWeb deployment guide

MilesWeb can host this app as a Node.js application. The app is already configured to start correctly in a shared hosting environment through the custom server entrypoint.

### 1. Prepare the hosting account

1. Log in to your MilesWeb client area.
2. Open your hosting account and create or open a Node.js application / website container.
3. Make sure the hosting plan supports Node.js and has access to a terminal or app manager.
4. Confirm that your account allows custom startup commands and environment variables.

### 2. Prepare the database

This app uses MySQL. Before deploying, create or configure a MySQL database and obtain the connection details.

1. Create a MySQL-compatible database server or use a managed MySQL hosting plan.
2. Create a database for the website, for example `sutrakriti`.
3. Create a database user with read/write access to that database.
4. Record the host, port, username, password, and database name.
5. Make sure the database user can connect from your hosting environment.

### 3. Upload the project files

1. Open the file manager or deployment section in MilesWeb.
2. Upload the complete project files to the application root.
3. Make sure the uploaded structure contains files such as `package.json`, `server.js`, `next.config.js`, `app/`, `components/`, `lib/`, and `public/`.
4. Do not upload a `.env` file to the server unless your hosting panel explicitly allows it. Prefer setting environment variables in the hosting control panel.

### 4. Install dependencies on the server

If your MilesWeb panel provides terminal access, run the following in the project root:

```bash
npm install
```

If your hosting panel supports a package installation step, use the same command there.

### 5. Set environment variables

In the MilesWeb control panel, add the production environment variables. Use the values from your own setup.

```dotenv
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=<strong-password>
MYSQL_DATABASE=sutrakriti
DB_NAME=sutrakriti
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-random-password>
NEXT_PUBLIC_WHATSAPP_NUMBER=917777932385
NEXT_PUBLIC_EMAIL=orders@example.com
NEXT_PUBLIC_INSTAGRAM_HANDLE=_sutrakriti
```

Important notes:
- `ADMIN_PASSWORD` should be long and unique.
- `NEXT_PUBLIC_*` values are visible in the browser, so they are safe to expose.
- `MONGO_URL` must be the real production connection string.

### 6. Configure the startup command

In the Node.js app settings, set the startup command to:

```bash
npm start
```

This runs the production server through the custom entrypoint in [server.js](server.js), which binds the app to `0.0.0.0` and uses the hosting platform’s port.

### 7. Build the app before startup

If your hosting panel supports a build step, run:

```bash
npm run build
```

If the panel does not have a separate build step, the `npm start` command will still work as long as the app has already been built during deployment or the hosting environment supports build-on-start.

### 8. Start the application

1. Save the environment variables.
2. Save the startup command.
3. Start or restart the Node.js app.
4. Wait for the server to become available.

### 9. Verify the deployment

Once the app is running, test the following URLs:

- `http://yourdomain.com/` for the homepage
- `http://yourdomain.com/api` for the API health check
- `http://yourdomain.com/admin` for the admin login prompt

Expected results:
- The homepage should load successfully.
- `/api` should return a JSON health response.
- `/admin` should prompt for Basic Auth credentials if the admin password is configured.

### 10. Set up the production admin access

To access the admin panel:

1. Open the admin URL in your browser.
2. Enter the username and password you set in the hosting environment variables.
3. If the site is not yet fully configured, you can still verify that the login prompt is working.

### 11. Post-deployment checklist

- [ ] Confirm the site is reachable in the browser.
- [ ] Confirm the database connection works.
- [ ] Confirm the `/api` endpoint returns a healthy response.
- [ ] Confirm `/admin` requires authentication.
- [ ] Test contact, newsletter, and custom-order form submissions.
- [ ] Review logs for startup or runtime errors.

### 12. Important hosting notes

- The app is designed to run on port `3000` by default, but it also respects the `PORT` environment variable provided by the hosting environment.
- The app listens on `0.0.0.0` in production so it can receive traffic from the hosting platform.
- If you use a custom domain in MilesWeb, configure the DNS records so the domain points to the hosting account before testing the site.
- If you encounter startup issues, review the server logs in the hosting panel for Node.js errors and missing environment variables.
