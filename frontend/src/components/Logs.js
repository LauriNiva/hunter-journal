//Komponentti käyttäjän kaikkien logien listaamiseen etusivulla
//Logit saadaan App:lta listana
//Ykisttäiset logit lähetetään SingleLog komponentille

import React from 'react';
import SingleLog from './SingleLog';

function Logs({ logs }) {

  console.log('logs inside Logs component: ', logs);

  return (

    <div>All logged logs

  {
    logs.map(log => (
      <SingleLog key={log._id} log={log} />
  ))
  }
  </div>
  );
}

export default Logs;
