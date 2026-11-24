# PackVault – Project log

A step-by-step record of how the design and the first page of the app were made.
Use it as source material for the school report.

Written: November 2026

---

## 1. The goal

We wanted a small Pokémon web app with three pages:

1. **Login**: only a username, a password, a "Log in" button and a "Create account" button. Simple, but well made.
2. **Open packs**: open a booster pack the way you would in real life (tear it open, see the cards come out, flip them one by one).
3. **Collection**: see every card you have opened.

The app itself is built with **Angular 21**. The design was made first in **Figma**.

---

## 2. Tools we used

| Tool | What we used it for |
|---|---|
| **Figma** | Designing the three pages, the components (buttons, cards, inputs …) and the color/text styles |
| **Claude Code** (AI coding assistant) | Built the Figma file and wrote the Angular code, following our instructions and feedback. It connected to Figma through the Figma plugin (MCP) |
| **Python** (Pillow + NumPy libraries) | Made the pixel-art pictures (Pikachu on the login page, Charizard on the booster pack) |
| **PokéAPI sprites** | The official Pokémon artwork images |
| **Google Fonts – Figtree** | The font for the whole app |
| **Angular CLI, Vitest, Prettier** | Building the app, running the tests, keeping the code formatting consistent |
| **Chrome** | Checking the finished page in a real browser (laptop and phone size) |

---

## 3. What we did, step by step

### Step 1 – Connecting Figma

We connected Claude Code to our Figma account so it could create and edit Figma files directly.
After the first approval the tools did not show up, so we connected again with a new link. After that it worked.

### Step 2 – First design (version 1), which we rejected

The first version was a **dark, colorful design** called "PackVault", with made-up creatures instead of real Pokémon.

Our feedback: it looked like "AI slop" and used **too many colors**.
We sent a reference image of the style we wanted instead:

- a light, off-white page split in two halves
- on the left: a big thin heading, simple underline-style input fields and a black button
- on the right: a big rounded picture in a pixel / mosaic style

The rule for the rest of the app was: **same theme everywhere, as simple and as professional as possible**, and a real Pokémon on the right side of the login page.

Version 1 is still in its own Figma file and can be deleted:
https://www.figma.com/design/ChktHygsrhVqdvII11Aqhe

**What we learned:** a design with fewer colors and fewer elements looks more professional. Bright colors and decoration everywhere make it look cheap.

### Step 3 – Redesign (version 2)

A new Figma file was made from scratch:
https://www.figma.com/design/NNudlIexIa2aouSaVxSss4

It has 4 Figma pages: **1 · Login**, **2 · Open Pack**, **3 · Collection** and **Components**.

#### 3a. The design system (the "rules" of the design)

A design system means every color, font size and component is defined **once** and then reused.
If we change it in one place, every screen updates.

**Colors (design tokens).** Almost black and white only, so the Pokémon pictures are the only color on the screen.

| Token | Color | Used for |
|---|---|---|
| bg/page | `#F3F4F2` | Page background (off-white) |
| bg/surface | `#FFFFFF` | Cards |
| bg/subtle | `#E8EAE6` | Grey picture area on cards, avatar, the right-side panel |
| bg/inverse | `#151515` | Black buttons and tags |
| border/default | `#DCDFDA` | Thin lines and card borders |
| text/primary | `#151515` | Main text |
| text/secondary | `#5E625E` | Less important text |
| text/tertiary | `#9A9F9A` | Placeholders and small hints |
| text/inverse | `#FFFFFF` | Text on black |

**Text styles (all in the Figtree font).**

| Style | Size / line height | Used for |
|---|---|---|
| Display | 64 / 68 | Page titles ("Welcome back", "My collection") |
| Heading M | 32 / 38 | Big numbers ("12 / 151") |
| Heading S | 18 / 24 | Card names |
| Body L | 17 / 26 | The short line under a title |
| Body M | 15 / 22 | Normal text, tabs |
| Label / Button | 15 / 20 | Input labels, buttons |
| Small | 13 / 18 | HP, type, number on cards |
| Caption | 11 / 14 | "NEW" tag, "S1" set name |

**Components (reusable building blocks).**

