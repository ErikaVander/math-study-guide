# Math Study Guide — Adding New Video Cards

## Quick Start

When you record a new video, you need to:
1. Add a new card to `index.html` in the right chapter section
2. Create an SVG thumbnail following the rules below
3. Add the video to the catalog in `netlify/functions/match-problem.mjs`
4. Deploy with `netlify deploy --prod`

---

## SVG Thumbnail Rules

### Background Template (REQUIRED for every card)
Every thumbnail uses this exact background. Use the next available grid number (check the highest existing `gridN` ID and increment).

```xml
<svg viewBox="0 0 290 158" xmlns="http://www.w3.org/2000/svg">
<rect width="290" height="158" fill="#faf8f2"/>
<defs><pattern id="gridN" width="14.5" height="14.5" patternUnits="userSpaceOnUse"><path d="M 14.5 0 L 0 0 0 14.5" fill="none" stroke="#c8d8e8" stroke-width=".4" opacity=".5"/></pattern></defs>
<rect width="290" height="158" fill="url(#gridN)"/>
<!-- card content here -->
</svg>
```

### Visual Style
- **Font**: `font-family="serif"` for all math text (textbook feel)
- **All text**: Must use `text-anchor="middle"` — position with calculated `x` values
- **No emojis, no monospace for math**

### Color Palette
| Use | Color | Hex |
|-----|-------|-----|
| Problem text (black) | Ink | `#1a1208` |
| Method/technique annotations | Green | `#2a6048` |
| Rules/identities (like √-1=i) | Blue | `#3b82f6` |
| Highlights, circled primes | Red | `#c9382a` |
| Operators (×, =, +) | Gray | `#888` |
| Fraction bars | Ink | `#1a1208` |

### Content Hierarchy (CRITICAL)
1. **Problem is the HERO** — largest element (font-size 18-26), centered
2. **Method/technique is secondary** — smaller (font-size 10-12), in green, below or beside
3. **Rules/identities** — small, in blue (like `x⁰ = 1` or `i² = −1`)

### Deciding What to Show on the Thumbnail

**Step 1: Watch the video (or review the frame at ~25 seconds) and ask: what does the student's homework problem look like?**

The thumbnail should show the PROBLEM the student will recognize from their homework, not a description of the concept.

**Step 2: Is there only one method to solve this, or multiple?**

- **One standard method** → Show the equation/expression big. If the method has a name (like "Rule of Four" or "Quadratic Formula"), add it in small green text as a label — but the equation is the star.

- **Multiple methods exist** (e.g., factoring vs quadratic formula vs completing the square) → Show the equation big, then below it show a SHORT green demonstration of what makes THIS video's method distinct. Examples:
  - Factoring video: green `(x + ?)(x + ?) = 0` below the equation
  - Quadratic formula video: green formula below the equation
  - Completing the square: green first step `x² − 5x + ___ = −4 + ___`

- **Video covers a VARIATION** (negatives, fractions, coefficients) → Show the variation problem itself big. The student needs to see that this specific wrinkle is covered. Don't show the basic version.

- **Video covers multiple problem types** (like "All Problem Types") → Show 2-3 examples stacked vertically with green "or" between them. Shrink font slightly (15-18) to fit. Each example should look visually different so the student can spot theirs.

- **Video teaches a foundational rule** (like exponent rules, imaginary number definitions) → Show the actual problem types that use the rule big, with the rule itself in small blue text at the top.

**Step 3: Verify by asking: "If a student is scanning these cards with their homework open, will they see their problem and think 'that's the one'?"**

If the answer is no, the thumbnail needs the actual equation from their homework, not an abstract concept.

### What NOT to Include
- ❌ No "Also covers" sections
- ❌ No variable identification (a=1, b=-6, c=2)
- ❌ No perfect squares lists or reference strips
- ❌ No full solutions or answers
- ❌ No step-by-step work (except one-step method demos like completing the square)
- ❌ No generic descriptions — show the ACTUAL problem type from the video
- ❌ No redundant simple examples when a harder variant is shown

### Centering (CRITICAL — never eyeball)

**Horizontal centering**: The viewBox is 290px wide. Center = x=145.
1. Find the leftmost pixel of all elements (text edges, circle radii, line endpoints)
2. Find the rightmost pixel
3. Midpoint must equal 145. If not, shift everything.
4. For text with `text-anchor="middle"`, the `x` value IS the center of that text

**Vertical centering**: The viewBox is 158px tall. Center ≈ y=79.
1. Measure total content height (title + problems + annotations)
2. Start at `(158 - totalHeight) / 2`

**Checking overlaps**: When placing elements side by side (like factor trees), compute:
- Right edge of left group (rightmost x + radius/width)
- Left edge of right group (leftmost x - radius/width)  
- Ensure gap ≥ 10px

### Fractions
Always use textbook-style fractions:
```xml
<!-- Numerator -->
<text x="145" y="60" font-size="18" fill="#1a1208" font-family="serif" text-anchor="middle">5</text>
<!-- Fraction bar — only slightly wider than the wider of num/denom -->
<line x1="125" y1="66" x2="165" y2="66" stroke="#1a1208" stroke-width="1.5"/>
<!-- Denominator -->
<text x="145" y="86" font-size="18" fill="#1a1208" font-family="serif" text-anchor="middle">√13</text>
```
- All three parts (num, bar, denom) use the SAME font-size
- Fraction bar extends only ~5px beyond the wider text on each side
- NEVER use slash `/` for fractions — always horizontal bars

