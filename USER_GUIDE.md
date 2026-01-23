# User Guide - Sanity Admin Panel

This guide will help you use the Sanity Admin Panel to manage musical records and live events for your website.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Accessing the Admin Panel](#accessing-the-admin-panel)
3. [Managing Records](#managing-records)
4. [Managing Live Events](#managing-live-events)
5. [Working with Images](#working-with-images)
6. [Tips and Best Practices](#tips-and-best-practices)

## Getting Started

### Step 1: Receive an Invitation

You will receive an email invitation from Sanity to join the project. The email will contain:
- A link to accept the invitation
- Instructions to create a Sanity account (if you don't have one)

### Step 2: Create a Sanity Account

1. Click the invitation link in the email
2. If you don't have a Sanity account:
   - Click "Sign up" or "Create account"
   - Enter your email address
   - Create a password
   - Verify your email address
3. If you already have an account:
   - Click "Sign in"
   - Enter your credentials

### Step 3: Accept the Invitation

1. After logging in, you'll see the invitation screen
2. Click "Accept invitation" to join the project
3. You'll be redirected to the Sanity Management Console

## Accessing the Admin Panel

### Option 1: Via Sanity Studio URL

1. Go to: `https://glenn-admin.sanity.studio` (or the URL provided by your administrator)
2. Click "Login with Sanity"
3. Enter your email and password
4. You'll be taken to the admin panel dashboard

### Option 2: Via Sanity Management Console

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Log in with your Sanity account
3. Find your project in the list
4. Click "Open Studio" to access the admin panel

## Admin Panel Overview

When you first log in, you'll see the main dashboard with two main sections:

- **Records** - Manage musical records/albums
- **Live Events** - Manage upcoming live events

## Managing Records

### Creating a New Record

1. Click on **"Records"** in the left sidebar
2. Click the **"Create"** button (top right)
3. Fill in all required fields:

   **Cover Image** (Required)
   - Click "Select" or drag and drop an image
   - Recommended: High-quality album cover image
   - The image will be automatically optimized

   **Disc Image** (Required)
   - Click "Select" or drag and drop an image
   - This image is used in animations on the website
   - Recommended: Photo of the physical disc

   **Open Graph Image** (Optional)
   - Click "Select" or drag and drop an image
   - Used for social media sharing (Facebook, Twitter, etc.)
   - **Recommended size: 1200x630 pixels**
   - If not provided, the cover image will be used

   **Title** (Required)
   - Enter the album or song name
   - Example: "Midnight Sessions"

   **Slug** (Required)
   - This is automatically generated from the title
   - You can edit it manually if needed
   - Format: lowercase-with-hyphens
   - Example: "midnight-sessions"
   - **This creates the unique URL for the page**

   **Price CHF** (Required)
   - Enter the price in Swiss Francs
   - Use numbers only (e.g., 25.50)
   - Must be 0 or greater

   **Release Date** (Required)
   - Click the date field
   - Use the calendar picker to select a date
   - Format: Day.Month.Year (e.g., 23.01.2026)
   - You can also type the date directly

   **Description** (Required)
   - Rich text editor with formatting options
   - You can:
     - Make text **bold** or *italic*
     - Create bulleted or numbered lists
     - Add links
     - Create paragraphs
   - Click the formatting buttons in the toolbar

   **Order** (Required)
   - Enter a number to control display order
   - Lower numbers appear first
   - Example: 1, 2, 3, etc.
   - Used for sorting records on the website

4. Click **"Publish"** (top right) to save and make the record live
5. Or click **"Save draft"** to save without publishing

### Editing an Existing Record

1. Click on **"Records"** in the left sidebar
2. You'll see a list of all records, sorted by Order (ascending) by default
3. Click on the record you want to edit
4. Make your changes
5. Click **"Publish"** to save changes

### Deleting a Record

1. Open the record you want to delete
2. Click the **"..."** menu (top right)
3. Select **"Delete"**
4. Confirm the deletion

**Note**: Deleted records cannot be recovered. Make sure you want to delete before confirming.

### Sorting Records

Records are automatically sorted by the **Order** field (ascending). To change the order:

1. Edit each record
2. Change the **Order** number
3. Lower numbers appear first
4. Save and publish

You can also use the sorting dropdown in the Records list to sort by:
- Order (Ascending/Descending)
- Release Date (Newest/Oldest)

## Managing Live Events

### Creating a New Live Event

1. Click on **"Live Events"** in the left sidebar
2. Click the **"Create"** button (top right)
3. Fill in all required fields:

   **Title** (Required)
   - Enter the event name
   - Example: "Summer Concert 2026"
   - This appears first in the admin list

   **Date** (Required)
   - Click the date field
   - Use the calendar picker to select the event date
   - Format: Day.Month.Year (e.g., 15.06.2026)
   - You can also type the date directly

   **Location** (Required)
   - Enter the city and country
   - Format: "City, Country"
   - Examples:
     - "Zurich, Switzerland"
     - "Berlin, Germany"
     - "Paris, France"

   **Ticket Link** (Required)
   - Enter the full URL where users can buy tickets
   - Must start with `http://` or `https://`
   - Example: `https://tickets.example.com/event/123`

4. Click **"Publish"** to save and make the event live
5. Or click **"Save draft"** to save without publishing

### Editing an Existing Live Event

1. Click on **"Live Events"** in the left sidebar
2. You'll see a list of all events, sorted by Date (upcoming) by default
3. Click on the event you want to edit
4. Make your changes
5. Click **"Publish"** to save changes

### Deleting a Live Event

1. Open the event you want to delete
2. Click the **"..."** menu (top right)
3. Select **"Delete"**
4. Confirm the deletion

### Sorting Live Events

Events are automatically sorted by **Date** (upcoming first). You can also sort by:
- Date (Upcoming/Recent)
- Title (A-Z)

Use the sorting dropdown in the Live Events list.

## Working with Images

### Uploading Images

1. Click **"Select"** or drag and drop an image file
2. Supported formats: JPG, PNG, GIF, WebP
3. Images are automatically optimized and resized
4. Large images may take a moment to upload

### Image Hotspot

When uploading images, you can set a "hotspot":
- Click and drag on the image to set the focal point
- This helps ensure important parts of the image remain visible when cropped
- Useful for cover images that may be displayed in different sizes

### Image Requirements

**Cover Image**:
- High resolution recommended
- Square or rectangular format works best
- Will be displayed as the main album cover

**Disc Image**:
- Photo of the physical disc
- Used in website animations
- Square format recommended

**Open Graph Image**:
- **Size: 1200x630 pixels** (recommended)
- Used when sharing on social media
- Landscape orientation
- If not provided, cover image will be used

## Tips and Best Practices

### General Tips

1. **Always Publish**: Changes are only visible on the website after clicking "Publish"
2. **Save Drafts**: Use "Save draft" to work on content without making it live
3. **Check Required Fields**: All fields except Open Graph Image are required
4. **Use Descriptive Titles**: Clear titles help with organization and SEO
5. **Unique Slugs**: Slugs must be unique - they create the page URL

### Working with Dates

- Use the calendar picker for accuracy
- Format is automatically handled (DD.MM.YYYY)
- Past dates are allowed (for historical records)

### Working with Rich Text

- Use formatting to make descriptions readable
- Break up long text with paragraphs
- Use lists for features or track listings
- Add links to external resources when relevant

### Image Best Practices

- Use high-quality images for best results
- Optimize images before uploading (reduce file size if very large)
- Set hotspots on images to control cropping
- Ensure Open Graph images are exactly 1200x630 for best social media display

### Ordering Records

- Plan your order numbers before creating records
- Leave gaps in numbering (e.g., 10, 20, 30) to allow easy reordering
- Lower numbers appear first on the website

### Managing Events

- Create events well in advance
- Update ticket links if they change
- Delete past events to keep the list clean
- Use clear, descriptive event titles

## Troubleshooting

### Can't Log In

1. Check that you've accepted the invitation email
2. Verify you're using the correct email address
3. Try resetting your password at [sanity.io](https://www.sanity.io)
4. Contact your administrator if issues persist

### Changes Not Appearing on Website

1. Make sure you clicked **"Publish"** (not just "Save draft")
2. Wait a few moments for changes to propagate
3. Clear your browser cache
4. Check with your developer if the website is properly connected

### Image Upload Issues

1. Check file size (very large files may fail)
2. Verify file format (JPG, PNG, GIF, WebP)
3. Try a different browser
4. Check your internet connection

### Can't Delete a Record/Event

1. Make sure you have Editor or Administrator permissions
2. Try refreshing the page
3. Contact your administrator if you need delete permissions

## Getting Help

If you need assistance:

1. Contact your project administrator
2. Check the [Sanity Documentation](https://www.sanity.io/docs)
3. Visit the [Sanity Community](https://www.sanity.io/community)

## Quick Reference

### Required Fields Checklist

**Record**:
- ✅ Cover Image
- ✅ Disc Image
- ✅ Title
- ✅ Slug
- ✅ Price CHF
- ✅ Release Date
- ✅ Description
- ✅ Order
- ⭕ Open Graph Image (optional)

**Live Event**:
- ✅ Title
- ✅ Date
- ✅ Location
- ✅ Ticket Link

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save draft
- `Ctrl/Cmd + P` - Publish
- `Esc` - Close dialogs

---

**Last Updated**: January 2026
