import { faker } from '@faker-js/faker';

export class FakerUtil {
    // ================= COMMON ERP LOGIC HELPERS =================

    private static generatePAN = () =>
        faker.string.alpha({ length: 5, casing: 'upper' }) +
        faker.string.numeric(4) +
        faker.string.alpha({ length: 1, casing: 'upper' });

    private static generateGSTN = (pan: string) =>
        faker.number.int({ min: 1, max: 37 }).toString().padStart(2, '0') +
        pan + faker.number.int({ min: 1, max: 9 }) + "Z" +
        faker.string.alphanumeric(1).toUpperCase();

    // ================= MASTER DATA GENERATORS =================

    /**
     * 1. COMPANY MASTER (Refined Keys)
     */
    static getCompanyData() {
        const pan = this.generatePAN();
        return {
            companyId: `CO-${faker.string.alphanumeric(5).toUpperCase()}`,
            companyName: faker.company.name(),
            companyAlias: faker.company.buzzAdjective(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode('######'),
            boardNumber: faker.phone.number(),
            website: faker.internet.url(),
            email: faker.internet.email(),
            googlePin: `${faker.location.latitude()}, ${faker.location.longitude()}`,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            callName: faker.person.firstName(),
            designation: faker.person.jobTitle(),
            mobile: faker.phone.number(),
            alternateMobile: faker.phone.number(),
            landline: faker.phone.number(),
            ext: faker.number.int({ min: 10, max: 999 }).toString(),
            timeToCall: "10:30",
            poAddress: faker.location.streetAddress(true),
            gstn: this.generateGSTN(pan),
            pan: pan,
            branch: faker.location.city(),
            accountNo: faker.finance.accountNumber(12),
            ifsc: `BANK0${faker.string.alphanumeric(6).toUpperCase()}`,
            swift: faker.finance.bic(),
            iban: faker.finance.iban(),
            advance: faker.helpers.arrayElement(['10%', '25%', '50%']),
            specialTerms: `Terms valid for ${faker.number.int({ min: 30, max: 90 })} days.`,
            turnover: faker.number.int({ min: 10, max: 100 }).toString(),
            dnbNumber: faker.string.alphanumeric(10).toUpperCase(),
            icra: faker.helpers.arrayElement(['AAA', 'AA+', 'A']),
            skillOrDepartment: faker.helpers.arrayElement(['Engineering', 'Quality']),
            noOfPeople: faker.number.int({ min: 1, max: 50 }).toString(),
            headCount: faker.number.int({ min: 10, max: 50 }).toString(),
            capacity: faker.number.int({ min: 100, max: 1000 }).toString(),
            floorSpace: faker.number.int({ min: 500, max: 5000 }).toString(),
            machine: faker.helpers.arrayElement(['CNC', 'Lathe']),
            toolsAndEquip: faker.helpers.arrayElement(['Caliper', 'Welder']),
            erp: faker.helpers.arrayElement(['SAP', 'Oracle']),
            osp: `Process: ${faker.commerce.productMaterial()} coating.`,
            sqft: faker.number.int({ min: 1000, max: 25000 }).toString(),
            approvalBy: faker.person.fullName(),
            approvalDate: "2026-03-06"
        };
    }

    /**
     * 2. ITEM MASTER (Refined Keys)
     */
    static getItemData(type: 'SA' | 'FG' | 'PurchasePart') {

        // 1. Realistic Prefix Mapping
        const prefixMap = { 'FG': '100', 'SA': '200', 'PurchasePart': '500' };

        //   // 2. Generate an 8-digit SKU-style number: 100-4829
        const itemNumber = `${prefixMap[type]}-${faker.number.int({ min: 1000, max: 9999 })}`;

        //   // 3. Realistic Industrial Descriptions
        let description = "";
        if (type === 'PurchasePart') {
            // Combinatorial Logic: Noun + Dimension + Material/Brand
            const component = faker.helpers.arrayElement(["Bearing", "Capacitor", "Bolt", "O-Ring", "Resistor", "Nut", "Washer"]);
            const dimension = faker.helpers.arrayElement(["M12", "M8", "470uF", "25mm", "10k Ohm", "6204-2RS"]);
            const spec = faker.helpers.arrayElement(["SKF", "Viton", "Grade 8.8", "Electrolytic", "SS304", "Zinc Plated"]);
            description = `${component}, ${dimension}, ${spec}`;
        }
        else if (type === 'SA') {
            const assembly = faker.helpers.arrayElement(["Rotor", "Gearbox", "Valve Block", "Control Panel", "Manifold"]);
            const process = faker.helpers.arrayElement(["Machined", "Welded", "Coiled", "Wired"]);
            description = `${assembly} Sub-Assembly, ${process}`;
        }
        else { // FG
            const unit = faker.helpers.arrayElement(["Power Pack", "Conveyor", "Pump", "Mixer"]);
            const spec = `${faker.number.int({ min: 5, max: 100 })} ${faker.helpers.arrayElement(['HP', 'kW', 'RPM', 'PSI', 'Bar', 'Mahindra'])} - ${faker.company.name()}`;
            description = `${unit}, ${spec}, Industrial Grade`;
        }
        const validFrom = faker.date.soon({ days: 5 }); // Date within next 5 days
        const validTo = faker.date.future({ years: 1, refDate: validFrom }); // 1 year after validFrom
        return {
            itemNumber: itemNumber,
            description: description,
            itemType: type,
            alternatePart: `ALT-${faker.string.alphanumeric(6).toUpperCase()}`,
            manufacturerOrCustomerName: faker.company.name(),
            drawingNo: `DWG-${faker.number.int({ min: 1000, max: 9999 })}`,
            revNo: `R${faker.number.int({ min: 0, max: 9 })}`,
            remarksToVendor: "Ensure RoHS compliance.",
            docRet: `DOC-${faker.number.int({ min: 10, max: 99 })}`,
            netWeight: faker.number.int({ min: 1, max: 50 }).toString(),
            grossWeight: faker.number.int({ min: 51, max: 100 }).toString(),
            volume: faker.number.int({ min: 1, max: 20 }).toString(),
            size: faker.number.int({ min: 10, max: 500 }).toString(),
            footprint: `${faker.number.int({ min: 10, max: 50 })}x${faker.number.int({ min: 10, max: 50 })}`,
            processStep: `STEP-${faker.number.int({ min: 1, max: 20 })}`,
            routingDescription: "Precision assembly.",
            machineHrs: faker.number.int({ min: 1, max: 10 }).toString(),
            labourHrs: faker.number.int({ min: 1, max: 10 }).toString(),
            shareOfBusiness: "100",
            min: faker.number.int({ min: 1, max: 10 }).toString(),
            max: faker.number.int({ min: 100, max: 500 }).toString(),
            reorder: faker.number.int({ min: 11, max: 99 }).toString(),
            twoBin: faker.number.int({ min: 1, max: 5 }).toString(),
            leadTime: faker.number.int({ min: 1, max: 30 }).toString(),
            expiry: faker.number.int({ min: 365, max: 730 }).toString(),
            inspection: faker.number.int({ min: 1, max: 10 }).toString(),
            instructions: "Handle with care.",
            grProcess: faker.number.int({ min: 1, max: 5 }).toString(),
            batchSize: faker.number.int({ min: 10, max: 1000 }).toString(),
            stdCost: faker.number.int({ min: 100, max: 5000 }).toString(),
            hsn: faker.helpers.fromRegExp(/[0-9]{4,8}/), // Generates 4 to 8 digit HSN
            specialInstructions: `Ensure ${faker.commerce.productMaterial()} compliance. ${faker.lorem.sentence()}`,
            validFrom: validFrom.toISOString().split('T')[0], // YYYY-MM-DD
            validTo: validTo.toISOString().split('T')[0] // YYYY-MM-DD
        };
    }

    /**
     * 3. CUSTOMER MASTER (Refined Keys)
     */
    static getCustomerData() {
        const pan = this.generatePAN();
        return {
            customerName: faker.company.name(),
            customerAlias: faker.string.alphanumeric(5).toUpperCase(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.string.numeric(6),
            vendorCodeU: faker.string.alphanumeric({ length: 8, casing: 'upper' }), // Unique key
            boardNumber: faker.phone.number(),
            website: faker.internet.url(),
            generalEmail: faker.internet.email(),
            googlePinLocation: `${faker.location.latitude()}, ${faker.location.longitude()}`,
            salesManagerCode: faker.string.numeric(5),
            salesManager: faker.person.fullName(),
            region: faker.location.county(),
            vendorCode: faker.string.alphanumeric({ length: 8, casing: 'lower' }), // Unique key
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            callName: faker.person.firstName(),
            designation: faker.person.jobTitle(),
            mobileNumber: faker.string.numeric(10),
            alternateMobile: faker.string.numeric(10),
            email: faker.internet.email(),
            landLine: faker.string.numeric(10),
            skypeId: faker.internet.username(),
            extension: faker.string.numeric(3),
            timeToCall: "11:30",
            customerAliasReadonly: faker.company.buzzAdjective(),
            poAddress: faker.location.streetAddress(),
            gstnNumber: this.generateGSTN(pan),
            panNumber: pan,
            branch: faker.location.city(),
            accountNumber: faker.finance.accountNumber(),
            ifscCode: faker.string.alphanumeric({ length: 11, casing: 'upper' }),
            swiftCode: faker.finance.bic(),
            ibanCode: faker.finance.iban(),
            specialInstructions: faker.lorem.sentence(),
            advance: faker.number.int({ min: 1000, max: 9999 }).toString(),
            specialTerms: faker.lorem.paragraph(),
            ldApplicable: faker.number.int({ min: 1, max: 10 }).toString(),
            sourceInspection: faker.commerce.productAdjective(),
            turnOver: faker.finance.amount(),
            dnbNumber: faker.string.numeric(9),
            icra: faker.string.alphanumeric(10).toUpperCase(),
            skillOrDepartmentRow1: faker.commerce.department(),
            skillOrDepartmentRow2: faker.commerce.department(),
            capacity: faker.number.int({ min: 50, max: 500 }).toString(),
            floorSpace: faker.number.int({ min: 100, max: 1000 }).toString(),
            machine: faker.commerce.productName(),
            toolsAndEquip: faker.commerce.product(),
            sqft: faker.number.int({ min: 1000, max: 5000 }).toString(),
            erp: faker.company.name() + " ERP",
            osp: faker.lorem.sentence(),
            approvalBy: faker.person.fullName(),
            approvalDate: "2026-03-06"
        };
    }

    /**
     * 4. VENDOR MASTER (Refined Keys)
     */
    //Vendor Data
    static getVendorData() {
        const pan = this.generatePAN();
        return {
            vendorName: faker.company.name(),
            vendorAlias: faker.string.alphanumeric(5).toUpperCase(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.string.numeric(6),
            vendorCodeU: faker.string.alphanumeric({ length: 8, casing: 'upper' }), // Unique key
            boardNumber: faker.phone.number(),
            website: faker.internet.url(),
            generalEmail: faker.internet.email(),
            googlePinLocation: `${faker.location.latitude()}, ${faker.location.longitude()}`,
            salesManagerCode: faker.string.numeric(5),
            salesManager: faker.person.fullName(),
            region: faker.location.county(),
            vendorCode: faker.string.alphanumeric({ length: 8, casing: 'lower' }), // Unique key
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            callName: faker.person.firstName(),
            designation: faker.person.jobTitle(),
            mobileNumber: faker.string.numeric(10),
            alternateMobile: faker.string.numeric(10),
            email: faker.internet.email(),
            landLine: faker.string.numeric(10),
            extension: faker.string.numeric(3),
            timeToCall: "11:30",
            vendorAliasReadonly: faker.company.buzzAdjective(),
            poAddress: faker.location.streetAddress(),
            gstnNumber: this.generateGSTN(pan),
            panNumber: pan,
            branch: faker.location.city(),
            accountNumber: faker.finance.accountNumber(),
            ifscCode: faker.string.alphanumeric({ length: 11, casing: 'upper' }),
            swiftCode: faker.finance.bic(),
            ibanCode: faker.finance.iban(),
            specialInstructions: faker.lorem.sentence(),
            advance: faker.number.int({ min: 1000, max: 9999 }).toString(),
            specialTerms: faker.lorem.paragraph(),
            ldApplicable: faker.number.int({ min: 1, max: 10 }).toString(),
            sourceInspection: faker.commerce.productAdjective(),
            turnOver: faker.finance.amount(),
            dnbNumber: faker.string.numeric(9),
            icra: faker.string.alphanumeric(10).toUpperCase(),
            skillOrDepartmentRow1: faker.commerce.department(),
            skillOrDepartmentRow2: faker.commerce.department(),
            capacity: faker.number.int({ min: 50, max: 500 }).toString(),
            floorSpace: faker.number.int({ min: 100, max: 1000 }).toString(),
            machine: faker.commerce.productName(),
            toolsAndEquip: faker.commerce.product(),
            sqft: faker.number.int({ min: 1000, max: 5000 }).toString(),
            erp: faker.company.name() + " ERP",
            osp: faker.lorem.sentence(),
            approvalBy: faker.person.fullName(),
            approvalDate: "2026-03-06"
        };
    }
    static getItemPriceLIstData() {
        return {
            leastCost: faker.number.int({ min: 500, max: 5000 }).toString(),
            markup: faker.number.int({ min: 5, max: 20 }).toString(),
            leastCostPlus: faker.number.int({ min: 5000, max: 10000 }).toString(),
            leastCostMinus: faker.number.int({ min: 1000, max: 2000 }).toString(),
            discountPlus: faker.number.int({ min: 30, max: 70 }).toString(),
            discountMinus: faker.number.int({ min: 10, max: 20 }).toString()
        }
    }
}