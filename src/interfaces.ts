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
    results: Result[];
}
