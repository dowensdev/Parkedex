import { ImageRef } from './imageref'

export interface Park {
    id: string, 
    fullName: string, 
    parkCode: string,
    url: string,
    description: string,
    states: string,
    latLong: string,
    visitorCount: number,
    images: ImageRef[];
    visitors: string[];
}