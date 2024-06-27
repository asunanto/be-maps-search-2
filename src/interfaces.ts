import { z } from 'zod';

export interface PlaceAutocompleteResult {
    placeId: string;
    streetNumber: string|undefined;
    countryCode: string;
    country: string;
    freeformAddress: string;
    municipality: string|undefined;
}
export const ResultsZ = z.array(
    z.object({
        id: z.string(),
        address: z.object({
            streetNumber: z.string().optional(),
            countryCode: z.string(),
            country: z.string(),
            freeformAddress: z.string(),
            municipality: z.string().optional()
        })
    })
)

type Results = z.infer<typeof ResultsZ>

export interface TomtomParams {
    key: string;
    countrySet: string;
    limit: number;
}

export interface TomtomResponse {
    summary: {
        query: string;
        queryType: string;
        queryTime: number;
        numResults: number;
        offset: number;
        totalResults: number;
        fuzzyLevel: number;
        geoBias: {
            lat: number;
            lon: number;
        }
    }
    queryIntent: QueryIntentObject[]
    results: Results;
}

type QueryIntentObject = CoordinateIntentObject|NearbyIntentObject|W3WIntentObject|BookmarkIntentObject;
interface CoordinateIntentObject {
    type: 'COORDINATE';
    details: {
        lat: number;
        lon: number;
    }
}

interface NearbyIntentObject {
    type: 'NEARBY';
    details: {
        lat: number;
        lon: number;
        query: string;
        text: string;
    }
}

interface W3WIntentObject {
    type: 'W3W';
    details: {
        address: string;
    }
}

interface BookmarkIntentObject {
    type: 'BOOKMARK';
    details: {
        bookmark: 'HOME' | 'WORK';
    }
}