- **Icons:** info, arrow, search, chevron (small arrow down)
- **Logo:** two-card logo mark + "PackVault" (later hidden on most screens, see Step 4)
- **Button:** Primary (black) and Secondary (outlined)
- **Input:** a label plus a field with only a line underneath; optional "Show" for passwords
- **Nav item + App header:** the "Open packs" / "Collection" buttons at the top, plus a round avatar
- **Tag:** the small black "NEW" label (and a white "×3" version for duplicates)
- **Rarity:** 1 to 4 small diamonds (Common, Uncommon, Rare, Ultra rare)
- **Card:** white card with the Pokémon picture, name, HP, type, number, rarity and set name
- **Card back:** the black back side of a card
- **Empty card slot:** dashed box with "#012 · Not collected yet"
- **Booster pack:** a black foil pack in two states: *Sealed* and *Torn open*

#### 3b. The pictures

Figma cannot download pictures from the internet by itself, so the pictures were made on the computer and then uploaded into Figma.

1. **Downloaded** the official artwork of 12 Pokémon from PokéAPI:
   Bulbasaur, Charmander, Charizard, Squirtle, Pikachu, Jigglypuff, Psyduck, Gengar, Gyarados, Eevee, Snorlax and Mewtwo.
2. **Card pictures:** a Python script cut away the empty transparent edges of each picture and centered it on a square, so all cards look the same.
3. **Pixel-art pictures:** to match the mosaic style of the reference image, the same script:
   - drew a scene: blue sky, soft clouds, a tree line, a green meadow with flowers and rocks, and Pikachu in the middle
   - made it smaller (each block of 12 × 12 pixels became 1 pixel)
   - reduced it to only 48 colors with "dithering" (mixing dots of colors to fake the missing ones)
   - made it big again without smoothing, so every pixel became a visible square
   - drew thin darker lines between the squares, so it looks like a mosaic

   The booster-pack picture (Charizard in front of a blue sky) was made the same way, with smaller squares.
4. **Uploaded** all pictures into Figma and placed them on the cards, the login page and the pack.

#### 3c. The screens

- **Login:** split layout like the reference. Left side: title, Username and Password fields, "Log in" and "Create account" buttons. Right side: the big pixel-art Pikachu.
- **Open Pack:** 4 screens that show the opening step by step, with the same split layout (text on the left, the pack on a grey panel on the right):
  1. **Sealed:** the pack with a dotted "tear here" line, and a hint to drag your finger across it
  2. **Tearing:** the top strip comes off and the cards start sliding out, with a thin progress line
  3. **Reveal:** one card at a time, big, with a "NEW" tag and the next face-down card behind it
  4. **Summary:** all 5 pulled cards spread out like a hand of cards, with "Open next pack" and "View collection" buttons
- **Collection:** title, a "collected" counter with a progress line, type tabs (All, Grass, Fire …), search, sort, and a grid of cards with dashed empty slots for missing ones, plus "Load more".

Every screen was checked with a screenshot after it was built.

### Step 4 – Our own edits and cleaning up the rest

We then edited the Figma file ourselves to make it even simpler:

- **Login:** removed the logo, the small "01 / Log in" text, the paragraph, the info note and the footer. Only the title, the two fields and the two buttons are left.
- **Collection:** hid the logo in the header, removed the small "03 / Collection" text and changed the text to *"Here you will have all your amazing cards!"*.
- **Open Pack (first screen):** removed the logo.

We asked Claude to **finish this style on the other screens**, using the login page as the example of how clean it should be. On all 4 Open Pack screens it:

- hid the logo in the header
- removed the small breadcrumb texts, the "01 / 02 / 03" steps list, the Rarity/Type/HP details list, the list of pulled cards, the footers and the extra hint under the card
- shortened the text to one friendly line, for example *"Card 4 of 5. A rare one, nice pull!"* and *"3 new cards were added to your collection!"*
- centered the text and buttons vertically, the same as on the login page

Now every screen has the same structure: **a title, one short line, the buttons**, and the picture or cards on the right.

### Step 5 – Coding the Collection page (the home page)

The Collection page is the app's **home page** (`/home`). The code was written so it can grow later.

#### Files

