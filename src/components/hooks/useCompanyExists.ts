import axios from 'axios';

import { AIRTABLE_BASE_ID, AIRTABLE_API_KEY } from '../services/airtableService';


export const useCompanyExists = () => {
    const checkCompany = async (companyName: string, tvaNumber: string): Promise<boolean> => {
        const AIRTABLE_TABLE_NAME = 'Companies';
        const filter = `AND({CompanyName} = "${companyName}", {TvaNumber} = "${tvaNumber}")`; // Replace with your Airtable field names
        
        try {
            const records = await fetchRecords(AIRTABLE_TABLE_NAME, encodeURIComponent(filter));
            return records.length > 0;
        } catch (error) {
            console.error("Error checking company existence:", error);
            return false;
        }
    };

    return { checkCompany };
};

const fetchRecords = async (tableName: string, filter: string) => {
    const AIRTABLE_ENDPOINT = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}?filterByFormula=${filter}`;

    try {
        const response = await axios.get(AIRTABLE_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.records;
    } catch (error) {
        console.error("Error fetching records from", tableName, ":", error);
        return [];
    }
};

export default useCompanyExists;