Danielle Fernandez — Art Portfolio (static site, no Wix)
=========================================================

Upload EVERYTHING in this folder to any static web host. index.html is the home page.
No build step, database or server code is needed.

  index.html           Home (hero painting, artist statement, contact form)
  selected-work.html   Selected Artwork (all 128 gallery pieces, click to enlarge)
  cv.html              CV
  contact.html         Contact
  css/style.css        All styling
  js/main.js           Gallery viewer + contact form
  images/              Hero image, full-size artwork, and thumbnails
  video/               The two Wix-hosted videos ("Building a Friend" plays from Vimeo)

Hosting options (all free tiers work):
  - Netlify:          drag this folder onto https://app.netlify.com/drop
  - Cloudflare Pages: Create project > Upload assets > select this folder
  - GitHub Pages:     push the folder contents to a repo, enable Pages
  - Any cPanel/FTP host: upload the contents into public_html

CONTACT FORM
Wix handled form submissions on its own servers, so that part has to be replaced.
Out of the box, "Submit" opens the visitor's email app with the message pre-filled
and addressed to dfernandez@ithaca.edu.
To receive messages directly instead, make a free form at https://formspree.io
and paste its URL into FORM_ENDPOINT at the top of js/main.js.

FONTS
Wix used licensed fonts (Brandon Grotesque / Avenir). This site uses the closest
free Google Fonts (Jost / Nunito Sans) so it looks the same without a license.
