# ChefBot AI - Frontend Only

A modern AI-powered chatbot web application designed for restaurant use cases. This is a **frontend-only** version that provides a complete UI experience with mock API responses.

## 🚀 Features

### Authentication
- **Email/Password Signup & Login**: Traditional authentication with form validation
- **Google OAuth Integration**: One-click sign-in with Google
- **Protected Routes**: Secure access to dashboard features
- **User Profile Management**: Display user information and logout functionality

### AI-Powered Chat Interface (UI Only)
- **Food Image Analysis**: Upload food images (currently shows mock responses)
- **Text-to-Image Generation**: Generate custom food images from text prompts (currently shows mock responses)
- **Real-time Chat**: Interactive chat interface with message history
- **Multiple Chat Sessions**: Create and manage multiple chat conversations

### Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Glassmorphism Effects**: Modern design with subtle transparency and blur effects
- **Smooth Animations**: Micro-interactions and transitions throughout the interface
- **Professional Color Scheme**: Restaurant-themed orange/red gradient with complementary colors

### Dashboard Features
- **Sidebar Navigation**: Easy access to new chats, history, and settings
- **Chat History**: View and manage previous conversations
- **User Avatar**: Display user profile pictures or generated initials
- **Drag & Drop**: Upload images by dragging and dropping

## 🛠️ Tech Stack

### Frontend Only
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful SVG icons
- **Firebase SDK**: Authentication only
- **UUID**: For generating unique IDs

## 📋 Prerequisites

Before running this application, you need:

1. **Node.js** (v16 or higher)
2. **Firebase Project** with Authentication enabled (for Google Sign-in)

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration (for when you add your backend)
VITE_API_BASE_URL=http://localhost:3001/api
```

### 3. Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Get your Firebase configuration from Project Settings

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

This will start the frontend development server on `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📱 Current Functionality

### What Works (Frontend Only)
- ✅ User authentication (Firebase Auth)
- ✅ Complete chat interface
- ✅ Image upload UI
- ✅ Text input for prompts
- ✅ Chat history management
- ✅ Responsive design
- ✅ Mock API responses for demo

### What's Mocked
- 🔄 Image analysis (shows demo response)
- 🔄 Image generation (shows placeholder image)
- 🔄 API health checks

## 🔌 Adding Your Backend

To connect this frontend to your backend API:

1. **Update API Service**: Edit `src/services/api.js`
   - Uncomment the actual API calls
   - Comment out the mock responses
   - Update the API endpoints as needed

2. **Environment Variables**: Update your `.env` file
   - Set `VITE_API_BASE_URL` to your backend URL

3. **API Endpoints**: Your backend should provide:
   - `POST /api/analyze-image` - For image analysis
   - `POST /api/generate-image` - For image generation
   - `GET /api/health` - For health checks

## 🎨 Design Features

- **Clean Interface**: Minimal clutter with focus on content
- **Intuitive Navigation**: Easy-to-understand user flows
- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Performance**: Optimized loading and smooth animations
- **Drag & Drop**: Modern file upload experience

## 🔒 Security Features

- **Authentication Required**: All dashboard features require user authentication
- **File Upload Validation**: Images are validated for type and size (frontend only)
- **Input Sanitization**: User inputs are validated
- **Environment Variables**: Sensitive data stored securely

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AuthPage.jsx    # Login/Signup page
│   ├── Dashboard.jsx   # Main dashboard layout
│   ├── Navbar.jsx      # Top navigation
│   ├── Sidebar.jsx     # Left sidebar
│   ├── ChatArea.jsx    # Main chat interface
│   └── ProtectedRoute.jsx # Route protection
├── contexts/           # React contexts
│   ├── AuthContext.jsx # Authentication state
│   └── ChatContext.jsx # Chat state management
├── services/           # API services
│   └── api.js         # API service layer (mocked)
├── config/            # Configuration
│   └── firebase.js    # Firebase configuration
└── App.tsx            # Main app component
```

## 🚀 Next Steps

1. **Add Your Backend**: Connect to your preferred backend service
2. **Real AI Integration**: Implement actual OpenAI or other AI services
3. **Database**: Add persistent storage for chat history
4. **File Storage**: Implement proper image storage solution
5. **Advanced Features**: Add more restaurant-specific features

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

This is a frontend-only template. To make it fully functional:
1. Set up your backend API
2. Configure the API service in `src/services/api.js`
3. Update environment variables
4. Test the integration

The UI is complete and ready to connect to any backend service!