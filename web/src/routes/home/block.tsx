import { Link } from "react-router-dom";
import { FetchOverviewResponseEvent } from "./query";

export const EventBlock = (props: FetchOverviewResponseEvent) => {
    const theme = props.category == "Excursion" ? "is-link" :
        props.category == "Party" ? "is-danger" :
        props.category == "Meal" ? "is-warning" :
        props.category == "Hang Out" ? "is-success" : "";
    
    return (
        <div className={`notification event-box ${theme} columns is-mobile`}>
            <Link className="column event-title" to={`/event/${props.id}/information`}>
                <p className="is-size-5">
                    <b className="has-text-weight-bold">[{props.org_code.toUpperCase()}]</b>
                    {' '}
                    {props.title}
                </p>
            </Link>
            <button className="column is-narrow">
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </span>
            </button>
        </div>
    );
}

export default EventBlock;