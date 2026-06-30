// ════════════════════════════════════════════════════════════════════════
// METAAPI CONNECTION TEST
// Standalone script to verify MetaApi credentials work and can pull a real
// XAUUSD price from your actual MT5 broker connection (PrimaCapital), before
// wiring this into the production backend.
//
// Run with: node test_metaapi.js
// ════════════════════════════════════════════════════════════════════════
const MetaApi = require('metaapi.cloud-sdk').default;

const TOKEN = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJiOGNmYmJiN2Q5YjY3YzE1ZmY5ZjIwMGE4MDlhNzAxZCIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVzdC1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcnBjLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJtZXRhc3RhdHMtYXBpIiwibWV0aG9kcyI6WyJtZXRhc3RhdHMtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJpZCI6InJpc2stbWFuYWdlbWVudC1hcGkiLCJtZXRob2RzIjpbInJpc2stbWFuYWdlbWVudC1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoiY29weWZhY3RvcnktYXBpIiwibWV0aG9kcyI6WyJjb3B5ZmFjdG9yeS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7ImlkIjoibXQtbWFuYWdlci1hcGkiLCJtZXRob2RzIjpbIm10LW1hbmFnZXItYXBpOnJlc3Q6ZGVhbGluZzoqOioiLCJtdC1tYW5hZ2VyLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsiaWQiOiJiaWxsaW5nLWFwaSIsIm1ldGhvZHMiOlsiYmlsbGluZy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sImlnbm9yZVJhdGVMaW1pdHMiOmZhbHNlLCJ0b2tlbklkIjoiMjAyMTAyMTMiLCJpbXBlcnNvbmF0ZWQiOmZhbHNlLCJyZWFsVXNlcklkIjoiYjhjZmJiYjdkOWI2N2MxNWZmOWYyMDBhODA5YTcwMWQiLCJpYXQiOjE3ODI4MTkzNzYsImV4cCI6MTc5MDU5NTM3Nn0.bgo9ZlcOw86iBag2y1JW8prePgg6KBmdtByRQuFbnRidls_hIysMBVFD1ZFSp4I0WBpQpbF-qhFJu1FF92MbILSx12MubW8HnxF5jt4j6iMv79yfeCxygtsPWSq6bjrdS-FFDitovf7BruV8OMSp-fln1U9rfxIZ2n97OtCfAbGu0DjuxYUB0BoQx1O9BY5D_HVFIJ5-4YDeHLKevcsOp3AQ84u2lPmHwAaQfoWPQAw6s_62B2jOveAXmFVtoPeAyaI8rdbPe51BBF0YAx2x-35AS-tGOzw9IOk3aKjtlPZGbg8MHem0TXjacvam1r-FwjRpEAZzfP9SOvu4iwRd3MvlmODUDRUbSw0Mwp4vTwUGo0r_z_1m6ZtNjVRxzxLworuhpboQcQZtfjaoxhP9nEIvC54h1sofxuK4bfIdwLW5MWGKWNfwRMuoiWIusgdjnomJqx0YslDZRzhyAy3fD5NwXlRFO70HUMHxOHp8XeImMqtLAAqDTxAh3frA7iM76X-qDYfwNJVRa2d9hJY00R7xtBTern4JGNqNz91Z3bF9EoPND094aYKmf2wn_4j8s8Z7grs0xC8_rLnXuj_3UKeUWYN_svNUpQr58ByNlFcp-eqeBxHY5vvZD7YWQ1DWGeLzO2i1Xul8oAuaoSx2IFa8Zc8zGrDBDcdLMj_MCWo';
const LOGIN = '40815';
const PASSWORD = 'sDAa!78gdB'; // investor password, read-only
const SERVER = 'PrimaCapital-Server';

async function main() {
  console.log('Connecting to MetaApi...');
  const api = new MetaApi(TOKEN);

  console.log('Checking for existing account or creating new one...');
  const accounts = await api.metatraderAccountApi.getAccounts();
  let account = accounts.find(a => a.login === LOGIN && a.server === SERVER);

  if (!account) {
    console.log('No existing account found, creating new one...');
    account = await api.metatraderAccountApi.createAccount({
      name: 'Vitrax Gold Price Feed',
      type: 'cloud',
      login: LOGIN,
      password: PASSWORD,
      server: SERVER,
      platform: 'mt5',
      magic: 0,
    });
    console.log('Account created:', account.id);
  } else {
    console.log('Found existing account:', account.id);
  }

  console.log('Deploying account (this can take a minute the first time)...');
  await account.deploy();

  console.log('Waiting for connection to broker...');
  await account.waitConnected();

  console.log('Establishing streaming connection...');
  const connection = account.getStreamingConnection();
  await connection.connect();

  console.log('Waiting for synchronization...');
  await connection.waitSynchronized();

  console.log('Subscribing to XAUUSD market data...');
  await connection.subscribeToMarketData('XAUUSD');

  console.log('\n✅ Connected! Fetching live XAUUSD price...\n');
  const price = connection.terminalState.price('XAUUSD');
  console.log('Real-time price from PrimaCapital via MT5:');
  console.log(JSON.stringify(price, null, 2));

  console.log('\nDone. Disconnecting...');
  await connection.close();
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
