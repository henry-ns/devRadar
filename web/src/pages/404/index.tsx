import React from 'react';

import Layout from '~/templates/Layout';

const NotFoundPage: React.FC = () => (
  <Layout title="404: Not found | DevRadar">
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;