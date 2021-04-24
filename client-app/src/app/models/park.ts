import { ImageRef } from './imageref'
import { User } from './user';

export interface Park {
    id: string, 
    fullName: string, 
    parkCode: string,
    url: string,
    description: string,
    states: string,
    latLong: string,
    images: ImageRef[];
    visitors: string[];
}