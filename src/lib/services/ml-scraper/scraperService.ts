import { ScraperServiceResponse } from "@/types/props";
import scrapear from '../ml-scraper/runner/index';

export async function ScraperService(query: string): Promise<ScraperServiceResponse[] | null> {
    try {
        const results = await scrapear(query, 3) as ScraperServiceResponse[];
        return results;
    }
    catch (error) {
        console.error('Error in ScraperService:', error);
        throw error;
    }
};