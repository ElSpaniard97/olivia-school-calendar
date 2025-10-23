📚 Olivia Sims — School Task & Verse Calendar

An elegant, multi-page planner built with HTML, CSS, and JavaScript for tracking schoolwork, weekly tasks, and daily Bible inspiration.
Each page is beautifully themed in white and rose pink, responsive, and password-protected.

🌸 Features
🏠 Calendar (index.html)

Clickable monthly calendar (Monday–Sunday)

Red dots mark days with saved tasks

Click a day → shows tasks for that date

Live daily Bible verse from Bible.org

“Pin Verse” button saves your favorite verses

Always-visible Notes and Birthdays side panels

📝 Task Manager (tasks.html)

Add, delete, and view tasks

Fields: Title, Date, Category, Priority

Tasks persist in browser using localStorage

Automatically updates Calendar and Weekly pages

📅 Weekly View (weekly.html)

Displays all tasks for the current week

Navigate between weeks

Updates dynamically as you add or remove tasks

✝️ Pinned Verses (verses.html)

Displays pinned verses saved from the Calendar

Option to Clear All

Stored locally in your browser

🔐 Security

Each page is password-protected with:

Password: Moana0121


The session stays unlocked until you close the browser tab.
To change the password, open script.js and modify:

const PASSWORD = "Moana0121";

🧩 Project Structure
/
├── index.html        # Calendar Page
├── tasks.html        # Task Manager Page
├── weekly.html       # Weekly View Page
├── verses.html       # Pinned Verses Page
├── style.css         # Shared styling (Playfair Display + Poppins)
├── script.js         # Shared JS logic (tasks, verses, password)
└── README.md         # Project documentation

💻 Local Setup

Download or clone the repository:

git clone https://github.com/<your-username>/olivia-calendar.git


Open any of the HTML files in your browser (e.g. index.html)

Enter the password Moana0121

Your data will automatically be saved in browser storage (no backend needed)

🌐 Deploy to GitHub Pages
🪄 Quick Steps

Go to your GitHub repository (e.g. olivia-calendar)

Click Settings → Pages

Under Build and deployment, set:

Source: Deploy from a branch

Branch: main → / (root)

Click Save

GitHub will generate a public link like:

https://<your-username>.github.io/olivia-calendar/


Now your planner is live and accessible on any device!

🌍 Optional: Custom Domain

If you want a personal URL (e.g. calendar.oliviasims.com):

Buy a domain from Google Domains
 or Namecheap

In your repo, create a file named:

CNAME


Add your domain name inside (no spaces):

calendar.oliviasims.com


Set up a DNS record (CNAME → <your-username>.github.io)

Wait for propagation (usually 1–2 hours)

📱 Mobile Experience

Optimized for iPhone and Android browsers

Large tap areas (≥44px)

Responsive layouts automatically adjust side panels and dropdown menus

🧠 Data & Storage

All tasks and verses are saved in your browser’s localStorage

To clear data:

On Chrome: DevTools → Application → Storage → “Clear site data”

On Safari (iPhone): Settings → Safari → Advanced → Website Data → Remove

🌈 Customization
Feature	Where to Change	Example
Theme colors	style.css	--pink, --accent, --bg
Default password	script.js	const PASSWORD = "MyNewPassword";
Verse API	script.js	Change the fetch URL if needed
Fonts	style.css	Replace "Playfair Display" or "Poppins"
📖 Credits

Design: Inspired by Olivia Sims’ clean aesthetic
Development: Built with ChatGPT (GPT-5)
APIs: Bible.org Random Verse API

Fonts: Playfair Display
 & Poppins