| File | What it does |
|---|---|
| `src/index.html` | Loads the Figtree font from Google Fonts |
| `src/styles.css` | Styles for the whole app: the color tokens as CSS variables, a small reset, the buttons and the big title style |
| `src/app/models/card.ts` | Describes what a card *is* (its TypeScript types) and has small helper functions |
| `src/app/data/sample-collection.ts` | The 15 sample cards from the design |
| `src/app/components/pokemon-card/` | The card as a **reusable component** (`.ts`, `.html`, `.css`, `.spec.ts`) |
| `src/app/pages/home-page/` | The Collection page (`.ts`, `.html`, `.css`, `.spec.ts`) |

#### How it works

**Design tokens in CSS.** The Figma colors are saved once as CSS variables, for example `--text-primary: #151515`.
The rest of the code writes `var(--text-primary)` instead of a color code, so the app always matches the design.

**The data model (`card.ts`).**

- A `Card` has a `number`, `name`, `type`, `hp`, `rarity`, `copies` and `isNew`.
- TypeScript checks this, so a mistake like `'Fyre'` instead of `'Fire'` is caught right away.
- A `CollectionSlot` is one spot in the grid: either a card, or `null` for a card you don't have yet (shown as the dashed box).
- Helpers: `formatNumber(25)` gives `"#025"`, and `artworkUrl(25)` gives the address of Pikachu's picture.

**The card component (`pokemon-card`).**

- It receives one card with `input.required<Card>()` and is used like `<app-pokemon-card [card]="myCard" />`.
- `computed()` works out the picture address, the number text and how many rarity diamonds are black.
- The template uses `@if` to show the "NEW" tag (or "×3" for duplicates) and `@for` to draw the 4 diamonds.
- It is a separate component so the Open Pack page can reuse the same card later.

**The Collection page (`home-page`).**

- **Signals** hold the state. A signal is a value Angular watches; when it changes, the page updates by itself:
  - `activeType` is the selected tab
  - `search` is the search text
  - `sortBy` is Number or Name
  - `shownCount` is how many cards are visible
- **Computed values** are worked out from the signals:
  - `ownedCount` gives the "12" in "12 / 151"
  - `progress` gives the width of the progress line
  - `filteredSlots` keeps only the cards that match the tab and the search, sorted
  - `shownSlots` and `hasMore` decide whether "Load more" is needed
- **Actions** are the functions the buttons call: `selectType()`, `setSearch()`, `setSort()`, `loadMore()`.
- The header links use `routerLink`. `routerLinkActive` turns the button of the page you are on black.
- The template has 5 sections, in the same order as the Figma frame: header → title and progress → tabs, search and sort → card grid → "Load more".
- The grid uses `repeat(auto-fill, minmax(208px, 1fr))`: as many columns as fit. That is 5 on a laptop and 2 on a phone.
- All sizes come from Figma (92 px side margins, 1256 px content width, 24 px between cards, and so on).

**Teamwork note.** While the page was being written, a teammate pushed commits that added `RouterLink` to the pages and an "Open Packs" button on the home page.
The new code was built on top of those commits. The "Open packs" link in the new header replaces that button.

### Step 6 – Testing and checking

1. **Automatic tests (Vitest).** 5 new tests, all passing. They check that:
   - the page shows 12 cards and 3 empty spots
   - the counter says "12 / 151"
   - the Fire tab only shows Charmander and Charizard
   - searching "pika" finds Pikachu
   - a card shows its name, "#025", the NEW tag and 3 black diamonds
2. **Build:** `ng build` works with no errors.
3. **In the browser:** the page was opened in Chrome and compared with the Figma design. Tabs, search and "sort by name" were clicked and worked.
4. **Phone size (390 px wide):**
   - Two problems were found: the tabs wrapped onto two lines (the black underline collided with the next line), and "Sort by" broke into two lines.
   - Fixed: on phones the tabs stay on one line you can swipe sideways, and "Sort by" never wraps.
5. **Formatting:** all new files follow the project's Prettier settings.

### Step 7 – Coding the Login and Open Packs pages

The other two pages were built the same way as the Collection page, with the sizes and colors taken from Figma.
Some parts were made **shared**, so all pages use the same code.

#### New and changed files

