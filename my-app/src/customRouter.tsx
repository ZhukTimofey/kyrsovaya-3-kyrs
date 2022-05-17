import { useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";
import { History } from "history";

type Props = { history: History };

const CustomRouter: React.FC<Props> = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default CustomRouter;
