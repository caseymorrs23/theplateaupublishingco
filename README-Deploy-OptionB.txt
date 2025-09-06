FULL DEPLOY — Option B (root-level thank-you page)

Included:
- /digital/ (lead-gen microsite, unified theme)
- /services/ (service category pages)
- /components/ (button bar)
- nav-snippet.html (drop-in nav)
- thank-you.html (root-level redirect target for contact form)

How to deploy:
1) Replace your existing homepage with the new index.html provided in chat (paste over your current file).
2) Copy the following into your repo ROOT:
   - digital/
   - services/
   - components/
   - nav-snippet.html
   - thank-you.html
3) Ensure your homepage <nav> matches nav-snippet.html (the new index.html already includes it).
4) Commit & push:
   git pull
   git add digital services components nav-snippet.html thank-you.html
   git commit -m "Add /digital + services + components + root thank-you (Option B)"
   git push

Test after publishing:
- Submit /digital/contact.html and confirm the redirect lands on /thank-you.html.
- Verify the email arrives at caseymorris@bestversionmedia.com.
