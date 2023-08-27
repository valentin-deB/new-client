import axios from 'axios';

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

export const addRecord = async (tableName: string, data: Record<string, unknown>) => {
    const AIRTABLE_ENDPOINT = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`;

    try {
        const response = await axios.post(AIRTABLE_ENDPOINT, {
            fields: data
        }, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error adding record to", tableName, ":", error);
        return null;
    }
};

export const fetchRecords = async (tableName: string, filter: string) => {
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


