const Binance = require('node-binance-api');
const binance = new Binance().options({

  family: 0
});
binance.prices().then((data,error) => {
    if(error){
        console.log(error)
    }

    const assets = [
      { symbol: 'ETH', targetRatio: 0.1 },
      { symbol: 'MATIC', targetRatio: 0.1 },
      { symbol: 'UNI', targetRatio: 0.050 },
      { symbol: 'INJ', targetRatio: 0.050 },
      { symbol: 'GMX', targetRatio: 0.075 },
      { symbol: 'NMR', targetRatio: 0.050 },
      { symbol: 'OP', targetRatio: 0.050 },
      { symbol: 'ATOM', targetRatio: 0.050 },
      { symbol: 'CRV', targetRatio: 0.050 },
      { symbol: 'FXS', targetRatio: 0.050 },
      { symbol: 'MANA', targetRatio: 0.050 },
      { symbol: 'BAL', targetRatio: 0.025 },
      { symbol: 'SNX', targetRatio: 0.025 },
      { symbol: 'GALA', targetRatio: 0.025 },
      { symbol: 'SAND', targetRatio: 0.050 },
      { symbol: 'MKR', targetRatio: 0.050 },
      { symbol: 'ARB', targetRatio: 0.050 },
      { symbol: 'DYDX', targetRatio: 0.050 },
      { symbol: 'GNS', targetRatio: 0.025 },
          { symbol: 'LDO', targetRatio: 0.025 },
        
        ];
        const totalTargetRatio = assets.reduce((sum, asset) => sum + asset.targetRatio, 0);
        console.log({totalTargetRatio})
         binance.balance((error, balances) => {
            console.log("eu")
          if (error) {
            console.error(error);
            return;
          }
          const totalValue = Object.keys(balances).filter(key => assets.find(asset => asset.symbol === key))
            .reduce((sum, balance) => {
                return sum + parseFloat(balances[balance].available) * (balances[balance].asset === 'USDT' ? 1 : parseFloat(data[balance+"USDT"]))
            }, 0);
        
        
            console.log(totalValue)
          const targetValues = assets.map(({targetRatio,symbol}) => {
            const targetValue = Math.round(totalValue * targetRatio) 
            const valueInDollar = Math.round(parseFloat(balances[symbol].available) * (balances[symbol].asset === 'USDT' ? 1 : parseFloat(data[symbol+"USDT"])))
            const currentRatio = valueInDollar / totalValue  
            const diffInDollars = Math.round(valueInDollar - targetValue)
            return {
              symbol,
              targetValueInDollars: targetValue,
              currentValueInDollars: valueInDollar,
              targetRatio: targetRatio * 100 ,
              currentRatio: currentRatio * 100,
              diffInDollars,
              ratioDiff: Math.round((targetRatio - currentRatio)* 100 )  + "%"
  
            }
          });
          console.log({targetValues})

          // diffs.forEach(({ symbol, diff }) => {
          //   try {
          //       if (diff > 0) {
          //           binance.marketBuy(symbol + 'BTC', diff / parseFloat(balances['BTC'].price)).then((a,b) => {
          //               if (b) {
          //                   console.log(b)
          //               }
          //           })
          //         } else if (diff < 0) {
          //           binance.marketSell(symbol + 'BTC', -diff / parseFloat(balances[symbol].available)).then((a,b) => {
          //               if (b) {
          //                   console.log(b)
          //               }
          //           })
          //         }
          //   } catch(err) {
          //       console.log(err)
          //   }

          //   console.log("done")
          // });
        });
}).catch(err => console.log(err));
