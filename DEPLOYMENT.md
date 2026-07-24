# Production deployment

## Recommended low-cost architecture

Use **Vercel Pro** for the Next.js application and **MongoDB Atlas** for the database, in the same cloud region where possible.

- Vercel Pro is the appropriate entry plan for a commercial storefront. It supplies HTTPS, CDN caching, deployments from GitHub, and basic protection without operating servers.
- MongoDB Atlas Free is suitable only for a preview or tiny, non-critical launch: it does not provide backups. For customer enquiries that matter, start with a paid Atlas tier that supports backups, then scale only when traffic requires it.
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
- [ ] Enable Atlas alerts for storage, connections, and database availability.
- [ ] Enable automated backups before relying on customer-order data.
- [ ] Turn on Vercel deployment notifications and review the build check on every change.
- [ ] Keep `ADMIN_PASSWORD` in a password manager and rotate it when access changes.
- [ ] Test the contact, newsletter, and custom-order forms after each production deployment.

## Cost-control guardrails

- The public catalogue response is cached at the CDN for short intervals to reduce database reads.
- Public form endpoints have per-instance rate limiting. Also enable Vercel's Web Application Firewall/bot protection for stronger cross-instance abuse protection.
- Product images are served through Next.js image optimization. Keep source images reasonably sized; do not place large originals in the repository.
- Do not use Atlas Free as the sole store for business-critical customer data because it has no managed backups.
