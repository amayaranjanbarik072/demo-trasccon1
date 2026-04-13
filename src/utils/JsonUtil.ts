// import * as fs from 'fs';
// import * as path from 'path';

// export class JsonUtil {

//   //======This method will store the BOM Creation value======
//   //=============================================================//
//   static isFirstWrite = true;
//   static async saveBOMResult(data: any) {
//     const filePath = path.resolve(__dirname, '../../src/testData/CapturedBOMResults.json');

//     // Initialize structure
//     let masterData: { FG: any[], SA: any[] } = { FG: [], SA: [] };

//     // Logic: Clear old file data on the very first write of the session
//     if (!JsonUtil.isFirstWrite && fs.existsSync(filePath)) {
//       const fileContent = fs.readFileSync(filePath, 'utf-8');
//       try {
//         masterData = JSON.parse(fileContent);
//       } catch (e) {
//         // If file is corrupted, stay with empty arrays
//       }
//     } else {
//       // Ensure directory exists
//       const dir = path.dirname(filePath);
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//       }
//     }

//     // Add the new data point
//     if (data.itemType === 'FG') {
//       masterData.FG.push(data);
//     } else if (data.itemType === 'SA') {
//       masterData.SA.push(data);
//     }

//     // Write to file and toggle the flag
//     fs.writeFileSync(filePath, JSON.stringify(masterData, null, 2));
//     JsonUtil.isFirstWrite = false;
//   }


//   //====== Util to store the Item Number and Description ======
//   //================================================================ 
//   private static isInitialized = false;

//   static async updateItemNumbers(data: { itemNumber: string, description: string, itemType: string }) {
//     const filePath = path.resolve(__dirname, '../../src/testData/ItemNumber.json');

//     // 1. Map the input type to your JSON keys immediately
//     let typeKey = data.itemType;
//     if (typeKey === 'PurchasePart' || typeKey === 'PURCHASEPART') {
//       typeKey = 'PP';
//     }
//     const descKey = `${typeKey}-DESCRIPTION`;

//     // 2. Load existing data or initialize structure
//     let itemData: Record<string, string[]> = {
//       "FG": [], "FG-DESCRIPTION": [],
//       "PP": [], "PP-DESCRIPTION": [],
//       "SA": [], "SA-DESCRIPTION": []
//     };

//     if (fs.existsSync(filePath)) {
//       try {
//         itemData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
//       } catch (e) {
//         console.error("Malformed JSON, resetting file.");
//       }
//     }

//     // 3. Wipe only on the first call of the test session
//     if (!this.isInitialized) {
//       Object.keys(itemData).forEach(key => itemData[key] = []);
//       this.isInitialized = true;
//     }

//     // 4. Store the data
//     if (itemData[typeKey] && itemData[descKey]) {
//       itemData[typeKey].push(data.itemNumber);
//       itemData[descKey].push(data.description);
//       console.log(`✅ Stored ${data.itemNumber} as ${typeKey}`);
//     } else {
//       console.error(`❌ Category mismatch: ${typeKey} or ${descKey} not found in JSON template.`);
//     }

//     fs.writeFileSync(filePath, JSON.stringify(itemData, null, 2));
//   }

//   //=================Store the Company Details==================
//   //==============================================================
//   static saveCompanyDetails(companyId: string, companyName: string) {
//     const filePath = path.resolve(__dirname, '../../src/testData/CompanyMasterDetails.json');
//     // 1. Prepare the single object to store
//     const data = {
//       companyId: companyId,
//       companyName: companyName,
//       lastUpdated: new Date().toLocaleString()
//     };

//     // 2. Ensure directory exists
//     const dir = path.dirname(filePath);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     // 3. Write/Overwrite the file (no reading or pushing required)
//     try {
//       fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
//       console.log(`✅ Stored Company Details: ${companyName}`);
//     } catch (error) {
//       console.error(`❌ Failed to write to JSON: ${error}`);
//     }
//   }

//   //====================Strore the Customer Details==============
//   //=================================================================

//   /**
//       * Overwrites the JSON file with the complete set of customer details.
//       * @param customerData The full object containing all fields from the form
//       */
//   static saveCustomerDetails(allFieldsData: any) {
//     const filePath = path.resolve(process.cwd(), 'src/testData/CustomerMasterDetails.json');

