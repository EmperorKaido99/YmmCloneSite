# Skill: video-section.md
# Use this when adding a video background to any section.

## Rules
1. Always use: autoplay muted loop playsinline
2. Always include a poster= fallback image
3. Wrap video in a position:relative container
4. Video itself: position absolute, inset:0, width:100%, height:100%, object-fit:cover
5. Add a dark overlay div after the video (position:absolute, inset:0)
6. All text content goes in a position:relative z-index:2 container

## Template HTML
```html
<section class="[section-name]" id="[id]">
  <div class="[section-name]-video-wrap">
    <video autoplay muted loop playsinline poster="images/[name]-poster.jpg">
      <source src="videos/[filename].mp4" type="video/mp4">
    </video>
    <div class="[section-name]-overlay"></div>
  </div>
  <div class="[section-name]-content">
    <!-- text content here -->
  </div>
</section>
```

## Template CSS
```css
.[section-name] {
  position: relative;
  overflow: hidden;
}
.[section-name]-video-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.[section-name]-video-wrap video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.[section-name]-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55); /* adjust opacity as needed */
}
.[section-name]-content {
  position: relative;
  z-index: 2;
}
```