| File | What it does |
|---|---|
| `src/app/pages/login/` | The **Login** page |
| `src/app/pages/open-packs/` | The **Open Packs** page, with all 4 steps from Figma |
| `src/app/components/app-header/` | The header (Open packs / Collection / "A"), now shared by two pages |
| `src/app/components/booster-pack/` | The black **booster pack** that you can tear open |
| `src/app/services/collection.service.ts` | Keeps the player's cards and saves them in the browser |
| `src/app/data/card-set.ts` | All 15 cards that can come out of a pack, plus the starter collection (replaces `sample-collection.ts`) |
| `src/app/data/booster-pack.ts` | Makes a random pack of 5 cards |
| `src/testing/memory-storage.ts` | A fake browser storage, only for the tests |
| `public/images/` | The pixel-art Pikachu, the pack picture and the zigzag edge, exported from Figma |
| `src/styles.css` | Now also has the split layout (left content, right panel) shared by Login and Open Packs |
| `src/app/app.html` | The old test links ("Home / Open Packs / Login") were removed |

#### The Login page

- The same split layout as in Figma: title, Username, Password with **Show/Hide**, "Log in" and "Create account", and the pixel-art Pikachu on the right.
- Both buttons check that the fields are filled in. If not, a message appears: *"Please fill in your username and password."*
- There is **no backend yet**, so no real accounts or password checks. After the check, the app goes to the Collection page. The code has a comment showing where the backend call would go later.
- On phones the Pikachu picture is hidden, so only the form shows.

#### The Open Packs page (4 steps)

1. **Sealed:** the pack with "Drag across the dotted line" above it and an animated dot that shows how to drag.
2. **Tearing:**
   - you drag your mouse or finger across the dotted line
   - the top strip lifts more the further you drag, and the left side shows "Keep pulling" with a percentage
   - the "Open pack" button tears the pack by itself instead
3. **Opening:** the strip flies off and white cards slide out of the pack.
4. **Reveal:**
   - the cards are shown one by one, big, with a flip animation and the face-down pile behind them
   - the text depends on the card: *"A rare one, nice pull!"*, *"New card for your collection!"* or *"You already have this one."*
   - 5 small lines show how many cards you have seen
5. **Summary:**
   - all 5 cards are fanned out like a hand of cards, with the rare card in the middle
   - the text says how many new cards you got
   - two buttons: "Open next pack" and "View collection"

"Skip animation" goes straight to the summary.

#### How it works

- **Random packs (`booster-pack.ts`):**
  - each of the first 4 cards is Common (60%), Uncommon (30%) or Rare (10%)
  - the 5th card is always **Rare (80%) or Ultra rare (20%)**, like a real pack ("1 rare or better")
- **Shared collection (`collection.service.ts`):**
  - a *service* is a class that all pages share, so the Open Packs page and the Collection page see the same cards
  - opening a pack adds the cards: a card you didn't have gets the **NEW** tag, a card you already had gets one more copy (×2, ×3 …)
  - the collection is saved in the browser with **localStorage**, so it is still there after a reload
- **The booster pack component:**
  - `progress` is a two-way value (`model()`): the pack changes it while you drag, and the page changes it when you press "Open pack"
  - when the pack is fully torn it sends an `opened` message to the page
  - the drag uses **pointer events**, so it works with both a mouse and a finger (`touch-action: none` stops the phone from scrolling while you drag)
