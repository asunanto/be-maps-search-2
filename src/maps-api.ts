import axios, { AxiosResponse } from 'axios'
import { PlaceAutocompleteResult, ResultsZ, TomtomParams, TomtomResponse } from './interfaces'

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search

// `address`: the address to search for
// can be a partial address

// `countrySet`: defaults to AU. Also support multiple countries with comma separator eg. 'US,CA'
// better to filter by country in api rather than app. more effiecient overall

// `limit`: defaults to 100. Max is 100
// better to be in parameter as it can be changed by the user


export async function getPlaceAutocomplete(address: string, countrySet: string = 'AU', limit: number=100): Promise<PlaceAutocompleteResult[]> {

    // key is better placed in the function as opposed to the parameter
    // saves us from passsing in a parameter every time we call the function
    let key:string|undefined = process.env.TOMTOM_API_KEY;
    if (!key) throw new Error('No API key found')

    const response: AxiosResponse<TomtomResponse> = await axios.get<TomtomParams, AxiosResponse<TomtomResponse>>(
        `https://api.tomtom.com/search/2/search/${address}.json'`,
        {
            params: { key, countrySet, limit },
        }
    );    

    ResultsZ.parse(response.data.results)

    return response.data.results.map((result) => ({
        placeId: result.id,
        streetNumber: result.address?.streetNumber,
        countryCode: result.address.countryCode,
        country: result.address.country,
        freeformAddress: result.address.freeformAddress,
        municipality: result.address?.municipality    
     }));
}
