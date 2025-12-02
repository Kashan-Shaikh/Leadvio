# 🚀 Lead Generation & Cold Email Automation Platform

This project automates the process of lead generation and cold email outreach. It leverages n8n for workflow automation, Groq's Llama 3 for AI-powered search instruction generation, and PostgreSQL for data storage. The frontend, built with Next.js, provides a user-friendly interface for defining lead requirements, viewing results, and managing settings. This platform streamlines the process of finding and engaging with potential customers, saving time and improving efficiency.

## ✨ Key Features

- **Automated Lead Generation:** Define your ideal customer profile and let the platform automatically generate leads.
- **AI-Powered Search Instructions:** Uses Groq's Llama 3 to create optimized search queries for Apollo.io.
- **Cold Email Automation:** Send personalized cold emails to generated leads.
- **Workflow Management:** Utilizes n8n for flexible and customizable workflow automation.
- **User-Friendly Interface:** Built with Next.js for a seamless and intuitive user experience.
- **Data Storage:** Stores lead data and workflow run information in a PostgreSQL database.
- **Account Management:** Users can manage their account settings, preferences, and data.
- **Multi-Step Form:** A dynamic form to collect user input for generating leads.
- **Authentication:** Secure user authentication to protect data.

## 🛠️ Tech Stack

| Category      | Technology                                  | Description                                                                                                |
|---------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **Frontend**  | Next.js                                     | React framework for building user interfaces                                                              |
|               | React                                       | JavaScript library for building user interfaces                                                              |
|               | TypeScript                                  | Superset of JavaScript which adds static typing.                                                            |
|               | lucide-react                                | Icon library                                                                                               |
|               | next/font/google                            | Used for importing Google Fonts                                                                              |
|               | @vercel/analytics/next                       | Used for integrating Vercel Analytics                                                                      |
| **Backend**   | n8n                                         | Workflow automation platform                                                                               |
|               | Groq API                                    | Used for generating Apollo.io search instructions using the `llama-3.1-70b-versatile` model.                |
|               | Apollo.io API                               | Used for searching and retrieving leads.                                                                   |
|               | Node.js                                     | JavaScript runtime environment                                                                             |
| **Database**  | PostgreSQL                                  | Relational database management system                                                                      |
|               | uuid-ossp extension                         | Provides functions for generating UUIDs (Universally Unique Identifiers).                                  |
| **AI**        | Groq's Llama 3                              | AI model for generating Apollo.io search instructions                                                      |
| **Other**     | JSON                                        | Data exchange format                                                                                         |
|               | Vercel                                      | Hosting platform                                                                                             |

## 📦 Getting Started

### Prerequisites

- Node.js (>=18)
- npm or yarn
- PostgreSQL
- n8n
- Groq API Key
- Apollo.io API Key

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Set up the database:**

    - Create a PostgreSQL database.
    - Run the SQL schema:

    ```bash
    psql -U <db_user> -d <db_name> -f backend/db/schema.sql
    ```

    Replace `<db_user>` and `<db_name>` with your PostgreSQL credentials.

4.  **Configure environment variables:**

    Create a `.env.local` file in the `frontend` directory with the following variables:

    ```
    NEXT_PUBLIC_GROQ_API_KEY=<your_groq_api_key>
    NEXT_PUBLIC_APOLLO_API_KEY=<your_apollo_api_key>
    NEXT_PUBLIC_N8N_WEBHOOK_URL=<your_n8n_webhook_url>
    ```

    Also, configure the necessary environment variables for the backend n8n workflow (Groq API key, Apollo.io API key, database connection details).

5.  **Configure n8n:**

    - Import the workflow from `backend/Lead Generation & Cold Email Automation.json` into your n8n instance.
    - Configure the necessary credentials (Groq API, Apollo.io API, database connection).
    - Set the webhook URL in your `.env.local` file.

### Running Locally

1.  **Start the Next.js development server:**

    ```bash
    npm run dev # or yarn dev
    ```

    This will start the frontend application at `http://localhost:3000`.

2.  **Ensure the n8n workflow is active and listening for webhooks.**

## 💻 Usage

1.  Open your browser and navigate to `http://localhost:3000`.
2.  Sign up or sign in to your account.
3.  Navigate to the "Get Leads" page.
4.  Fill out the form with your lead generation criteria.
5.  Submit the form.
6.  View the generated leads on the "Results" page.
7.  Manage your leads on the "My Leads" page.
8.  Configure your account settings on the "Settings" page.

## 📂 Project Structure

```
├── backend/
│   ├── Lead Generation & Cold Email Automation.json  # n8n workflow definition
│   └── db/
│       └── schema.sql                                # PostgreSQL database schema
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── webhook/
│   │   │   │   ├── get-leads/route.ts                # API route for triggering lead generation
│   │   │   │   └── status/route.ts                   # API route for checking workflow status
│   │   ├── dashboard/page.tsx                        # Main dashboard page
│   │   ├── get-leads/page.tsx                        # Lead generation form page
│   │   ├── layout.tsx                                # Root layout for the application
│   │   ├── my-leads/page.tsx                         # My Leads page
│   │   ├── page.tsx                                  # Landing page
│   │   ├── pricing/page.tsx                          # Pricing page
│   │   ├── results/page.tsx                          # Results page
│   │   ├── settings/page.tsx                         # Settings page
│   │   ├── sign-in/page.tsx                          # Sign-in page
│   │   └── sign-up/page.tsx                          # Sign-up page
│   ├── components/                                   # Reusable UI components
│   ├── lib/
│   │   └── n8n-client.ts                             # Functions for interacting with the n8n API
│   ├── next.config.mjs                               # Next.js configuration
│   └── public/                                       # Public assets
├── package.json
├── README.md
└── tsconfig.json
```



## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

Kashan Founder of Aivio -
aivio.services@gmail.com

## 💖 Thanks

Thanks for checking out this project! We hope it helps you automate your lead generation and cold email outreach efforts.

