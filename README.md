# Prashon Gautam - Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features smooth animations, email verification for contact forms, and a clean, professional design.

## 🚀 Features

- **Modern Design**: Clean and professional UI with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Contact Form**: Secure contact form with email verification
- **Email Integration**: Automated email notifications with nodemailer
- **Page Transitions**: Smooth page transitions using Framer Motion
- **SEO Optimized**: Built with Next.js for optimal SEO performance

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- A Gmail account for email functionality

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd prashon-portfolio-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Open `.env.local` and fill in your credentials:
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail App Password (see below)

4. **Get Gmail App Password**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Generate a new app password for "Mail"
   - Copy the 16-character password to your `.env.local`

## 🏃‍♂️ Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `EMAIL_USER`
   - `EMAIL_PASS`
5. Deploy!

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `.next` folder to Netlify
3. Add environment variables in Netlify dashboard

## 📁 Project Structure

```
prashon-portfolio-pro/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts          # Contact form API
│   │   └── verify-email/
│   │       └── route.ts          # Email verification API
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation component
│   │   └── PageTransition.tsx    # Page transition animations
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── projects/
│   │   └── page.tsx              # Projects page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── public/
│   └── mine.jpg                  # Profile image
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Example env file
├── .gitignore                    # Git ignore file
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎨 Customization

### Update Personal Information

1. **Home Page** (`app/page.tsx`)
   - Update name, title, description
   - Change social media links

2. **About Page** (`app/about/page.tsx`)
   - Update experience, education, skills
   - Modify stats and languages

3. **Projects Page** (`app/projects/page.tsx`)
   - Add/remove projects
   - Update project details and links

4. **Contact Info** (`app/contact/page.tsx`)
   - Update email, phone, location

### Change Colors

The color scheme is defined in Tailwind CSS. Main colors used:
- `#1d3557` - Dark blue
- `#457b9d` - Medium blue
- `#a8dadc` - Light blue
- `#f1faee` - Cream white
- `#e63946` - Red accent

## 📧 Contact Form Security

The contact form includes:
- Email verification (6-digit code)
- 10-minute code expiration
- Prevention of spam and fake emails
- Automated responses to senders

## 🔧 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Nodemailer** - Email functionality
- **React Icons** - Icon library

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Prashon Gautam**
- Email: mr.prashon@gmail.com
- GitHub: [@praashon](https://github.com/praashon)
- LinkedIn: [mrprashon](https://www.linkedin.com/in/mrprashon/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!
