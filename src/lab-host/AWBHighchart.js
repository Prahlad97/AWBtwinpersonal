import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AWBHighchart = React.forwardRef((props, ref) => {
  Highcharts.setOptions({
    chart: {
      style: { fontFamily: props.fontFamily || 'Roboto, sans-serif' },
      animation: false,
    },
    title: { text: '' },
    subtitle: { text: '' },
    credits: { enabled: false },
  });

  return <HighchartsReact ref={ref} highcharts={Highcharts} {...props} immutable />;
});

AWBHighchart.displayName = 'AWBHighchart';

export default AWBHighchart;
