 # HSBC Hackathon Backend
This project is the backend implementation for the HSBC Hackathon, built using Node.js, Express.js, and MongoDB. The backend is responsible for handling API routes, managing user authentication, importing CSV data into MongoDB, and providing insights based on transaction data.

## Table of Contents
1. [Introduction](#introduction)
2. [Backend Overview](#backend-overview)
   - [Index.js](#indexjs)
   - [CSV Data Import Pipeline](#csv-data-import-pipeline)
   - [CSV Preprocessing Script](#csv-preprocessing-script)
3. [API Routes](#api-routes)
   - [AddData Route](#adddata-route)
   - [Auth Route](#auth-route)
   - [Logic Route](#logic-route)
4. [Database Schemas](#database-schemas)
   - [Transaction Schema](#transaction-schema)
   - [User Schema](#user-schema)
5. [License](#license)
   
## Introduction
This project serves as the backend for an HSBC Hackathon project, providing various API endpoints for user authentication, data management, and analytics on transaction data. The backend is designed to efficiently handle large datasets, manage user roles, and provide insightful data analytics.

### Index.js

The `index.js` file is the entry point for the Express.js server. It performs the following key tasks:

1. **Loading Environment Variables**:
   - Environment variables are loaded from a `.env` file to manage configuration settings. This allows for secure and flexible configuration.

2. **Importing Routes**:
   - API routes are imported from separate modules, such as `authRoute` and `logicRoute`. This modular approach helps in organizing code and managing different routes effectively.

3. **Setting Up Express.js**:
   - An Express application is initialized using `express()`. Middleware for handling CORS (Cross-Origin Resource Sharing), JSON payloads, and URL-encoded data is set up to handle incoming requests.

4. **Connecting to MongoDB**:
   - The server connects to a MongoDB database using Mongoose. Connection details are retrieved from environment variables, ensuring flexibility and security.

5. **Middleware Setup**:
   - Middleware is configured to parse incoming requests and handle cross-origin requests. This includes `cors()`, `express.json()`, and `express.urlencoded({ extended: true })`.

6. **Route Handling**:
   - API routes are defined using `app.use()`, mapping different paths to their respective route modules.

7. **Default Route**:
   - A default route (`"/"`) is defined to handle requests to the root of the API, providing a simple status message.

8. **404 Route**:
   - A route to handle undefined routes is set up, returning a 404 error with a "Not Found" message.

9. **Starting the Server**:
   - The server is started and listens on a specified port, logging a message to indicate that the server is up and running.
  
   
## CSV Data Import Pipeline

The `csv_to_document_pipeline.js` script is used to import CSV data into the MongoDB database. It performs the following tasks:

1. **Loading Environment Variables**:
   - Loads configuration settings from the `.env` file. This is crucial for managing sensitive information and database connection details securely.

2. **Importing Required Modules**:
   - Imports necessary Node.js and Mongoose modules to handle file reading, CSV parsing, and database operations. These modules include `fs` for file system operations, `csv-parser` for parsing CSV data, and `mongoose` for interacting with the MongoDB database.

3. **Setting the Path to the CSV File**:
   - Defines the path to the CSV file that contains the data to be processed. This file should be in CSV format and contain the transaction data to be imported.

4. **Connecting to MongoDB**:
   - Establishes a connection to the MongoDB database using Mongoose. The connection string is retrieved from environment variables to ensure flexibility and security.

5. **Reading and Processing the CSV File**:
   - Reads the CSV file line by line using `fs.createReadStream()` and pipes the data through `csv-parser` to convert each line into a JavaScript object. This allows for efficient processing of large datasets.

6. **Creating and Saving a Transaction Object**:
   - For each row in the CSV file, a new `Transaction` object is created with properties extracted from the row data. The object is then saved to the MongoDB database using Mongoose. The code handles type conversions and formatting to ensure data integrity.

7. **Handling the End of the File and Errors**:
   - Manages the end of the file reading process by logging a success message once all rows have been processed. Errors during the file reading or data saving processes are caught and logged to provide insights into any issues encountered.

8. **Handling Connection Errors**:
   - Catches and logs any errors that occur during the database connection process. This helps in diagnosing connection issues and ensuring that the script can handle failures gracefully.
## CSV Preprocessing Script

The `preprocess_to_new_csv.js` script processes an input CSV file, cleans and formats the data, and writes it to an output CSV file. This script is useful for ensuring that the data in the output CSV file is in a clean and consistent format. Below is a detailed explanation of the script:

1. **Importing Required Modules**:
   - Imports the necessary Node.js modules for file operations and CSV processing. This includes `fs` for file system operations and `csv-parser` for parsing CSV data. Additionally, it uses `csv-writer` to write data to the output CSV file.

2. **File Paths**:
   - Defines the paths for the input and output CSV files. The input file is the raw data file, and the output file is where the cleaned and formatted data will be written.

3. **Creating a CSV Writer**:
   - Configures a CSV writer using `csv-writer`. This writer is set up to write the processed data to the specified output file. It includes:
     - `path`: Specifies the file path for the output CSV.
     - `header`: Defines the columns for the output CSV, ensuring each object key (id) matches the column title (title).
     - `append`: Set to `true` to append to the file if it already exists.

4. **Reading and Processing the Input CSV File**:
   - Reads the input CSV file as a stream using `fs.createReadStream()`. The file is processed line by line using `csv-parser`, which converts each line into a JavaScript object (row).

5. **Creating and Writing a New Transaction Object**:
   - Processes each row from the input file to clean and format the data:
     - `substring(1, row.length - 1)`: Removes unwanted characters (such as quotes) from the beginning and end of each string field.
     - `parseInt` and `parseFloat`: Convert the `age` and `amount` fields from strings to numbers.
     - `fraud`: Converts from a string ("1" or "0") to a boolean (true or false).
   - Writes the processed data to the output CSV file using the CSV writer.
## API Routes

### AddData Route

The `addData.js` file sets up an Express.js router for handling API routes related to data submission.

1. **Importing Required Modules**:
   - Imports the `express` module to create the router.

2. **Defining the Root Route**:
   - Defines a root route (`/`) that responds with a simple message indicating that the API route is for adding data.

3. **Exporting the Router**:
   - Exports the router so it can be used in the main application file.

### Auth Route
The `auth.js` file defines routes related to user authentication, including token verification and generation.

1. **Importing Required Modules**:
   - Imports necessary modules like express and jsonwebtoken..

2. **Defining the Root Route**:
   - Defines a root route (`/`) that responds with a simple message indicating that the API route is for adding data.

3. **Verification Route: **:
   -  A POST route that verifies JWT tokens and returns the user's role.
     
4. **Token Generation Route: **
   - A POST route that generates new JWT tokens, handles new users, and assigns roles based on the user's information.
     
5. **Exporting the Router:**
   - Exports the router for use in the main application.
  
   
### Logic Route
The `logic.js` file provides various insights based on transaction data through multiple API endpoints.
1. **Importing Required Modules:**
   -Imports necessary modules like express and mongoose.
2. **Root Route:**
   -Defines a basic route for testing the logic API.
3.**Fraud Distribution Insight:** 
   -Provides an endpoint to get the distribution of fraud cases across different categories.
4.**High-Value Customers Insight:** 
   -Provides endpoints to get lists of top customers based on their total spending.
5.**Spending by Category Insight:**
   -Provides an endpoint to get the total spending for each transaction category.
6.**Merchant Ranking Insight:**
   -Provides an endpoint to rank merchants based on total spending and transaction count.
7.**Spending by Gender Insight:**
   -Provides an endpoint to analyze spending patterns based on customer gender.
8.**Customer Lifetime Value (CLTV) Insight:**
   -Provides an endpoint to calculate and return the customer lifetime value.


### Database Schemas
## Transaction Schema
The `data.js` file defines the schema and model for transactions stored in the MongoDB database.

1.**Importing Mongoose:** Imports Mongoose for database interaction.
2.**Defining the Schema:** Defines a schema with fields like customer, age, gender, zipcodeOri, merchant, zipMerchant, category, amount, and fraud.
3.**Creating the Model:** Creates a Mongoose model named Transaction based on the schema.
4.**Exporting the Model:** Exports the Transaction model for use in other parts of the application.


## User Schema
The `user.js` file defines the schema and model for users stored in the MongoDB database.

1.**Importing Mongoose:** Imports Mongoose for database interaction.
2.**Defining the Schema:** Defines a schema with fields like role, email, uuid, and picture.
3.**Creating the Model:** Creates a Mongoose model named User based on the schema.
4.**Exporting the Model:** Exports the User model for use in other parts of the application.


## License
This project is licensed under the MIT License - see the LICENSE file for details.

