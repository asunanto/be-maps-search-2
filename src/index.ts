import { getPlaceAutocomplete } from './maps-api'
import { PlaceAutocompleteResult } from './interfaces'

export async function getAutoCompleteDetails(address: string): Promise<PlaceAutocompleteResult[]> {
    return await getPlaceAutocomplete(address)
}
