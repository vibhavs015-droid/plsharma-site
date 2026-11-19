# T14 live verification (post-deploy)

- Date: 2026-11-19 14:47
- Deploy: 6afebe0f3ea8939bbf262b83 (prod quick-fix round), built from `2260945` (first pass this run: 6afde0b5 from `5603bcb`, 78/78)
- URL: https://plsharma-site-preview.netlify.app
- Method: direct HTTP probe of every surface (PS5.1), scripts stripped before DOM-text counts

| Item | Surface | Expected | Actual | Result |
|---|---|---|---|---|
| A-http | / | 200 | 200 | PASS |
| A-eyebrow | / | HOME | HOME | PASS |
| A-old-eyebrow-gone | / | absent | absent | PASS |
| G-mailto-prefill | / | all prefilled (>=2) | 2 prefilled / 2 total | PASS |
| G-tel | / | >=1 | 5 | PASS |
| G-maps | / | >=1 | 1 | PASS |
| A-http | /about | 200 | 200 | PASS |
| A-eyebrow | /about | ABOUT | ABOUT | PASS |
| A-old-eyebrow-gone | /about | absent | absent | PASS |
| G-mailto-prefill | /about | all prefilled (>=2) | 2 prefilled / 2 total | PASS |
| G-tel | /about | >=1 | 4 | PASS |
| G-maps | /about | >=1 | 1 | PASS |
| A-http | /faq | 200 | 200 | PASS |
| A-eyebrow | /faq | FAQ | FAQ | PASS |
| A-old-eyebrow-gone | /faq | absent | absent | PASS |
| G-mailto-prefill | /faq | all prefilled (>=2) | 2 prefilled / 2 total | PASS |
| G-tel | /faq | >=1 | 4 | PASS |
| G-maps | /faq | >=1 | 1 | PASS |
| A-http | /book | 200 | 200 | PASS |
| A-eyebrow | /book | BOOK | BOOK | PASS |
| A-old-eyebrow-gone | /book | absent | absent | PASS |
| G-mailto-prefill | /book | all prefilled (>=2) | 3 prefilled / 3 total | PASS |
| G-tel | /book | >=1 | 3 | PASS |
| G-maps | /book | >=1 | 1 | PASS |
| A-http | /contact | 200 | 200 | PASS |
| A-eyebrow | /contact | CONTACT | CONTACT | PASS |
| A-old-eyebrow-gone | /contact | absent | absent | PASS |
| G-mailto-prefill | /contact | all prefilled (>=2) | 3 prefilled / 3 total | PASS |
| G-tel | /contact | >=1 | 5 | PASS |
| G-maps | /contact | 3 | 3 | PASS |
| A-http | /privacy | 200 | 200 | PASS |
| A-eyebrow | /privacy | PRIVACY | PRIVACY | PASS |
| A-old-eyebrow-gone | /privacy | absent | absent | PASS |
| G-mailto-prefill | /privacy | all prefilled (>=2) | 4 prefilled / 4 total | PASS |
| G-tel | /privacy | >=1 | 5 | PASS |
| G-maps | /privacy | >=1 | 1 | PASS |
| A-http | /services | 200 | 200 | PASS |
| A-eyebrow | /services | SERVICES | SERVICES | PASS |
| A-old-eyebrow-gone | /services | absent | absent | PASS |
| G-mailto-prefill | /services | all prefilled (>=2) | 2 prefilled / 2 total | PASS |
| G-tel | /services | >=1 | 4 | PASS |
| G-maps | /services | >=1 | 1 | PASS |
| A-http | /testimonials | 200 | 200 | PASS |
| A-eyebrow | /testimonials | TESTIMONIALS | TESTIMONIALS | PASS |
| A-old-eyebrow-gone | /testimonials | absent | absent | PASS |
| G-mailto-prefill | /testimonials | all prefilled (>=2) | 2 prefilled / 2 total | PASS |
| G-tel | /testimonials | >=1 | 4 | PASS |
| G-maps | /testimonials | >=1 | 1 | PASS |
| A-http | /why-choose-us | 200 | 200 | PASS |
| A-eyebrow | /why-choose-us | WHY CHOOSE US | WHY CHOOSE US | PASS |
| A-old-eyebrow-gone | /why-choose-us | absent | absent | PASS |
| G-mailto-prefill | /why-choose-us | all prefilled (>=2) | 2 prefilled / 2 total | PASS |
| G-tel | /why-choose-us | >=1 | 4 | PASS |
| G-maps | /why-choose-us | >=1 | 1 | PASS |
| C-home-bio | / | full bio (4 sentences) | present | PASS |
| C-about-hero-bio | /about | 3-sentence bio present | present | PASS |
| C-about-free-line | /about | exactly 1 (sec 02) | 1 | PASS |
| B-placeholders | /about | 0 | 0 | PASS |
| E-team-names | /about | 3 names present | present | PASS |
| E-no-team-sample-tag | /about | 0 in team (preview quote tag = 1 total) | 0 | PASS |
| E-team-section-clean | /about | no sample-tag after The team | clean | PASS |
| F-contact-section02 | /contact | section renders | present | PASS |
| F1-home-figures | / | 01,02,03,04 gapless | 01,02,03,04 | PASS |
| F3-testimonials-mark | /testimonials | 0 | 0 | PASS |
| F3-home-mark | / | 0 | 0 | PASS |
| F3-testimonials-note | /testimonials | visitor-language note present | present | PASS |
| D-plate-webp | /images | 200, 103626 bytes | 200, 103626 bytes | PASS |
| D-plate-avif | /images | 200, 119901 bytes | 200, 119901 bytes | PASS |
| H-404-status | /t14-no-such-page | 404 | 404 | PASS |
| H-404-branded | /t14-no-such-page | That page isn't here. | present | PASS |
| H-404-default-copy | /t14-no-such-page | absent | absent | PASS |
| A-eyebrow | 404 | 404 | 404 | PASS |
| H-404-noindex | 404 | noindex meta | present | PASS |
| H-xrobots | / | noindex, nofollow | noindex, nofollow | PASS |
| H-xrobots | /privacy | noindex, nofollow | noindex, nofollow | PASS |
| H-xrobots | robots.txt | noindex, nofollow | noindex, nofollow | PASS |
| H-xrobots | 404 | noindex, nofollow | noindex, nofollow | PASS |
| H-robots-guard | robots.txt | Disallow: / | present | PASS |
| H-sitemap | sitemap.xml | 8 locs, preview host | 8 locs, hostOk=True | PASS |
| H-internal-links | all internal | 0 broken of 8 | 0 broken | PASS |
| H-maps-external | https://maps.app.goo.gl/Ap3EUniM15RsW7oCA | 200/3xx final | 200 | PASS |
| H-wa-external | https://wa.me/919829771396?text=Hello%20P.L.%20Sharma%20And%20Company%2C%20I%20would%20like%20to%20book%20a%20consultation%20%E2%80%94%20via%20the%20website&#x27;s%20home%20page. | 200/3xx final | 200 | PASS |

**Summary: 82 passed, 0 failed.**
