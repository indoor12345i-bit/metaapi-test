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

  // KNOWN ISSUE we hit on a previous run: waitConnected()/waitSynchronized()
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

  // The exact symbol name for gold varies by broker (XAUUSD, GOLD, XAUUSD.,
  // XAUUSDm, etc). Try a lookup of all available symbols first; if that
  // fails (some SDK versions may require an existing subscription before
  // getSymbols works), fall back to trying a list of common gold symbol
  // name variants directly.
  console.log('Looking up available symbols to find PrimaCapital\'s gold symbol name...');
  let SYMBOL = null;

  try {
    const allSymbols = await connection.getSymbols();
    console.log(`Total symbols available: ${allSymbols.length}`);
    const goldCandidates = allSymbols.filter(s =>
      s.toUpperCase().includes('XAU') || s.toUpperCase().includes('GOLD')
    );
    console.log('Gold-related symbols found:', JSON.stringify(goldCandidates));
    if (goldCandidates.length > 0) {
      SYMBOL = goldCandidates[0];
    } else {
      console.log('First 30 symbols for reference:', JSON.stringify(allSymbols.slice(0, 30)));
    }
  } catch (err) {
    console.log('getSymbols() lookup failed (this can happen before any subscription exists):', err.message);
    console.log('Falling back to trying common gold symbol name variants directly...');
  }

  let alreadySubscribed = false;

  if (!SYMBOL) {
    // Common gold symbol naming conventions across different MT5 brokers
    const commonVariants = ['XAUUSD', 'GOLD', 'XAUUSD.', 'XAUUSDm', 'GOLD.', 'XAU/USD', 'Gold'];
    for (const variant of commonVariants) {
      try {
        console.log(`Trying symbol variant: ${variant}`);
        await connection.subscribeToMarketData(variant);
        SYMBOL = variant;
        alreadySubscribed = true;
        console.log(`✅ Found working symbol: ${variant}`);
        break;
      } catch (err) {
        console.log(`  "${variant}" failed: ${err.message}`);
      }
    }
  }

  if (!SYMBOL) {
    console.error('❌ Could not find a working gold symbol name through any method.');
    console.error('PrimaCapital may use a non-obvious naming convention - manual lookup in MT5 terminal needed.');
    throw new Error('No working gold symbol found');
  }

  console.log(`Using symbol: ${SYMBOL}`);

  let subscribed = alreadySubscribed;
  if (!alreadySubscribed) {
    console.log('Subscribing to market data...');
    let lastError = null;
    const maxAttempts = 5;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await connection.subscribeToMarketData(SYMBOL);
        subscribed = true;
        console.log(`✅ Subscription succeeded on attempt ${attempt}`);
        break;
      } catch (err) {
        lastError = err;
        const waitSeconds = attempt * 10;
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
  } else {
    console.log('Already subscribed via fallback variant lookup, skipping redundant retry block.');
  }

  console.log('\n✅ Connected! Fetching live price...\n');
  const price = connection.terminalState.price(SYMBOL);
  console.log(`Real-time price for ${SYMBOL} from PrimaCapital via MT5:`);
  console.log(JSON.stringify(price, null, 2));

  console.log('\nDone. Disconnecting...');
  await connection.close();
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
