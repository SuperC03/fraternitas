import axios from "axios";

export interface FetchEventResponseInformation {
    id: number;
    org_id: number;
    org_name: string;
    title: string;
    description?: string;
    location?: string;
    start: string;
    end: string;
    category: string;
}
export interface FetchEventResponseAttendees {}
export interface FetchEventResponseRegistrations {}


export const fetchEventInformation =
    async (id: number): Promise<FetchEventResponseInformation> => {
        const res = await axios.get<FetchEventResponseInformation>(
            import.meta.env.VITE_API_URI + `/event/${id}/information`,
        )
        return res.data
    }