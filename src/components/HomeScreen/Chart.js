// @flow
import React from 'react'
import { View } from 'native-base'
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native'

const Chart = ({
  chartData
}: {
  chartData: Array<{ x: string, y: number }>
}) => (
  <View style={{ maxWidth: 480, width: '100%' }}>
    <VictoryPie
      theme={VictoryTheme.material}
      labels={({ x, y }) => {
        // Avoid displaying overlappig labels for lesser assets.
        return y > 5 ? `${x}\n${y.toFixed(2)}%` : ''
      }}
      data={chartData}
      sortKey="y"
      sortOrder="descending"
      // Ring style
      innerRadius={95}
      // Guarantees non-cropped labels
      // https://github.com/FormidableLabs/victory/issues/669#issuecomment-317295602
      labelComponent={<VictoryLabel renderInPortal />}
    />
  </View>
)

export default Chart
