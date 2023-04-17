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
          // { symbol: 'USDT', targetRatio: 0.01 },

        
        ];
        const totalTargetRatio = assets.reduce((sum, asset) => sum + asset.targetRatio, 0);
         binance.balance((error, balances) => {
            console.log("eu")
          if (error) {
            console.error(error);
            return;
          }
          console.log({totalTargetRatio, inDolar: balances["USDT"].available})

          const totalValue = Object.keys(balances).filter(key => assets.find(asset => asset.symbol === key))
            .reduce((sum, balance) => {
                return sum + parseFloat(balances[balance].available) * (balances[balance].asset === 'USDT' ? 1 : parseFloat(data[balance+"USDT"]))
            }, 0);
        
        
            console.log(totalValue)
          const targetValues = assets.map(({targetRatio,symbol}) => {
            const targetValue = Number( (totalValue * targetRatio).toFixed(2))
            const valueInDollar = Number((parseFloat(balances[symbol].available) * (balances[symbol].asset === 'USDT' ? 1 : parseFloat(data[symbol+"USDT"]))).toFixed(2))
            const currentValue = Number((balances[symbol].available))
            const currentRatio = valueInDollar / totalValue  
            const diffInDollar = Math.round(valueInDollar - targetValue)
            const princeInDollar= Number((valueInDollar/currentValue).toFixed(2))
            const needToSell = Number((diffInDollar / princeInDollar).toFixed(2))
            const object = {
              symbol,
              princeInDollar,

              targetValue$: targetValue,
              currentValue$: valueInDollar,
              variation: ((currentRatio - targetRatio) / targetRatio * 100).toFixed(2) + "%",
              diffInDollar:diffInDollar + "$",
              targetRatio: targetRatio * 100 + "%" ,
              currentRatio: Number((currentRatio * 100).toFixed(2))  + "%",
              currentValue,
              needToSell,
              // ratioDiff: Math.round((targetRatio - currentRatio)* 100 )  + "%"
  
            }
            // console.log({object})

            if ((currentRatio - targetRatio) / targetRatio > 0.3) {
              // Sell the asset
              // console.log({object})
              console.log("SELLING")
              // binance.marketSell(symbol + 'USDT', needToSell, { type: 'MARKET' }, (error, response) => {
              //     if (error) {
              //         console.error(error.body);
              //     }
              //     console.log(response);
              // });
          } else if((currentRatio - targetRatio) / targetRatio < -0.4) {
            console.log({object})
            console.log("BUYING")     
          
          }
          return object

          });
          console.table(targetValues)


        });
}).catch(err => console.log(err));
