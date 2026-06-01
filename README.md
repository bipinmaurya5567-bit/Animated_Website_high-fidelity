# Animated Website High-Fidelity

A high-fidelity animated website built with Next.js, Tailwind CSS, and PostCSS — featuring smooth animations, reusable components, and a polished production-ready UI.

## 🚀 Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Framer Motion 12**
- **Tailwind CSS 4**
- **TypeScript**
- **PostCSS**

## ⚙️ Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

🖼️ Image Sequence Animation
Add 120 JPEG frames to public/headphones-sequence/:
File names: frame-001.jpg through frame-120.jpg
Resolution: 8K quality (recommended 7680×4320)
Background: Must match #050505 for seamless effect
Frame Breakdown
Frames
Animation Stage
1–18
Fully assembled headphones (hero)
19–48
Soft explosion — parts begin separating
49–78
Fully exploded — technical diagram view
79–108
Components highlight
109–120
Reassembly to final hero

📁 Project Structure
├── app/          # Next.js App Router pages
├── components/   # Reusable UI components
├── data/         # Static data files
├── public/images # Static assets
└── src/          # Source files

📝 Notes
Dev server uses webpack due to Windows platform limitations
Build: npm run build (uses webpack)
📄 License
MIT License
---

Just copy everything between the outer code fences and paste it into your `README.md` file, then push using the git commands from before.
