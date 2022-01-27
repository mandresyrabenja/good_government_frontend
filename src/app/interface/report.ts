/**
 * Modèle d'un signalement de problème
 */
export interface Report{
    "id": number,
    "date": string,
    "title": string,
    "description": string,
    "latitude": number,
    "longitude": number,
    "status": string
}
