# Gnolex AI

A scroll-driven narrative site for Gnolex AI, a premium Indian tea brand.

The hero is an 800vh section with a sticky full-viewport canvas. The video never
autoplays — a hidden `<video>` element acts purely as a decode source. On load it
buffers, seeks frame by frame, and stores each frame as a JPEG blob; scroll
position then maps to a frame index, and one frame is drawn per animation frame.

## Run

```bash
npm install
node server.js
```

http://localhost:3000

## Layout

```
server.js          Express static server, port 3000, byte-range enabled for the mp4
public/index.html  The entire site — all CSS and JS inline
public/1.mp4       Source reel for the hero sequence
public/*.jpg       Product photography for the collection cards
```

## Notes

- GSAP 3 + ScrollTrigger are loaded from CDN. Express is the only dependency.
- Frame count adapts to the device: 220 on desktop, 150 on low-memory machines,
  110 on mobile. Capture width is capped at 1600px. Extracting all ~1200 frames
  at full resolution would need roughly 10 GB of bitmap, so it samples instead.
- First load takes 8–15 seconds while frames are extracted; that is what the
  progress bar is for. If extraction fails, the loader still clears and the site
  opens on a static frame.
- The newsletter section looks for `public/newsletter-bg.jpg`. It is not in the
  repo — until one is added, a frame grabbed 62% of the way through the video is
  injected at runtime via the `--news-bg` custom property.
- Product images are 2752×1536 and render into a 220px-tall box. Resize them
  before deploying anywhere real.
