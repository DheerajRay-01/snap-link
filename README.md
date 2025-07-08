# 📌 Snap Link – Advanced URL Shortener 🔗

Snap Link is a **full-stack URL shortening platform** with powerful features like **GitHub OAuth login**, password-protected links, click limits, QR code generation, and real-time analytics.

Built for developers and teams to manage and track their links securely.

---

## 🌟 Features

* ✨ **Shorten URLs** instantly.
* 🔐 **GitHub Login** – Secure authentication using GitHub OAuth.
* 🏷️ **User-Specific Links** – Manage your own links after login.
* 📊 **Link Analytics** – Track total clicks, unique visitors, devices, and locations.
* 🎯 **Click Limits** – Expire links after a set number of clicks.
* 🔄 **Activate/Deactivate Links** – Toggle availability of short links anytime.
* 📥 **QR Code Generator** – Create and download QR codes for your links.
* 🎨 **Custom Aliases** – Friendly URLs like `snap.link/myblog`.
* 📱 **Fully Responsive** – Works on all screen sizes.

---

## 🚀 Tech Stack

| Layer          | Technologies                                                 |
| -------------- | ------------------------------------------------------------ |
| Frontend       | React.js, TailwindCSS, DaisyUI, Redux Toolkit, Framer Motion |
| Backend        | Node.js, Express.js, MongoDB, Mongoose, Passport.js          |
| Authentication | GitHub OAuth 2.0 (passport-github2), JWT                     |
| QR Code        | qrcode.js                                                    |
| Analytics      | ua-parser-js                                                 |
| Others         | Cloudinary (media storage), NanoID (short link IDs)          |

---

## 🔐 GitHub Login (OAuth 2.0)

Snap Link uses **Passport.js** with the **GitHub OAuth strategy** for authentication.
Users log in securely with their GitHub account to:
✅ Create and manage links
✅ View personal analytics
✅ Ensure all features are tied to their account

---

## 📂 Folder Structure

```
snap-link/
├── frontend/        # React frontend (Vite + Tailwind)
│   ├── src/
│   ├── public/
│   └── ...
├── backend/         # Express backend API
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── ...
└── README.md
```

---


## 📦 Prerequisites

* Node.js >= 18
* MongoDB Atlas account
* GitHub OAuth App (Client ID & Client Secret)

---


## 🏆 Why Snap Link?

✅ Secure authentication with GitHub OAuth
✅ User-specific link management
✅ Advanced analytics & QR support
✅ Modern responsive UI

---

## ✨ Future Scope

* 🧑‍💻 Multi-provider login (Google, Twitter)
* 📥 Bulk URL shortening
* 🌎 Geo-location based analytics
* 📦 Browser extension

---

## 👨‍💻 Author

* **Dheeraj Ray**
   💼 [LinkedIn](https://www.linkedin.com/in/dheeraj-ray-628853291/) | 🐙 [GitHub](https://github.com/DheerajRay-01)
