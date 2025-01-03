# Link Manager - *Keep your links close!*

## Project Overview

*The **************************************************************************************************************************************************************************************************************Link Manager************************************************************************************************************************************************************************************************************** is a web application designed to help you save and manage all your favorite and important URLs in one convenient location. With a clean and intuitive interface, you can easily add, update, delete, and fetch links. The application also includes an advanced "************************************************************************************************************************************************************************************************************Undo************************************************************************************************************************************************************************************************************" feature, allowing you to recover accidentally deleted links. All data is securely stored in a MySQL database.*

## Key Features

- **Add Links**: *Save your favorite and important URLs.*
- **Update Links**: *Modify existing URLs and the name.*
- **Delete Links**: *Remove URLs you no longer need.*
- **Undo Deletion**: *Recover accidentally deleted links within a short time frame.*
- **Fetch Links**: *Retrieve and display all your saved URLs.*

## Technologies Used

*This project leverages modern web development technologies to deliver a seamless user experience:*

- **Next.js**: *A powerful React framework for building server-rendered applications.*
- **TypeScript**: *For type safety and enhanced code maintainability.*
- **Tailwind** **CSS**: *To style the application with minimal effort and maximum flexibility.*
- **ShadCN**: *For accessible and reusable components.*
- **Axios**: *To handle API requests effectively.*
- **MySQL2**: *For efficient database interaction.*
- **Sonner**: *To display elegant and interactive toast notifications.*

## Backend Setup

*The application uses **************************************************************************************************XAMPP************************************************************************************************** to set up:*

- **Apache Server**: *To manage "Php my admin".*
- **MySQL Server**: *To manage the database for storing links.*

## How It Works

1. **Adding Links**: *Enter the URL with name and save them to the database.*
2. **Updating Links**: *Select a link to update its name or URL or both.*
3. **Deleting Links**: *Remove a link from the database.*
4. **Undo Deletion**: *Click "Undo" after deletion to restore the link within 15 seconds.*
5. **Fetching Links**: *All saved links are fetched and displayed dynamically.*

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone git@github.com:abhinavchoubey2000/links-manager.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - *Download Xampp.*
   - *Start XAMPP and enable Apache and MySQL.*
   - *Create a database and configure the connection in the project.*
     - *go to project directory where db.ts is located (./src/app/db.ts)*
     - *inside db.ts add your hostname, username and password.*
4. Build the application:
   ```bash
   npm run build
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Access the application at `http://localhost:3000`.

## Future Enhancements

- *Integration with cloud databases for remote access.*
- *User authentication and role-based access control.*
- *Enhanced UI/UX with additional customization options.*

## Contributing

*Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.*

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Thank you for using **Link Manager**! If you encounter any issues or have feature suggestions, feel free to reach out.

