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

  console.log('Looking for existing account or creating new one...');
  // getAccounts() was removed in a breaking SDK change - replaced with
  // getAccountsWithInfiniteScrollPagination(). Using that here instead.
  const accounts = await api.metatraderAccountApi.getAccountsWithInfiniteScrollPagination();
  let account = accounts.find(a => a.login === LOGIN && a.server === SERVER);

  if (!account) {
    console.log('No existing account found, creating new one...');
    try {
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
    } catch (err) {
      // These are MetaApi's documented error codes - surfacing them clearly
      // instead of letting a generic crash hide what actually went wrong.
      if (err.details) {
        const code = err.details.code || err.details;
        if (code === 'E_SRV_NOT_FOUND') {
          console.error('❌ SERVER NAME NOT RECOGNIZED:', SERVER);
          console.error('MetaApi could not find a server file matching this name.');
          if (err.details.serversByBrokers) {
            console.error('Similar server names MetaApi knows about:', JSON.stringify(err.details.serversByBrokers, null, 2));
          }
        } else if (code === 'E_AUTH') {
          console.error('❌ AUTHENTICATION FAILED - login/password/server combination was rejected by the broker.');
          console.error('Double check: login =', LOGIN, '| server =', SERVER, '| password is the investor password, correctly active.');
        } else if (code === 'E_SERVER_TIMEZONE') {
          console.error('❌ MetaApi could not detect broker settings automatically. This can be temporary - try again in a minute.');
        } else if (code === 'E_RESOURCE_SLOTS') {
          console.error('❌ This account needs more resource slots than the default. Recommended:', err.details.recommendedResourceSlots);
        } else {
          console.error('❌ Unrecognized error code:', code, '- full details:', JSON.stringify(err.details, null, 2));
        }
      }
      throw err;
    }
  } else {
    console.log('Found existing account:', account.id);
  }

  if (account.state !== 'DEPLOYED' && account.state !== 'DEPLOYING') {
    console.log('Deploying account (this can take a minute the first time)...');
    await account.deploy();
  } else {
    console.log(`Account already in state: ${account.state}, skipping redundant deploy call`);
  }

  console.log('Waiting for connection to broker...');
  await account.waitConnected();

  console.log('Establishing streaming connection...');
  const connection = account.getStreamingConnection();
  await connection.connect();

  console.log('Waiting for synchronization...');
  await connection.waitSynchronized();

  // KNOWN ISSUE we hit on the previous run: waitConnected()/waitSynchronized()
  // can resolve before MetaApi's backend has genuinely finished settling the
  // broker connection internally, causing "account is not connected to broker
  // yet" even though every wait* call already returned successfully. This is
  // a documented-but-not-obvious timing gap on MetaApi's side, not something
  // wrong with the sequence of calls itself (which matches their docs).
  //
  // Fix: a short settling delay, then retry the subscription a few times
  // with increasing waits if it fails with that specific timeout error.
  console.log('Allowing 10s settling time before subscribing (known MetaApi timing gap)...');
  await new Promise(resolve => setTimeout(resolve, 10000));

  console.log('Subscribing to XAUUSD market data...');
  let subscribed = false;
  let lastError = null;
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await connection.subscribeToMarketData('XAUUSD');
      subscribed = true;
      console.log(`✅ Subscription succeeded on attempt ${attempt}`);
      break;
    } catch (err) {
      lastError = err;
      const waitSeconds = attempt * 10; // 10s, 20s, 30s, 40s, 50s
      console.log(`Subscription attempt ${attempt}/${maxAttempts} failed: ${err.message}`);
      if (attempt < maxAttempts) {
        console.log(`Waiting ${waitSeconds}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitSeconds * 1000));
      }
    }
  }

  if (!subscribed) {
    console.error(`❌ Subscription failed after ${maxAttempts} attempts. Last error:`, lastError.message);
    throw lastError;
  }

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
