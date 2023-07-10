import React, { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
// 	{ id: "q1", author: "Max", text: "Learning React is fun!" },
// 	{ id: "q2", author: "Maximilian", text: "Learning React is great!" },
// ];

const QuoteDetail = (props) => {
	const params = useParams();
	const match = useRouteMatch();

	const { quoteId } = params;

	const {
		sendRequest,
		status,
		data: loadedQuote,
		error,
	} = useHttp(getSingleQuote, true);

	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	const commentsUrl = match.url + "/comments";
	const commentsPath = match.path + "/comments";

	if (status === "pending") {
		return (
			<div className="centered">
				<LoadingSpinner />
			</div>
		);
	}
	if (error) {
		return <p className="centered">{error}</p>;
	}
	if (!loadedQuote.text) {
		return <p>No quote found!</p>;
	}

	// const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

	// if (!quote) {
	// 	return <h3>No quote found!</h3>;
	// }

	return (
		<Fragment>
			<HighlightedQuote
				text={loadedQuote.text}
				author={loadedQuote.author}
			/>
			<Route path={match.path} exact>
				<div className="centered">
					<Link to={commentsUrl} className="btn--flat">
						Comments Section
					</Link>
				</div>
			</Route>
			<Route path={commentsPath}>
				<Comments />
			</Route>
		</Fragment>
	);
};

export default QuoteDetail;
