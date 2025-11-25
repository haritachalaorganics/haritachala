# Animation Components

This directory contains reusable animation components built with Framer Motion for the Haritachala Organics website.

## Components

### FadeIn

Fades in an element when it enters the viewport.

**Props:**

- `delay` (number, default: 0): Delay before animation starts in seconds
- `duration` (number, default: 0.6): Animation duration in seconds
- `className` (string): Additional CSS classes
- `once` (boolean, default: true): Whether animation should only play once

**Usage:**

```tsx
<FadeIn delay={0.2}>
  <div>Your content here</div>
</FadeIn>
```

### SlideUp

Slides an element up from below while fading in.

**Props:**

- `delay` (number, default: 0): Delay before animation starts in seconds
- `duration` (number, default: 0.7): Animation duration in seconds
- `distance` (number, default: 60): Distance to slide in pixels
- `className` (string): Additional CSS classes
- `once` (boolean, default: true): Whether animation should only play once

**Usage:**

```tsx
<SlideUp delay={0.3} distance={80}>
  <h1>Welcome</h1>
</SlideUp>
```

### ScaleIn

Scales an element from smaller to full size while fading in.

**Props:**

- `delay` (number, default: 0): Delay before animation starts in seconds
- `duration` (number, default: 0.8): Animation duration in seconds
- `scale` (number, default: 0.9): Initial scale value (1 = full size)
- `className` (string): Additional CSS classes
- `once` (boolean, default: true): Whether animation should only play once

**Usage:**

```tsx
<ScaleIn delay={0.4} scale={0.85}>
  <img src="..." alt="..." />
</ScaleIn>
```

### Parallax

Creates a parallax scrolling effect where the element moves at a different speed than the page scroll.

**Props:**

- `speed` (number, default: 0.5): Speed multiplier for the parallax effect
- `className` (string): Additional CSS classes

**Usage:**

```tsx
<Parallax speed={0.3}>
  <div className="background-element">Background</div>
</Parallax>
```

### Stagger

Container component that staggers the animation of its children.

**Props:**

- `staggerDelay` (number, default: 0.1): Delay between each child animation in seconds
- `className` (string): Additional CSS classes
- `once` (boolean, default: true): Whether animation should only play once

**Usage:**

```tsx
<Stagger staggerDelay={0.15}>
  <StaggerItem>
    <p>Item 1</p>
  </StaggerItem>
  <StaggerItem>
    <p>Item 2</p>
  </StaggerItem>
  <StaggerItem>
    <p>Item 3</p>
  </StaggerItem>
</Stagger>
```

### StaggerItem

Child component used within Stagger to animate individual items.

**Props:**

- `className` (string): Additional CSS classes

**Note:** Must be used as a direct child of the Stagger component.

## Animation Philosophy

All animations are designed to be:

- **Subtle**: Enhance the experience without being distracting
- **Smooth**: Use easing functions that feel natural
- **Performance-focused**: Use GPU-accelerated properties (transform, opacity)
- **Accessible**: Respect user's motion preferences (prefers-reduced-motion)

## Best Practices

1. **Use delays wisely**: Stagger elements with 0.1-0.2s delays for a polished feel
2. **Don't over-animate**: Not every element needs animation
3. **Keep it consistent**: Use similar animation styles throughout the site
4. **Test performance**: Ensure animations don't cause jank on slower devices
5. **Accessibility**: All animations respect the prefers-reduced-motion media query
