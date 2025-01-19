/resetimport { Mt5 } from 'mt5';

const mt5 = new Mt5({
  host: 'your-mt5-server',
  port: 443,
  login: 'your-login',
  password: 'your-password',
  path: '/path/to/your/terminal'
});

async function main() {
  await mt5.connect();

  const symbol = 'EURUSD';
  const timeframe = 'M1';

  const ticks = await mt5.getTicks(symbol, timeframe, 100);

  // Implement your trading strategy here
  // For example, a simple moving average crossover strategy

  const shortPeriod = 9;
  const longPeriod = 21;

  const shortSma = calculateSMA(ticks, shortPeriod);
  const longSma = calculateSMA(ticks, longPeriod);

  if (shortSma > longSma) {
    console.log('Buy signal');
    // Place a buy order
  } else if (shortSma < longSma) {
    console.log('Sell signal');
    // Place a sell order
  }

  await mt5.disconnect();
}

function calculateSMA(ticks, period) {
  const sum = ticks.slice(-period).reduce((acc, tick) => acc + tick.close, 0);
  return sum / period;
}

main().catch(console.error);
