import React from 'react';
import { Button } from '@material-ui/core';

import Layout from 'src/components/Layout';

export default function Home() {
  return (
    <Layout title="Exon">
      Exon
      <Button variant="outlined" color="secondary">
        Teste exon
      </Button>
    </Layout>
  );
}