//     // 1. Prepare the full object with a timestamp
//     const dataToStore = {
//       ...allFieldsData, // This dynamically includes every field, dropdown value, and toggle state
//       lastUpdated: new Date().toLocaleString()
//     };

//     // 2. Ensure directory exists
//     const dir = path.dirname(filePath);
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     // 3. Overwrite the file
//     try {
//       fs.writeFileSync(filePath, JSON.stringify(dataToStore, null, 2), 'utf-8');
//       console.log(`✅ Stored all fields in JSON for: ${allFieldsData.customerNameField}`);
//     } catch (error) {
//       console.error(`❌ Failed to write to JSON: ${error}`);
//     }
//   }

//   // Vendor Master Utility
//   static saveVendorDetails(allFieldsData: any) {
//     const filePath = path.resolve(process.cwd(), 'src/testData/VendorMasterDetails.json');

//     const dataToStore = {
//       ...allFieldsData,
//       // Using vendorName since that's the key in your Faker
//       capturedEntity: allFieldsData.vendorName,
//       lastUpdated: new Date().toLocaleString()
//     };

//     try {
//       // Ensure directory exists
//       fs.mkdirSync(path.dirname(filePath), { recursive: true });

//       // Write file
//       fs.writeFileSync(filePath, JSON.stringify(dataToStore, null, 2), 'utf-8');
//       console.log(`✅ Data Stored for Vendor: ${allFieldsData.vendorName}`);
//     } catch (error) {
//       console.error(`❌ Storage Error: ${error}`);
//     }
//   }

//   //=================================Store RFQ Detials========================

//   static async saveRfqDetailsToJson(fileName: string, newData: object) {
//     const directoryPath = path.join(process.cwd(), 'src/testData');
//     const filePath = path.join(directoryPath, fileName);

//     // 1. Ensure the directory exists
//     if (!fs.existsSync(directoryPath)) {
//       fs.mkdirSync(directoryPath, { recursive: true });
//     }

//     // 2. Prepare the new entry with a timestamp
//     const entry = {
//       ...newData,
//       recordedAt: new Date().toLocaleString()
//     };

//     // 3. Write to file as a SINGLE OBJECT (No square brackets [])
//     try {
//       // FIX: Removed [entry] and used just entry
//       fs.writeFileSync(filePath, JSON.stringify(entry, null, 2), 'utf-8');
//       console.log(`✅ New data saved as object to: ${filePath}`);
//     } catch (error) {
//       console.error("❌ Error writing to JSON file:", error);
//     }
//   }

//   /**
//    * Reads the JSON object directly
//    */
//   static readFromJson(fileName: string): any {
//     const filePath = path.join(process.cwd(), 'src/testData', fileName);

//     if (!fs.existsSync(filePath)) {
//       throw new Error(`❌ File not found: ${filePath}`);
//     }

//     const raw = fs.readFileSync(filePath, 'utf-8');
//     const parsed = JSON.parse(raw);

//     // FIX: Removed Array check and return direct object
//     if (!parsed || typeof parsed !== 'object') {
//       throw new Error(`❌ JSON file content is invalid: ${filePath}`);
//     }

//     console.log(`✅ Read RFQ details from: ${filePath}`);
//     return parsed;
//   }

//   static async saveDetailsToJson(fileName: string, newData: object) {
//     const directoryPath = path.join(process.cwd(), 'src/testData');
//     const filePath = path.join(directoryPath, fileName);

//     // 1. Ensure the target directory exists
//     try {
//       if (!fs.existsSync(directoryPath)) {
//         fs.mkdirSync(directoryPath, { recursive: true });
//       }

//       // 2. Prepare the data with a timestamp for debugging/logging
//       const dataToSave = {
//         ...newData,
//         recordedAt: new Date().toLocaleString()
//       };

//       // 3. Write the file as a single JSON object
//       // Using null, 2 for pretty-printing (readable formatting)
//       fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2), 'utf-8');

//       console.log(`✅ Data successfully saved to: ${filePath}`);
//     } catch (error) {
//       console.error(`❌ Error saving data to ${fileName}:`, error);
//     }
//   }

//   /**
//    * Helper to read the stored details back into an object
//    */
//   static readDetailsFromJson(fileName: string): any {
//     const filePath = path.join(process.cwd(), 'src/testData', fileName);

