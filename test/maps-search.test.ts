import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutocomplete } from '../src/maps-api'
import { getAutoCompleteDetails } from '../src'
import { PlaceAutocompleteResult } from '../src/interfaces'

config();

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    // additional error checks here to introduce error checks for missing api key
    let originalKey: string | undefined;

    it('throws an error when key is undefined', async () => {
        originalKey = process.env.TOMTOM_API_KEY;
        process.env.TOMTOM_API_KEY = undefined;
        await expect(getAutoCompleteDetails('Charlotte Street')).rejects.toThrow();
        process.env.TOMTOM_API_KEY = originalKey;
    });

    describe('getAutoCompleteDetails', () => {
        let responsePromise: Promise<PlaceAutocompleteResult[]>;

        beforeEach(async () => {
            responsePromise = getAutoCompleteDetails('Charlotte Street');
        });

        it ('returns a promise', () => {
            expect(responsePromise).toBeInstanceOf(Promise)
        })

        it('can fetch from the autocomplete api', async () => {
            const firstRes = (await responsePromise)[0];
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
        })
    })

    describe('getPlaceAutocomplete', () => {

        it('handles no results', async () => {
            const res = await getPlaceAutocomplete( 'asfasffasfasafsafs');
            expect(res).toStrictEqual([])
        })
        
        // error isn't handled, just thrown
        it('throws error', async () => {
            expect(getPlaceAutocomplete('')).rejects.toThrow()
        })
    })

})
