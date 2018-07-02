// @flow

import { _symbolSelector } from './_selectors'
import type { Asset } from './assets'
import type { Allocation } from './_selectors'

export const groupAssetsBySymbolReducer = (
  acc: Array<Allocation>,
  asset: Asset
) => {
  let i: number = acc.findIndex(item => item.symbol === asset.symbol)
  if (i > -1) {
    acc[i].amount += asset.amount
  } else {
    // Remove 'sourceId' property
    const { sourceId, ...rest } = asset
    acc.push({ ...rest })
  }
  return acc
}

export const appendPercentageMapper = (totalBalance: number) => {
  return function(asset: Asset) {
    return {
      ...asset,
      percentage: (asset.value * 100) / totalBalance
    }
  }
}

export const appendTokenDetailsMapper = (tokensData: {}) => {
  return ({ sourceId, symbol, amount }: Allocation) => {
    const tokenDetails = _symbolSelector(tokensData, symbol)
    return {
      symbol,
      amount,
      price: tokenDetails.price,
      value: tokenDetails.price * amount,
      history: tokenDetails.history
    }
  }
}

export const appendHistoricalAmountMapper = (asset: Asset) => {
  if ('history' in asset && asset.history !== undefined) {
    asset.historicalBalance = Object.keys(asset.history).reduce((acc, key) => {
      acc[key] = (asset.value * 100) / (100 + asset.history[key])
      return acc
    }, {})
  }
  return asset
}

export const minAssetBalanceFilter = (minAssetBalance: number) => {
  return (asset: Asset) => {
    return asset.value > minAssetBalance
  }
}

export const totalBalanceReducer = (acc: number = 0, item: Asset) => {
  acc += item.value ? item.value : 0.0
  return acc
}
