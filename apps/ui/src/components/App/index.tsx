import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from '../../pages/Page';
import { IndexPage } from '../../pages/IndexPage';
import { MetricPage } from '../../pages/MetricPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<IndexPage />} />
        <Route path=":metricId" element={<MetricPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
