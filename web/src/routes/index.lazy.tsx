import { createLazyFileRoute } from '@tanstack/react-router';

const IndexRoute = () => {
  return (
    <div className="p-2">
      <h3>Welcome Home</h3>
    </div>
  );
};

export const Route = createLazyFileRoute('/')({
  component: IndexRoute,
});
