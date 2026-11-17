# Service Card Hover Effect - Visual Guide

## Desktop View

### Normal State
```
┌─────────────────────────────────────┐
│                                     │
│   [Service Card Image]              │
│                                     │
├─────────────────────────────────────┤
│                                     │
│   01 - Private Acupuncture          │
│                                     │
│   Description text goes here...     │
│                                     │
│   Pricing Groups:                   │
│   • Regular rates                   │
│   • OVPAC members                   │
│                                     │
└─────────────────────────────────────┘
```

### Hover State
```
┌─────────────────────────────────────┐
│                                     │
│   [Service Card Image]              │
│                                     │
├─────────────────────────────────────┤
│          [Dark Overlay              │
│           with Blur]        EN SAVOIR │
│                             PLUS →   │
│   Description text          (visible  │
│   still visible beneath)    at top-   │
│                             right)    │
│   Pricing Groups:                   │
│   • Regular rates                   │
│   • OVPAC members                   │
│                                     │
└─────────────────────────────────────┘
```

## Interaction Flow

1. **Mouse Enters Card**
   - Semi-transparent overlay fades in (320ms)
   - "EN SAVOIR PLUS →" text appears at top-right
   - Cursor changes to pointer
   - Card shadow effect enhances

2. **Text Position**
   - Located at the **top-right corner**
   - Padding: 28px from edges
   - Uppercase text
   - Arrow icon follows text

3. **Click Anywhere**
   - Entire card is clickable
   - Navigates to service detail page
   - Works on mobile too

## Styling Details

### Overlay Properties
- **Background:** Dark green-gray (rgba(44, 56, 44, 0.85))
- **Opacity:** Starts at 0, transitions to 1 on hover
- **Transition:** 320ms ease
- **Blur:** 4px backdrop blur for glass effect
- **Border Radius:** 54px (matches card)

### Text Properties
- **Font Size:** 16px (14px on mobile)
- **Font Weight:** 500 (medium)
- **Color:** White (primary-foreground)
- **Style:** Uppercase
- **Arrow:** → (automatically added after text)
- **Letter Spacing:** 0.5px

## Mobile Behavior

- Overlay still appears on touch/hover
- Responsive font sizing (14px on small screens)
- Full card remains clickable
- Same navigation behavior as desktop

## Accessibility

✅ Semantic HTML: Uses `<a>` tag for navigation
✅ Cursor feedback: Pointer cursor indicates clickability
✅ Color contrast: Dark overlay with light text
✅ No pointer-events on overlay until hover (prevents accidental clicks)
✅ Screen readers: "Learn more" text is visible and readable
