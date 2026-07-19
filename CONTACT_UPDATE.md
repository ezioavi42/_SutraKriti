# Contact Information Update - July 19, 2026

## Summary of Changes

All Instagram and Email references have been updated across the entire SutraKriti website.

### ✅ Updates Completed

**1. Instagram Handle**
- **Old:** @sutrakriti → **New:** @_sutrakriti
- **URL:** https://www.instagram.com/_sutrakriti

**2. Email Address**
- **Old:** orders@sutrakriti.com → **New:** sutrakriti.help@outlook.com

---

## Files Updated

### 1. Database Settings
- ✅ `/app/scripts/update-settings.js` - Created update script
- ✅ MongoDB `settings` collection updated with new values
- ✅ `/app/scripts/seed.js` - Updated default values for future database resets

### 2. Components
- ✅ `/app/components/Footer.jsx` - Updated Instagram and email links
- ✅ `/app/components/WhatsAppFloat.jsx` - Uses database settings (automatically updated)

### 3. Pages
- ✅ `/app/app/contact/page.js` - Updated contact cards with new Instagram handle and email
- ✅ `/app/app/products/[slug]/page.js` - Updated Instagram and email order handlers
- ✅ `/app/app/admin/page.js` - Updated placeholder values in settings form

### 4. Documentation
- ✅ `/app/README.md` - Updated all references
- ✅ `/app/PRODUCT_UPDATES.md` - Updated contact information

---

## Verification Results

### ✅ Database Settings
```json
{
  "instagramHandle": "_sutrakriti",
  "email": "sutrakriti.help@outlook.com"
}
```

### ✅ All Pages Updated
1. **Homepage** - Footer links updated
2. **Collections** - Footer links updated
3. **Product Details** - Instagram and Email order buttons use new values
4. **Contact Page** - Contact cards show:
   - Instagram: @_sutrakriti
   - Email: sutrakriti.help@outlook.com
5. **Custom Orders** - Form submissions use new email
6. **About** - Footer links updated
7. **Admin Dashboard** - Settings placeholders updated

---

## How It Works

### Dynamic Settings System

The website uses a **database-driven settings system**:

1. **Settings API** (`/api/settings`)
   - Fetches current Instagram handle and email from MongoDB
   - Returns JSON with current values

2. **Product Pages**
   - Fetch settings on page load
   - Use settings for Instagram/Email order buttons
   - Fallback to new defaults if settings unavailable:
     - Instagram: `_sutrakriti`
     - Email: `sutrakriti.help@outlook.com`

3. **Components**
   - Footer and other components use hardcoded new values
   - WhatsApp Float uses database settings

### Example: Product Order Buttons

When a customer clicks "Instagram" or "Email" on a product page:

**Instagram Button:**
```javascript
const handle = settings?.instagramHandle || '_sutrakriti';
window.open(`https://www.instagram.com/${handle}`, '_blank');
// Opens: https://www.instagram.com/_sutrakriti
```

**Email Button:**
```javascript
const email = settings?.email || 'sutrakriti.help@outlook.com';
const subject = `Order Inquiry: ${product.name}`;
window.location.href = `mailto:${email}?subject=...`;
// Opens: mailto:sutrakriti.help@outlook.com
```

---

## Testing Checklist

Verified on all pages:

- ✅ Homepage footer Instagram link → https://www.instagram.com/_sutrakriti
- ✅ Homepage footer email link → sutrakriti.help@outlook.com
- ✅ Contact page Instagram card → @_sutrakriti
- ✅ Contact page email card → sutrakriti.help@outlook.com
- ✅ Product detail Instagram button → Opens correct Instagram profile
- ✅ Product detail Email button → Opens email with correct address
- ✅ All pages footer consistent
- ✅ Admin settings show correct placeholders

---

## Future Updates

To change Instagram or Email in the future:

### Option 1: Via Admin Dashboard (Recommended)
1. Visit `/admin`
2. Go to Settings tab
3. Update Instagram Handle or Email
4. Click "Save Settings"

### Option 2: Via Database Script
```bash
cd /app
node scripts/update-settings.js
```

### Option 3: Via MongoDB Directly
```javascript
db.settings.updateOne(
  { type: 'site' },
  { 
    $set: { 
      instagramHandle: 'new_handle',
      email: 'new.email@domain.com'
    }
  }
)
```

---

## Live URLs

**Website:** https://craft-boutique-26.preview.emergentagent.com

**Instagram:** https://www.instagram.com/_sutrakriti

**Email:** sutrakriti.help@outlook.com

---

**All contact information has been successfully updated across the entire website! ✅**
