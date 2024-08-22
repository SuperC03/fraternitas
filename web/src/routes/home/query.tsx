import axios from "axios";

export interface FetchOverviewProps {
    orgId?: number;
    category?: string;
    after?: string; // JS/TS lacks an equivalent type to Go's time.Time
}

export interface FetchOverviewResponseEvent {
    id: number;
    org_id: number;
    title: string;
    start: string;
    category: string;
    org_code: string;
};

export interface FetchOverviewResponseOrg {
    id: number;
    name: string;
};

export interface FetchOverviewResponse {
    events: Array<FetchOverviewResponseEvent>;
    orgs: Array<FetchOverviewResponseOrg>;
}

export const fetchOverview =
    async (props?: FetchOverviewProps): Promise<FetchOverviewResponse> => {
        const res = await axios.get<FetchOverviewResponse>(
            import.meta.env.VITE_API_URI + "/overview",
            { params: props }
        )
        return res.data
    }