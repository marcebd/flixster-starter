import { Genres } from './Genres'; 

/**
 * Converts an array of genre IDs to genre names.
 * @param {Array<number>} genreIds - Array of genre IDs.
 * @returns {Array<string>} Array of genre names.
 */
export function getGenreNames(genreIds) {
    return genreIds.map(id => Genres[id]).filter(name => name !== undefined);
}