### Multiple Examples with "or"
When showing multiple problem types, stack vertically with green italic "or":
```xml
<text x="145" y="65" font-size="18" fill="#1a1208" font-family="serif" text-anchor="middle">x² + 7x + 12</text>
<text x="145" y="81" font-size="10" fill="#2a6048" font-family="serif" font-style="italic" text-anchor="middle">or</text>
<text x="145" y="100" font-size="18" fill="#1a1208" font-family="serif" text-anchor="middle">x² − 16</text>
```

### Factor Trees
Use lines for branches, circles for primes:
```xml
<!-- Root -->
<text x="95" y="42" font-size="18" fill="#1a1208" font-family="serif" text-anchor="middle">12</text>
<!-- Branches -->
<line x1="85" y1="46" x2="68" y2="64" stroke="#1a1208" stroke-width="1.2"/>
<line x1="105" y1="46" x2="122" y2="64" stroke="#1a1208" stroke-width="1.2"/>
<!-- Children -->
<text x="68" y="76" font-size="14" fill="#1a1208" font-family="serif" text-anchor="middle">2</text>
<circle cx="68" cy="72" r="10" fill="none" stroke="#c9382a" stroke-width="1.2"/>
```

### Solve by Factoring Cards
- Green header: "Solve by Factoring"
- Green at bottom ONLY: `(x + ?)(x + ?) = 0`
- No other steps

### Quadratic Formula Cards
- Hero equation big at top
- Green formula below (no a/b/c identification, no answer)

### Pascal's Triangle
- Show in GREEN (it's a method/steps element)

### Chapter-Specific Rules
- **Ch6 (Fractional Exponents)**: These are about EVALUATING expressions where exponents are fractions (½, ¾). NOT about expanding (a+b)^n
- **Ch7 (Imaginary)**: Rules like √-1=i in BLUE
- **Ch8 (Conjugates)**: Rules like A+B → A-B in BLUE  
- **Ch9-10 (Binomial Expansion)**: These are about EXPANDING (a+b)^n where n is a whole number
- **Ch11 (Completing Square, last video)**: Show ONE example + first step in small green

---

## Adding a Video to the AI Matcher

In `netlify/functions/match-problem.mjs`, add an entry to the `VIDEOS` array:

```javascript
{ id: "YOUTUBE_VIDEO_ID", title: "Chapter X — Title", topics: "..." },
```

### Writing Good Topic Descriptions
- Include SPECIFIC example problems: `"like 3x² + 17x + 10 or (x−4)⁶"`
- State what it IS and what it is NOT: `"EXPANDING binomials... NOT about fractional exponents"`
- Use keywords a student would recognize from their homework
- Mention variations: negatives, fractions, coefficients

### Bad vs Good Descriptions
```
❌ "exponent problems, simplifying"
✅ "EVALUATING expressions where exponents are fractions like ½ or ¾, like (16^½)³. NOT about expanding binomials like (x+4)^6"

❌ "binomial expansion"  
✅ "EXPANDING (a+b)^n where n is a whole number ≥4, using binomial theorem. Like expanding (A+7)⁶ into all terms"
```

---

## HTML Card Template

```html
<div class="video-card">
  <div class="card-visual">
    <span class="card-num">#49</span>
    <span class="card-topic-badge" style="color:#e2b96f">Topic</span>
    <!-- SVG THUMBNAIL HERE -->
  </div>
  <div class="card-body">
    <div class="card-title"><a href="https://www.youtube.com/watch?v=VIDEO_ID" target="_blank">Chapter X — Title</a></div>
    <div class="card-desc">Description of what the student will learn...</div>
    <a class="watch-link" href="https://www.youtube.com/watch?v=VIDEO_ID" target="_blank">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      Watch Video
    </a>
  </div>
</div>
```

### Topic Badge Colors (from existing cards)
- Arithmetic: `#e2b96f`
- Algebra: `#7ec8e3`  
- Radicals: `#ff9b9b`
- Exponents: `#f4a261`
- Imaginary: `#d4a5ff`
- Conjugates: `#e6c07b`
- Binomials: `#98c379`
- Quadratics: `#e06c75` / `#61afef`
- Applied: `#56b6c2`

---

## Deployment Checklist

1. ☐ SVG uses grid paper background with unique pattern ID
2. ☐ All text uses `text-anchor="middle"` and `font-family="serif"`
3. ☐ Content is centered (calculated, not eyeballed)
4. ☐ Problem is the largest element, method is smaller and green
5. ☐ Fractions use horizontal bars, not slashes
6. ☐ No answers or full solutions shown
7. ☐ Multiple examples separated by green "or"
8. ☐ Video added to VIDEOS array in match-problem.mjs with specific topics
9. ☐ Header meta updated (video count, chapter count if new chapter)
10. ☐ Run `netlify deploy --prod` from the `math-study-guide-site` directory
