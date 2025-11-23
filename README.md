# Prashon Gautam - Professional Portfolio

A sophisticated, minimalist portfolio website showcasing full-stack development expertise. Built with Next.js 16, TypeScript, and a carefully curated muted color palette inspired by industrial design aesthetics.

## ✨ Features

- **Sophisticated Design**: Elegant muted color palette (Gunmetal, Shadow Grey, Bone, Taupe Grey)
- **Comfortable UX**: Spacious layouts with soft rounded corners and generous padding
- **Fully Responsive**: Seamless experience across all devices and screen sizes
- **Verified Contact Form**: Secure email verification system with 6-digit code authentication
- **Professional Branding**: Custom logo integration throughout the site
- **Optimized Performance**: Built with Next.js 16 and Turbopack for lightning-fast builds
- **SEO Ready**: Server-side rendering with metadata optimization

## 📋 Prerequisites

- **Node.js** (v18.17 or higher)
- **npm** or **yarn** package manager
- **Gmail account** with App Password enabled for contact form functionality

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Praashon/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### 4. Generate Gmail App Password

1. Visit [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Navigate to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **Mail** and generate a new password
5. Copy the 16-character password to your `.env.local` file

## 💻 Development

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🏗️ Production Build

```bash
npm run build
npm start
```

## 🌍 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables:
   - `EMAIL_USER`
   - `EMAIL_PASS`
4. Deploy with one click

### Netlify

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the output to [Netlify](https://netlify.com)
3. Add environment variables in the Netlify dashboard

## 📂 Project Architecture

```
portfolio/
├── app/
│   ├── api/
│   │   ├── contact/route.ts          # Contact form handler with email sending
│   │   └── verify-email/route.ts    # Email verification with 6-digit code
│   ├── components/
│   │   ├── Footer.tsx                # Footer with branding and links
│   │   ├── Navbar.tsx                # Navigation with custom logo
│   │   └── PageTransition.tsx        # Smooth page transitions
│   ├── about/page.tsx                # Professional background and skills
│   ├── contact/page.tsx              # Contact form with verification
│   ├── projects/page.tsx             # Project showcase with details
│   ├── globals.css                   # Global styles and animations
│   ├── layout.tsx                    # Root layout with metadata
│   └── page.tsx                      # Landing page
├── public/
│   ├── my_logo.png                   # Custom brand logo
│   └── mine.jpg                      # Profile photo
├── .env.local                        # Environment variables (gitignored)
├── next.config.ts                    # Next.js 16 configuration
├── package.json                      # Dependencies and scripts
└── tsconfig.json                     # TypeScript configuration
```

## 🎨 Customization Guide

### Personal Information

**Home Page** (`app/page.tsx`)
- Name, tagline, and introduction
- Social media links (GitHub, LinkedIn, Email)
- Profile photo and availability status

**About Page** (`app/about/page.tsx`)
- Work experience and duration
- Education history
- Technical skills and expertise
- Languages and hobbies
- Stats and achievements

**Projects Page** (`app/projects/page.tsx`)
- Project portfolio with descriptions
- Technology stacks and features
- GitHub repository links
- Personal notes and insights

**Contact Page** (`app/contact/page.tsx`)
- Email, phone, and location
- Social media profiles

### Design System

**Sophisticated Color Palette**
```css
--background: #F1F0EA;    /* Parchment - Main background */
--foreground: #2D232E;    /* Shadow Grey - Primary text */
--primary: #474448;       /* Gunmetal - Accents */
--secondary: #534B52;     /* Taupe Grey - Secondary text */
--warm-bg: #E0DDCF;       /* Bone - Subtle backgrounds */
```

**Branding**
- Replace `public/my_logo.png` with your custom logo
- Update `public/mine.jpg` with your profile photo
- Modify navbar and footer branding in components

## 🔒 Security Features

**Email Verification System**
- 6-digit verification code sent to user's email
- 10-minute code expiration for security
- Trusted email provider validation
- Protection against disposable/temporary emails
- Automated confirmation emails to senders
- Rate limiting and spam prevention

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router and Turbopack |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling with custom design system |
| **Nodemailer** | Email sending and verification |
| **React Icons** | Professional icon library |
| **Next.js Image** | Optimized image loading |

**Key Features**
- Server-side rendering (SSR)
- API routes for backend functionality
- Responsive design principles
- Custom animations and transitions
- SEO optimization with metadata

## 👨‍💻 About the Developer

**Prashon Gautam**  
Full Stack Developer | BCA Student | Kathmandu, Nepal

- 📧 Email: [mr.prashon@gmail.com](mailto:mr.prashon@gmail.com)
- 💼 GitHub: [@Praashon](https://github.com/Praashon)
- 🔗 LinkedIn: [mrprashon](https://www.linkedin.com/in/mrprashon/)
- 🌐 Portfolio: [Live Demo](https://your-portfolio-url.vercel.app)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Inspiration

This portfolio design was inspired by:
- Modern minimalist design principles
- Industrial color palettes
- Professional developer portfolios
- User-centric comfortable layouts

## ⭐ Show Your Support

If you found this portfolio inspiring or helpful, please consider giving it a star!

---

**Built with** ❤️ **by Prashon Gautam**
