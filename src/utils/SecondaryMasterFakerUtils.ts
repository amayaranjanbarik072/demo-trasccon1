import { faker } from '@faker-js/faker';

export class SecondaryMasterFaker {
    // generateActiveStatusToggle() {
    //     throw new Error("Method not implemented.");
    // }

    generateName(prefix: string): string {
        const date = new Date();

        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        const randomValue = faker.string.alphanumeric({
            length: 5,
            casing: 'upper'
        });
        //===============Only Alphabets===============
        //    const fakerValue = faker.string.alpha({
        //         length: 4,
        //         casing: 'upper'
        //     });
        //================Only Number==================
        // const fakerValue = faker.number.int({ min: 1000, max: 9999 })

        //===============Random Words===============
        // const fakerValue = faker.word.noun().toUpperCase();

        return `${prefix}_${dd}-${mm}-${yyyy}_${randomValue}`;
    }

    generateDescription(): string {
        return faker.lorem.sentence(6);
    }

    generateRemarks(): string {
        return faker.lorem.words(4);
    }

    generateActiveStatus(): boolean {
        return true; // Default active
    }
}
