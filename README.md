# Bug Tracker

This is a Bug Tracking Application built using Next.js and Airtable. The application provides a scaled-down UI mimicking the "Bugs" panel grid view from a Bug Tracking System. It allows users to interact with Airtable to create, edit, view, and delete bug records.

## Features
- **View Bugs**: Display a grid view of bugs stored in Airtable.  
- **Create Bugs**: Add new bug records to Airtable.  
- **Edit Bugs**: Update existing bug records in Airtable.  
- **Delete Bugs**: Remove bug records from Airtable.  

## Tech Stack
- **Frontend**: Next.js (React)  
- **UI Components**: Material-UI  
- **Backend**: Airtable API for data storage and retrieval  

## Prerequisites
- **Airtable Account**: Sign up at Airtable and create a base for bug tracking.  
- **Airtable API Key**: Obtain your API key from the Airtable account settings.  
- **Airtable Base ID**: Find your base ID from the Airtable API documentation for your base.  
- **Node.js**: Ensure you have Node.js installed.  

## Getting Started
1. **Clone the Repository**  
    ```bash
    git clone <repository-url>
    cd bug-tracker
    ```

2. **Install Dependencies**  
    ```bash
    npm install
    ```

3. **Configure Environment Variables**  
    Create a `.env.local` file in the root of the project and add the following:  
    ```env
    AIRTABLE_API_KEY=your_api_key
    AIRTABLE_BASE_ID=your_base_id
    AIRTABLE_TABLE_NAME=Bugs
    ```

4. **Run the Development Server**  
    ```bash
    npm run dev
    ```  
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure
- **pages/**: Contains Next.js pages.  
- **components/**: Reusable UI components.  
- **utils/**: Helper functions and Airtable API integration.  

## Functionality
1. **View Bugs**  
    The application fetches bug records from Airtable and displays them in a grid view.  

2. **Create Bugs**  
    Users can fill out a form to add a new bug record to Airtable.  

3. **Edit Bugs**  
    Users can update existing bug records directly from the UI.  

4. **Delete Bugs**  
    Users can delete bug records, which will be removed from Airtable.  

## Airtable Setup
1. Create a new base in Airtable named **Bug Tracker**.  
2. Add a table named **Bugs** with the following fields:  
    - **Title** (Single line text)  
    - **Description** (Long text)  
    - **Priority** (Single select: Low, Medium, High)  
    - **Status** (Single select: Open, In Progress, Closed)  
    - **Created At** (Date)  
3. Note the **Base ID** and **Table Name** for your Airtable base.

## Scripts
- `npm run dev`: Start the development server.  
- `npm run build`: Build the application for production.  
- `npm run start`: Start the production server.  
- `npm run lint`: Run ESLint to check for code issues.  

## Deployment
I've deployed this app using Vercel, but it can be deployed using any other tool you prefer.

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)  
- [Airtable API Documentation](https://airtable.com/api)  
- [Material-UI Documentation](https://mui.com/)  