- **The 3 empty spots on the Collection page** (#012 Butterfree, #068 Machamp, #149 Dragonite) can now really be pulled from a pack. Then the empty spot becomes a card.

#### Testing and checking

- **Automatic tests:** 18 tests, all passing. New ones check that:
  - the login shows an error for empty fields and opens the collection when it is filled in
  - "Show" reveals the password
  - "Skip animation" gives 5 cards and saves them
  - cards are revealed one by one
  - a pack always has 5 cards and the last one is rare or better
  - the collection adds new cards and copies and saves them

  The old default test that always failed was fixed.
- **Real browser:** a script controlled Chrome and went through the whole app, saving a screenshot of every step:
  - log in → open a pack by dragging → reveal all 5 cards → summary → collection
  - the same on a phone-size screen

  In one run, Butterfree came out of the pack: the counter went from 12 to 13 / 151 and its empty spot became a card with a NEW tag.

### Step 8 – Only logged-in players can open packs

We wanted the Open Packs page to be **locked until you log in**, with one built-in account:

- **Username:** `user`
- **Password:** `password`
  - in the code it is only stored as `cGFzc3dvcmQ=`, which is "password" in **base64**
  - base64 is a way of writing text with other letters; `btoa()` in JavaScript makes it

#### How it works

| File | What it does |
|---|---|
| `src/app/services/auth.service.ts` | Checks the login and remembers if you are logged in |
| `src/app/guards/auth.guard.ts` | Blocks the Open Packs page when you are logged out |
| `src/app/app.routes.ts` | `canActivate: [authGuard]` added to the `open-packs` route |
| `src/app/pages/login/login.ts` | Uses the AuthService to check the username and password |
| `src/app/components/app-header/` | The "A" circle now really logs you out |

1. **Logging in:**
   - the AuthService turns the typed password into base64 with `btoa()` and compares it with `cGFzc3dvcmQ=`
   - it also checks that the username is `user`
   - right → you are logged in and go to the Collection page; wrong → *"Wrong username or password."*
2. **Remembering it:** "logged in" is saved in the browser's localStorage (`packvault-logged-in`), so a reload does not log you out.
3. **The guard:**
   - a *route guard* runs before Angular opens a page
   - for `/open-packs` it asks the AuthService: logged in → the page opens; logged out → you are sent to `/login`
4. **Logging out:** clicking the "A" circle logs you out and opens the login page.
5. **"Create account"** shows *"Creating new accounts isn't possible yet."*, because there is only one built-in account.

The Collection page is still open for everyone; only opening packs needs a login.

#### Testing

- 7 new tests (25 in total, all passing). They check:
  - right and wrong passwords
  - that the login is remembered
  - that the guard sends you to `/login` when logged out and lets you in when logged in
- In a real browser:
  - logged out → `/open-packs` sent us to `/login`
  - a wrong password showed the error
  - the right one logged us in, and Open Packs worked, also after a reload
  - after clicking "A", Open Packs was locked again

#### Good to know (for the report)

Base64 is **not encryption**. Anyone can turn `cGFzc3dvcmQ=` back into "password" in one second, and the check runs in the browser, where anyone can read the code or set `packvault-logged-in` to `true`.
That is fine for a school project. A real app checks the password on a **server** and stores it as a **hash** (for example with bcrypt), which cannot be turned back into the password.

### Step 9 – "Clear saved data" instead of "Create account"

- **Removed the "Create account" button.** There is only one built-in account, so it could not do anything.
- **Added a "Clear saved data" button** in the same place on the Login page. It:
  1. logs you out and puts the collection back to the 12 starter cards in the app's memory (`AuthService.logOut()` and the new `CollectionService.reset()`)
  2. deletes everything the app saved in the browser with `localStorage.clear()`, which removes `packvault-collection` and `packvault-logged-in`
  3. shows *"Saved data cleared. Your collection is back to the starter cards."*

  Step 1 is needed because the app also keeps the data in memory (signals). Only clearing localStorage would leave the old cards on screen until a reload.
- Handy before a demo: the app starts again like the first visit.
- The small text under the fields is now called `message` instead of `error`, because it is not always an error.
- **Testing:**
  - 1 new test (26 in total, all passing)
  - in a real browser: after opening a pack, both saved keys were there; after "Clear saved data" localStorage was empty, the collection showed 12 / 151 and Open Packs was locked again

### Step 10 – Clear "Log in" / "Log out" buttons in the header

The "A" circle that secretly logged you out felt weird, so the header was changed (approved before the change):

```
Logged in:   [Open packs] [Collection]           Clear saved data   [Log out]
Logged out:  [Open packs] [Collection]                              [Log in]
```

- **Log out** (outlined button): logs you out and opens the Login page.
- **Log in** (black button): opens the Login page. Only seen on the Collection page, because Open Packs already sends logged-out players to Login.
- **Clear saved data** moved from the Login page to the header and only shows when you are logged in.
  - It is small grey text, so it is not clicked by accident.
  - It does the same as before (deletes the cards and the login, collection back to 12 starter cards), then opens the Login page.
- The Login page now only has the **Log in** button.
- The header uses `@if (isLoggedIn())` to choose which buttons to show, so it changes by itself when you log in or out.
- **Files:** `components/app-header/` (html, ts, css + a new test file) and `pages/login/` (button removed).
- **Testing:**
  - 4 new header tests (29 in total, all passing)
  - in a real browser: logged out showed "Log in"; logged in showed "Clear saved data" + "Log out" on both Collection and Open Packs; "Log out" went to the Login page; the phone layout had no sideways scrolling

---

## 4. Problems we ran into and how we solved them

| Problem | Solution |
|---|---|
| The Figma tools did not appear after the first approval | Connected again with a new link |
| Version 1 had too many colors and looked "AI-made" | Started over in a light black-and-white style based on a reference image |
| See-through colors became solid in copies of components (Figma takes the see-through amount from the color variable itself) | Made the see-through amount part of the color variables |
| Figma cannot download pictures from the internet | Made the pictures on the computer, uploaded them once, then reused them |
| The clouds in the Pikachu picture had dark edges and a hole | Rebuilt the clouds from soft, overlapping round shapes |
| Charizard blended into the orange sunset on the pack | Changed the background to a blue sky |
| Black card backs were invisible inside the black pack | Showed white cards sliding out instead |
| A teammate pushed new commits while the code was being written | Read their changes first and built on top of them |
| On phones the tabs and "Sort by" broke onto two lines | Tabs swipe sideways on phones; "Sort by" never wraps |
| Tests failed with "localStorage.clear is not a function" (Node 25 has its own localStorage that hides the browser one in tests) | Made a small fake storage that the tests use; the real app uses the browser's storage |
| The browser extension could not take screenshots | Wrote a small script that controls Chrome directly and saves screenshots |
| The "View collection" button was underlined (it is a link) | Removed the underline for every link that looks like a button |
| On phones the hint touched the top of the panel and the fanned cards were cut off | More space above the pack, and a smaller fan on phones |

---

## 5. Why we made these design choices

- **Black and white with one accent (the Pokémon):** the cards are the important part, so everything else stays quiet.
- **Split layout (text left, picture right):** taken from the reference image. Every page uses it, so the app feels like one product.
- **Pixel-art pictures:** match the style of the reference and look different from normal Pokémon artwork.
- **Underline inputs and only two button styles:** fewer kinds of elements make it look calmer and more professional.
- **Only the essentials on each screen** (title, one line, buttons): our own edits showed that removing extra text made the screens much cleaner.
- **Components and tokens:** change something once and it updates everywhere, in Figma and in the code.
- **A reusable card component in the code:** the same card is needed on the Collection page and on the Open Pack page.
- **Sample data in its own file:** the page works now, and the real data can replace the sample later without changing the page.

---

## 6. What is finished and what is left

**Finished**

- Figma design for all three pages (Login, 4 Open Pack screens, Collection) plus all the components
- All three pages coded in Angular: **Login**, **Open Packs** and **Collection**
- Opened cards are saved in the browser and show up on the Collection page
- 18 automatic tests, all passing; every page checked in a real browser on laptop and phone size

**Still to do / ideas**

- A real backend for accounts, so "Log in" and "Create account" check real users (now they only check that the fields are filled in)
- Save the collection on a server instead of only in the browser, so it follows the player to other devices
- Add more of the 151 cards to `src/app/data/card-set.ts`
- Show the player's real first letter in the "A" circle
- Optional: start the app on the Login page instead of the Collection page (change the `''` route in `app.routes.ts`)
- Optional: link the Figma screens together as a clickable prototype

---

## 7. Sources and credits

- **Pokémon artwork:** official artwork from the PokéAPI sprites collection (github.com/PokeAPI/sprites). Pokémon and all artwork belong to Nintendo / Game Freak / The Pokémon Company. We use it only for this school project, not for anything public or commercial.
- **Font:** Figtree, free from Google Fonts (SIL Open Font License).
- **AI assistance:** the Figma file and the code were produced with Claude Code, an AI coding assistant, based on our instructions, our reference image and our feedback. We reviewed and edited the result ourselves (see Step 4).
