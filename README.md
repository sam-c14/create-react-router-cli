## Create Feature Router 🚀

A cli tool for initializing a react-router app with any of the modes, and also a project scaffolding which conforms to the screaming arachitecture. A Feature based project skeleton just enough for you to get started.

## 🌟 Features

<br>🏗️Initialize a React Router Project with any of the modes: Declarative | Data | Framework. <br>
<br>📦 Built-in Feature Driven boilerplate with nice UIs<br>
<br>🧩 Component templates following best practices<br>
<br>🎨 Tailwind CSS styling integration<br>

## 🚀 Quick Start
Create New Project
```
npx create-feature-router my-app
# or
pnpm dlx create-feature-router my-app
# or
bunx create-feature-router my-app
```

Select the React Router mode you would like to initalize the project with and follow the remaining prompts.

### Generated Structure For Data/Declarative Mode
```
src/
├── assets/           # Static assets
│   ├── icons/
│   │   ├── index.ts
│   │   └── magnifying-glass.tsx
├── config/          # Shared App Configs
│   ├── constants/
│   ├── auth/
├── features/        # App Features
│   ├── auth/
│   │   ├── login.tsx
│   │   └── use-login.tsx
│   ├── shared/
|   │   ├── providers
│   │   │   ├── app-context.tsx
│   │   ├── layout
│   │   │   └── layout.tsx
│   ├── base/
│   │   └── layout.tsx
├── ui/             # App reusable UI components
│   ├── button/
│   └── drawer/
├── lib/            # Reusable utility functions
│   └── utils/ 
└── routes.ts
```

### Generated Structure For Framework Mode
```
app/
├── assets/           # Static assets
│   ├── icons/
│   │   ├── index.ts
│   │   └── magnifying-glass.tsx
├── config/          # Shared App Configs
│   ├── constants/
│   ├── auth/
├── features/        # App Features
│   ├── auth/
│   │   ├── login.tsx
│   │   └── use-login.tsx
│   ├── shared/
|   │   ├── providers
│   │   │   ├── app-context.tsx
│   │   ├── layout
│   │   │   └── layout.tsx
│   ├── base/
│   │   └── layout.tsx
├── ui/             # App reusable UI components
│   ├── button/
│   └── drawer/
├── lib/            # Reusable utility functions
│   └── utils/
├── entry-client.ts  
├── root.tsx  
└── routes.ts
```

## 🛠️ Key Components
### Mode Setup
Pre-configured to adapt to any react router mode selected.
For framework mode, ssr is auto set as true, to turn off
Set it to false in the react-router.config.ts
### Custom Hooks
use-login.tsx: Simple hook with login functionality
### Layout System
Flexible layout.tsx with navbar and footer
Extensible for different layout types

### Dependencies
The generated project includes:

@tanstack/react-query
axios
tailwindcss (optional)

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.81.5",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.x"
  }
}
```

## Development
To contribute to this package:

Clone the repository
Install dependencies
Link for local development

## Author
Samuel Affah, Daramfon 
Github: sam-c14

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support
If you found this package helpful, please give it a ⭐️ on GitHub!