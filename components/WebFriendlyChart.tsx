import React from 'react';
import { Platform, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type WebFriendlyChartProps = {
  data: any;
  width: number;
  height: number;
  chartConfig: any;
  style?: any;
  bezier?: boolean;
};

export function WebFriendlyChart({ data, width, height, chartConfig, style, bezier }: WebFriendlyChartProps) {
  if (Platform.OS === 'web') {
    // For web, render a simpler version without touch interactions
    return (
      <View style={style}>
        <svg width={width} height={height} style={{ borderRadius: style?.borderRadius }}>
          <rect width={width} height={height} fill={chartConfig.backgroundColor} />
          {data.datasets[0].data.map((value: number, index: number) => {
            const x = (width / (data.datasets[0].data.length - 1)) * index;
            const y = height - (value / Math.max(...data.datasets[0].data)) * (height - 40);
            return (
              <React.Fragment key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={chartConfig.color(1)}
                />
                {index > 0 && (
                  <line
                    x1={(width / (data.datasets[0].data.length - 1)) * (index - 1)}
                    y1={height - (data.datasets[0].data[index - 1] / Math.max(...data.datasets[0].data)) * (height - 40)}
                    x2={x}
                    y2={y}
                    stroke={chartConfig.color(1)}
                    strokeWidth="2"
                  />
                )}
              </React.Fragment>
            );
          })}
          {/* Labels */}
          {data.labels.map((label: string, index: number) => {
            const x = (width / (data.labels.length - 1)) * index;
            return (
              <text
                key={index}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fill={chartConfig.color(0.5)}
                style={{ fontSize: '12px' }}
              >
                {label}
              </text>
            );
          })}
        </svg>
      </View>
    );
  }

  // For native platforms, use the original LineChart
  return (
    <LineChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      style={style}
      bezier={bezier}
    />
  );
}