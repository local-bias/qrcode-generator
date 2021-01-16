import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import Loading from './Loading';

const Layout = React.lazy(() => import('./Layout'));

export default () => {
  ReactDOM.render(
    (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    document.getElementById('localbias-app'),
    loadCSS()
  );
}

function loadCSS() {
  import('../css/loading.scss');
  import('../css/main.scss');
}