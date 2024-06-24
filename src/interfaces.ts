export interface PlaceAutocompleteResult {
    placeId: string;
    streetNumber: string;
    countryCode: string;
    country: string;
    freeformAddress: string;
}

export interface Result {
    id: string;
    address: {
        streetNumber: string;
        countryCode: string;
        country: string;
        freeformAddress: string;
        municipality: string;
    }
}

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
    results: Result[];
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