//     if (!fs.existsSync(filePath)) {
//       throw new Error(`❌ Test Data File not found: ${filePath}`);
//     }

//     try {
//       const rawContent = fs.readFileSync(filePath, 'utf-8');
//       return JSON.parse(rawContent);
//     } catch (error) {
//       console.error(`❌ Error reading ${fileName}:`, error);
//       return null;
//     }
//   }
// }

//====================================================================================================
//====================================================================================================
import * as fs from 'fs';
import * as path from 'path';

export class JsonUtil {
  private static isFirstWriteBOM = true;
  private static isInitializedItemNumbers = false;
  private static readonly baseDir = path.join(process.cwd(), 'src/testData');

  /**
   * UNIVERSAL SAVE METHOD 
   * Use this for RFQ, Customer, Company, Vendor, and Price List details.
   * It overwrites the file with a single clean object.
   * * @param fileName Name of the file (e.g., 'ItemPriceListDetails.json')
   * @param data The object to be stored
   */
  static async saveEntity(fileName: string, data: any) {
    const filePath = path.join(this.baseDir, fileName);
    const dataToStore = {
      ...data,
      recordedAt: new Date().toLocaleString(),
      lastUpdated: new Date().toLocaleString()
    };

    try {
      if (!fs.existsSync(this.baseDir)) {
        fs.mkdirSync(this.baseDir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(dataToStore, null, 2), 'utf-8');
      console.log(`✅ Data stored successfully in: ${fileName}`);
    } catch (error) {
      console.error(`❌ Error writing to ${fileName}:`, error);
    }
  }

  /**
   * UNIVERSAL READ METHOD
   * Reads any JSON file from the testData folder as an object.
   */
  static readEntity(fileName: string): any {
    const filePath = path.join(this.baseDir, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`❌ File not found: ${filePath}`);
    }
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      console.error(`❌ Error parsing ${fileName}:`, e);
      return null;
    }
  }

  /**
   * SPECIALIZED: BOM Results
   * Maintains specific FG and SA arrays throughout a session.
   */
  static async saveBOMResult(data: { itemType: string, [key: string]: any }) {
    const filePath = path.join(this.baseDir, 'CapturedBOMResults.json');
    let masterData: { FG: any[], SA: any[] } = { FG: [], SA: [] };

    if (!this.isFirstWriteBOM && fs.existsSync(filePath)) {
      try {
        masterData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        // If file is corrupted, it resets
      }
    } else {
      if (!fs.existsSync(this.baseDir)) {
        fs.mkdirSync(this.baseDir, { recursive: true });
      }
    }

    if (data.itemType === 'FG') {
      masterData.FG.push(data);
    } else if (data.itemType === 'SA') {
      masterData.SA.push(data);
    }

    fs.writeFileSync(filePath, JSON.stringify(masterData, null, 2));
    this.isFirstWriteBOM = false;
  }

  /**
   * SPECIALIZED: Item Numbers 
   * Handles the session-based initialization and category mapping (PP, FG, SA).
   */
  static async updateItemNumbers(data: { itemNumber: string, description: string, itemType: string }) {
    const filePath = path.join(this.baseDir, 'ItemNumber.json');

    let typeKey = data.itemType.toUpperCase();
    if (typeKey === 'PURCHASEPART') {
      typeKey = 'PP';
    }
    const descKey = `${typeKey}-DESCRIPTION`;

    let itemData: Record<string, string[]> = {
      "FG": [], "FG-DESCRIPTION": [],
      "PP": [], "PP-DESCRIPTION": [],
      "SA": [], "SA-DESCRIPTION": []
    };

    if (fs.existsSync(filePath)) {
      try {
        itemData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) { }
    }

    if (!this.isInitializedItemNumbers) {
      Object.keys(itemData).forEach(key => itemData[key] = []);
      this.isInitializedItemNumbers = true;
    }

    if (itemData[typeKey]) {
      itemData[typeKey].push(data.itemNumber);
      itemData[descKey].push(data.description);
      fs.writeFileSync(filePath, JSON.stringify(itemData, null, 2));
      console.log(`✅ Item Number Stored: ${data.itemNumber}`);
    }
  }
}
