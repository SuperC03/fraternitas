import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchEventInformation } from "./query";

export const EventInfoPage = (): JSX.Element | null => {
  const { eventId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", eventId, "information"],
    enabled: !!eventId,
    queryFn: () => fetchEventInformation(parseInt(eventId ?? "0") || 0),
  })

  return isError ? null : (
    <>
      <div className={`message ${isLoading ? 'skeleton-block' : ''}`}>
        <div className="message-header">
          <h2 className="title is-5">Event Details</h2>
        </div>
        <div className="message-body">
          <p><strong>Host Organization: </strong>
            {data?.org_name}</p>
          <p><strong>Location: </strong>
            {data?.location || data?.org_name}</p>
        </div>
      </div>
      <div className={`message ${isLoading ? 'skeleton-block' : ''}`}>
        <div className="message-header">
          <h2 className="title is-5">Event Description</h2>
        </div>
        <p className="message-body">{data?.description ?? 'No description provided...'}</p>
      </div>
    </>
  )
}

export default EventInfoPage;
