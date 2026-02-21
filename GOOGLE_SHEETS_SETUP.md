# Google Sheets Integration Setup

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "LetterMetrics Waitlist"
4. Add these headers in row 1:
   - A1: Email
   - B1: Source
   - C1: Timestamp
   - D1: User Agent

## Step 2: Create Google Apps Script

1. Go to **Extensions → Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  // Open the spreadsheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Parse the JSON data
  var data = JSON.parse(e.postData.contents);
  
  // Add the row
  sheet.appendRow([
    data.email,
    data.source || 'website',
    data.timestamp,
    data.userAgent
  ]);
  
  // Return success
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'API is working'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon (⚙️) next to "Type" and select **Web app**
3. Set:
   - Description: "LetterMetrics Waitlist API"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Copy the **Web App URL**

## Step 4: Update the Code

Replace `YOUR_SCRIPT_ID` in `src/app/page.tsx` with your actual script ID:

```typescript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

The script ID is the long string between `/s/` and `/exec` in your Web App URL.

## Testing

1. Open your landing page
2. Enter an email and submit
3. Check your Google Sheet - the email should appear within seconds

## Troubleshooting

- **CORS errors**: These are normal due to Google's CORS policy. The data still submits.
- **Data not appearing**: Make sure the script is deployed and the URL is correct.
- **Permissions**: Ensure the script has permission to access the spreadsheet.

## Alternative: Use a Form Backend Service

If Google Sheets is too complex, consider these alternatives:

1. **Formspree** (easiest): `https://formspree.io/f/YOUR_FORM_ID`
2. **Airtable**: Create a form and use their API
3. **Notion**: Create a database and use their API
4. **Supabase**: Free PostgreSQL with REST API

## Security Note

The Google Script URL is public. Anyone with the URL can submit data. For production:
- Add rate limiting in the script
- Add email validation
- Consider using a proper backend with authentication
