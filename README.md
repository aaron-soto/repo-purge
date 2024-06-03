# RepoPurge 🗑️

RepoPurge is a web application designed to streamline the process of deleting GitHub repositories. By allowing users to bulk delete repositories, RepoPurge simplifies GitHub account management for developers and organizations.

## Features

- **Bulk Delete Repositories**: Select and delete multiple repositories at once.
- **GitHub OAuth Integration**: Securely sign in with your GitHub account.
- **User-Friendly Interface**: Simple and intuitive UI for efficient workflow.
- **Detailed Repository Information**: View repository details before deletion.
- **Privacy Focused**: Only the necessary permissions are requested from GitHub.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Ensure you have Node.js installed. [Download here](https://nodejs.org/)
- **GitHub Account**: You will need a GitHub account to use the app.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aaron-soto/RepoPurge.git
   cd RepoPurge
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your relative credentials:

   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret

   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000/

   NODEMAILER_EMAIL=<your_email>
   NODEMAILER_PASSWORD=<your_password>
   ```

### Running the App

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

2. **Open Your Browser**

   Go to `http://localhost:3000` to see the app in action.

### Deployment

To deploy the application, you can use platforms like Vercel or Netlify. Here’s a basic example using Vercel:

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy the App**

   ```bash
   vercel
   ```

3. **Set Environment Variables on Vercel**

   Ensure you set the same environment variables on the Vercel dashboard.

## Usage

1. **Sign In**: Sign in with your GitHub account.
2. **Select Repositories**: Choose the repositories you want to delete.
3. **Confirm Deletion**: Confirm the deletion process.

## Contributing

Contributions are always welcome! Please follow these steps to contribute:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please feel free to reach out:

- **Aaron Soto** - [LinkedIn](https://www.linkedin.com/in/yourprofile) - [Twitter](https://twitter.com/yourprofile)

---

_RepoPurge is an open-source project aimed at making GitHub repository management simpler and more efficient. We appreciate your support and contributions!_
